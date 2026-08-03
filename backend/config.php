<?php
// Central config: prefers real environment variables (set them in your
// host's control panel), falls back to config.local.php for local dev.

function icg_config($key, $default = null)
{
    static $local = null;
    if ($local === null) {
        $localFile = __DIR__ . '/config.local.php';
        $local = file_exists($localFile) ? require $localFile : [];
    }

    $envValue = getenv($key);
    if ($envValue !== false && $envValue !== '') {
        return $envValue;
    }

    return isset($local[$key]) ? $local[$key] : $default;
}
