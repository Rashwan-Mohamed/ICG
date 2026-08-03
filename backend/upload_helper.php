<?php
$ICG_ALLOWED_IMAGE_EXT = ['jpg', 'jpeg', 'png', 'webp', 'gif'];
$ICG_ALLOWED_IMAGE_MIME = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

// Validates and moves an uploaded file into backend/uploads/products,
// returns the public URL to store in the DB, or null on failure.
function icg_save_uploaded_image(array $file)
{
    global $ICG_ALLOWED_IMAGE_EXT, $ICG_ALLOWED_IMAGE_MIME;

    if (($file['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK) {
        return null;
    }

    $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
    if (!in_array($ext, $ICG_ALLOWED_IMAGE_EXT, true)) {
        return null;
    }

    $info = @getimagesize($file['tmp_name']);
    if ($info === false || !in_array($info['mime'], $ICG_ALLOWED_IMAGE_MIME, true)) {
        return null;
    }

    $dir = __DIR__ . '/uploads/products';
    if (!is_dir($dir)) {
        mkdir($dir, 0755, true);
    }

    $filename = bin2hex(random_bytes(16)) . '.' . $ext;
    $destination = $dir . '/' . $filename;

    if (!move_uploaded_file($file['tmp_name'], $destination)) {
        return null;
    }

    return icg_backend_base_url() . '/uploads/products/' . $filename;
}

// Derives "https://host/path/to/backend" from the currently running script,
// regardless of which subfolder the backend is deployed into.
function icg_backend_base_url()
{
    $scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
    $host = $_SERVER['HTTP_HOST'];
    $backendRoot = rtrim(dirname(dirname($_SERVER['SCRIPT_NAME'])), '/');

    return "{$scheme}://{$host}{$backendRoot}";
}

function icg_delete_uploaded_image($url)
{
    $marker = '/uploads/products/';
    $pos = strpos($url, $marker);
    if ($pos === false) {
        return;
    }

    $filename = basename($url);
    $path = __DIR__ . '/uploads/products/' . $filename;
    if (is_file($path)) {
        @unlink($path);
    }
}
