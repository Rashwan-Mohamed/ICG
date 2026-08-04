<?php
require_once __DIR__ . '/db.php';
require_once __DIR__ . '/cors.php';

function icg_bearer_token()
{
    $header = isset($_SERVER['HTTP_AUTHORIZATION'])
        ? $_SERVER['HTTP_AUTHORIZATION']
        : (isset($_SERVER['REDIRECT_HTTP_AUTHORIZATION']) ? $_SERVER['REDIRECT_HTTP_AUTHORIZATION'] : '');

    if (preg_match('/Bearer\s+(\S+)/i', $header, $matches)) {
        return $matches[1];
    }

    return null;
}

// Call at the top of any endpoint that requires a logged-in admin.
// Exits with 401 if the token is missing/invalid/expired.
function icg_require_auth()
{
    $token = icg_bearer_token();
    if (!$token) {
        icg_json(['error' => 'Missing Authorization header'], 401);
    }

    $stmt = icg_db()->prepare(
        'SELECT admin_id FROM admin_tokens WHERE token = ? AND expires_at > NOW()'
    );
    $stmt->execute([$token]);
    $row = $stmt->fetch();

    if (!$row) {
        icg_json(['error' => 'Invalid or expired token'], 401);
    }

    return (int) $row['admin_id'];
}
