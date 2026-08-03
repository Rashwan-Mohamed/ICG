<?php
require_once __DIR__ . '/config.php';

function icg_db()
{
    static $pdo = null;
    if ($pdo !== null) {
        return $pdo;
    }

    $host = icg_config('DB_HOST', 'localhost');
    $name = icg_config('DB_NAME');
    $user = icg_config('DB_USER');
    $pass = icg_config('DB_PASS');

    $dsn = "mysql:host={$host};dbname={$name};charset=utf8mb4";
    $pdo = new PDO($dsn, $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);

    return $pdo;
}
