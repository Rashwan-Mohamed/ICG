<?php
require_once __DIR__ . '/../cors.php';
require_once __DIR__ . '/../db.php';

icg_apply_cors();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    icg_json(['error' => 'Method not allowed'], 405);
}

$body = json_decode(file_get_contents('php://input'), true) ?? [];
$username = trim($body['username'] ?? '');
$password = (string) ($body['password'] ?? '');

if ($username === '' || $password === '') {
    icg_json(['error' => 'Username and password are required'], 400);
}

$stmt = icg_db()->prepare('SELECT id, password_hash FROM admin_users WHERE username = ?');
$stmt->execute([$username]);
$admin = $stmt->fetch();

if (!$admin || !password_verify($password, $admin['password_hash'])) {
    icg_json(['error' => 'Invalid credentials'], 401);
}

$token = bin2hex(random_bytes(32));
$expiresAt = date('Y-m-d H:i:s', time() + 7 * 24 * 60 * 60);

$insert = icg_db()->prepare(
    'INSERT INTO admin_tokens (token, admin_id, expires_at) VALUES (?, ?, ?)'
);
$insert->execute([$token, $admin['id'], $expiresAt]);

icg_json(['token' => $token, 'expires_at' => $expiresAt]);
