-- Run this once against your MySQL database (e.g. via phpMyAdmin) before
-- using the API. Then run seed.php once to create the admin account and
-- (optionally) migrate the existing hardcoded projector catalog.

CREATE TABLE IF NOT EXISTS admin_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS admin_tokens (
    token CHAR(64) PRIMARY KEY,
    admin_id INT NOT NULL,
    expires_at DATETIME NOT NULL,
    FOREIGN KEY (admin_id) REFERENCES admin_users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product VARCHAR(150) NOT NULL,
    brand VARCHAR(80) DEFAULT NULL,
    feature TEXT,
    detail TEXT,
    price DECIMAL(10,2) NOT NULL DEFAULT 0,
    model_number VARCHAR(80) DEFAULT NULL,
    resolution VARCHAR(80) DEFAULT NULL,
    color_brightness VARCHAR(80) DEFAULT NULL,
    white_brightness VARCHAR(80) DEFAULT NULL,
    contrast_ratio VARCHAR(80) DEFAULT NULL,
    source VARCHAR(80) DEFAULT NULL,
    weight VARCHAR(40) DEFAULT NULL,
    portability VARCHAR(255) DEFAULT NULL,
    aspect_ratio VARCHAR(40) DEFAULT NULL,
    light_source_life_economy_mode VARCHAR(40) DEFAULT NULL,
    light_source_life_normal_mode VARCHAR(40) DEFAULT NULL,
    min_projector_distance VARCHAR(40) DEFAULT NULL,
    max_projector_distance VARCHAR(40) DEFAULT NULL,
    min_viewable_screen_size VARCHAR(40) DEFAULT NULL,
    max_viewable_screen_size VARCHAR(40) DEFAULT NULL,
    main_image VARCHAR(255) DEFAULT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS product_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    image_path VARCHAR(255) NOT NULL,
    sort_order INT NOT NULL DEFAULT 0,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
