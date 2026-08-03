<?php
require_once __DIR__ . '/../cors.php';
require_once __DIR__ . '/../db.php';
require_once __DIR__ . '/../auth.php';
require_once __DIR__ . '/../upload_helper.php';

icg_apply_cors();

// Text fields the admin form can set. Kept as a flat list matching the
// frontend's existing spec fields so the React side barely has to change.
const PRODUCT_TEXT_FIELDS = [
    'product', 'brand', 'feature', 'detail', 'model_number', 'resolution',
    'color_brightness', 'white_brightness', 'contrast_ratio', 'source',
    'weight', 'portability', 'aspect_ratio',
    'light_source_life_economy_mode', 'light_source_life_normal_mode',
    'min_projector_distance', 'max_projector_distance',
    'min_viewable_screen_size', 'max_viewable_screen_size',
];

function fetch_product_images(int $productId): array
{
    $stmt = icg_db()->prepare(
        'SELECT id, image_path FROM product_images WHERE product_id = ? ORDER BY sort_order, id'
    );
    $stmt->execute([$productId]);
    return $stmt->fetchAll();
}

function fetch_all_products(): array
{
    $rows = icg_db()->query('SELECT * FROM products ORDER BY created_at DESC')->fetchAll();
    foreach ($rows as &$row) {
        $row['gallery'] = fetch_product_images((int) $row['id']);
    }
    return $rows;
}

function fetch_one_product(int $id): ?array
{
    $stmt = icg_db()->prepare('SELECT * FROM products WHERE id = ?');
    $stmt->execute([$id]);
    $row = $stmt->fetch();
    if (!$row) {
        return null;
    }
    $row['gallery'] = fetch_product_images($id);
    return $row;
}

function handle_get(): void
{
    if (isset($_GET['id'])) {
        $product = fetch_one_product((int) $_GET['id']);
        if (!$product) {
            icg_json(['error' => 'Product not found'], 404);
        }
        icg_json($product);
    }

    icg_json(fetch_all_products());
}

function insert_gallery_files(int $productId, array $files, int $startOrder = 0): void
{
    if (empty($files['name'])) {
        return;
    }

    $count = count($files['name']);
    $order = $startOrder;
    $stmt = icg_db()->prepare(
        'INSERT INTO product_images (product_id, image_path, sort_order) VALUES (?, ?, ?)'
    );

    for ($i = 0; $i < $count; $i++) {
        $file = [
            'name' => $files['name'][$i],
            'type' => $files['type'][$i],
            'tmp_name' => $files['tmp_name'][$i],
            'error' => $files['error'][$i],
            'size' => $files['size'][$i],
        ];
        $url = icg_save_uploaded_image($file);
        if ($url) {
            $stmt->execute([$productId, $url, $order]);
            $order++;
        }
    }
}

function handle_create(): void
{
    icg_require_auth();

    $name = trim($_POST['product'] ?? '');
    if ($name === '') {
        icg_json(['error' => 'product name is required'], 400);
    }

    $columns = array_merge(['product', 'price', 'main_image'], array_diff(PRODUCT_TEXT_FIELDS, ['product']));
    $values = [];
    foreach ($columns as $col) {
        if ($col === 'price') {
            $values[$col] = (float) ($_POST['price'] ?? 0);
        } elseif ($col === 'main_image') {
            $values[$col] = null; // filled in below if a file was uploaded
        } else {
            $values[$col] = isset($_POST[$col]) && $_POST[$col] !== '' ? trim($_POST[$col]) : null;
        }
    }

    if (!empty($_FILES['main_image']['name'])) {
        $url = icg_save_uploaded_image($_FILES['main_image']);
        if ($url) {
            $values['main_image'] = $url;
        }
    }

    $placeholders = implode(', ', array_fill(0, count($columns), '?'));
    $columnList = implode(', ', $columns);
    $stmt = icg_db()->prepare("INSERT INTO products ({$columnList}) VALUES ({$placeholders})");
    $stmt->execute(array_values($values));

    $productId = (int) icg_db()->lastInsertId();

    if (!empty($_FILES['gallery']['name'])) {
        insert_gallery_files($productId, $_FILES['gallery']);
    }

    icg_json(fetch_one_product($productId), 201);
}

function handle_update(): void
{
    icg_require_auth();

    $id = (int) ($_POST['id'] ?? 0);
    if (!$id || !fetch_one_product($id)) {
        icg_json(['error' => 'Product not found'], 404);
    }

    $sets = [];
    $values = [];
    foreach (PRODUCT_TEXT_FIELDS as $col) {
        if (isset($_POST[$col])) {
            $sets[] = "{$col} = ?";
            $values[] = trim($_POST[$col]) !== '' ? trim($_POST[$col]) : null;
        }
    }
    if (isset($_POST['price'])) {
        $sets[] = 'price = ?';
        $values[] = (float) $_POST['price'];
    }

    if (!empty($_FILES['main_image']['name'])) {
        $url = icg_save_uploaded_image($_FILES['main_image']);
        if ($url) {
            $sets[] = 'main_image = ?';
            $values[] = $url;
        }
    }

    if ($sets) {
        $values[] = $id;
        $sql = 'UPDATE products SET ' . implode(', ', $sets) . ' WHERE id = ?';
        $stmt = icg_db()->prepare($sql);
        $stmt->execute($values);
    }

    if (!empty($_FILES['gallery']['name'])) {
        $existingCount = count(fetch_product_images($id));
        insert_gallery_files($id, $_FILES['gallery'], $existingCount);
    }

    icg_json(fetch_one_product($id));
}

function handle_delete(): void
{
    icg_require_auth();

    $id = (int) ($_GET['id'] ?? 0);
    $product = $id ? fetch_one_product($id) : null;
    if (!$product) {
        icg_json(['error' => 'Product not found'], 404);
    }

    foreach ($product['gallery'] as $image) {
        icg_delete_uploaded_image($image['image_path']);
    }
    if ($product['main_image']) {
        icg_delete_uploaded_image($product['main_image']);
    }

    $stmt = icg_db()->prepare('DELETE FROM products WHERE id = ?');
    $stmt->execute([$id]);

    icg_json(['ok' => true]);
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    handle_get();
} elseif ($method === 'POST' && ($_POST['_method'] ?? '') === 'PUT') {
    handle_update();
} elseif ($method === 'POST') {
    handle_create();
} elseif ($method === 'DELETE') {
    handle_delete();
} else {
    icg_json(['error' => 'Method not allowed'], 405);
}
