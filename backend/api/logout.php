<?php
require_once __DIR__ . '/../cors.php';
require_once __DIR__ . '/../db.php';
require_once __DIR__ . '/../auth.php';

icg_apply_cors();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    icg_json(['error' => 'Method not allowed'], 405);
}

$token = icg_bearer_token();
if ($token) {
    $stmt = icg_db()->prepare('DELETE FROM admin_tokens WHERE token = ?');
    $stmt->execute([$token]);
}

icg_json(['ok' => true]);
