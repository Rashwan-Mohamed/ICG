<?php
// One-off setup script. Run this once by visiting it in the browser
// (php backend/seed.php on the CLI works too), then DELETE this file —
// leaving it live would let anyone re-run it and reset the admin password.

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/db.php';

header('Content-Type: text/plain');

$pdo = icg_db();

// 1. Create the admin account (only if it doesn't already exist).
$username = icg_config('ADMIN_USERNAME', 'admin');
$password = icg_config('ADMIN_PASSWORD');

if (!$password) {
    exit("Set ADMIN_PASSWORD (env var or config.local.php) before running seed.php.\n");
}

$stmt = $pdo->prepare('SELECT id FROM admin_users WHERE username = ?');
$stmt->execute([$username]);

if ($stmt->fetch()) {
    echo "Admin user '{$username}' already exists, skipping.\n";
} else {
    $hash = password_hash($password, PASSWORD_DEFAULT);
    $insert = $pdo->prepare('INSERT INTO admin_users (username, password_hash) VALUES (?, ?)');
    $insert->execute([$username, $hash]);
    echo "Created admin user '{$username}'.\n";
}

// 2. Import the existing hardcoded catalog, once, if products is empty.
$count = (int) $pdo->query('SELECT COUNT(*) AS c FROM products')->fetch()['c'];
if ($count > 0) {
    echo "products table already has {$count} row(s), skipping catalog import.\n";
    exit;
}

$products = json_decode(file_get_contents(__DIR__ . '/seed_products.json'), true);
if (!$products) {
    exit("Could not read seed_products.json\n");
}

$columns = [
    'product', 'brand', 'feature', 'detail', 'price', 'model_number',
    'resolution', 'color_brightness', 'white_brightness', 'contrast_ratio',
    'source', 'weight', 'portability', 'aspect_ratio',
    'light_source_life_economy_mode', 'light_source_life_normal_mode',
    'min_projector_distance', 'max_projector_distance',
    'min_viewable_screen_size', 'max_viewable_screen_size', 'main_image',
];
$placeholders = implode(', ', array_fill(0, count($columns), '?'));
$insertProduct = $pdo->prepare(
    'INSERT INTO products (' . implode(', ', $columns) . ") VALUES ({$placeholders})"
);
$insertImage = $pdo->prepare(
    'INSERT INTO product_images (product_id, image_path, sort_order) VALUES (?, ?, ?)'
);

foreach ($products as $p) {
    $gallery = $p['gallery'] ?? [];
    $values = [];
    foreach ($columns as $col) {
        if ($col === 'main_image') {
            $values[] = $gallery[0] ?? null;
        } else {
            $values[] = ($p[$col] ?? '') !== '' ? $p[$col] : null;
        }
    }
    $insertProduct->execute($values);
    $productId = (int) $pdo->lastInsertId();

    foreach ($gallery as $order => $path) {
        $insertImage->execute([$productId, $path, $order]);
    }
}

echo 'Imported ' . count($products) . " products.\n";
