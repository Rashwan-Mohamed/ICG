<?php
require_once __DIR__ . '/../cors.php';
require_once __DIR__ . '/../db.php';
require_once __DIR__ . '/../auth.php';
require_once __DIR__ . '/../upload_helper.php';

icg_apply_cors();

if ($_SERVER['REQUEST_METHOD'] !== 'DELETE') {
    icg_json(['error' => 'Method not allowed'], 405);
}

icg_require_auth();

$id = (int) ($_GET['id'] ?? 0);
if (!$id) {
    icg_json(['error' => 'id is required'], 400);
}

$stmt = icg_db()->prepare('SELECT image_path FROM product_images WHERE id = ?');
$stmt->execute([$id]);
$image = $stmt->fetch();

if (!$image) {
    icg_json(['error' => 'Image not found'], 404);
}

icg_delete_uploaded_image($image['image_path']);

$delete = icg_db()->prepare('DELETE FROM product_images WHERE id = ?');
$delete->execute([$id]);

icg_json(['ok' => true]);
