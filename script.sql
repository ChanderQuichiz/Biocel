CREATE DATABASE IF NOT EXISTS biocel;
USE biocel;

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    last_name VARCHAR(100) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    role ENUM('customer','delivery','admin') DEFAULT 'customer',
    status ENUM('active','inactive') DEFAULT 'active',
    last_login TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE addresses (
    address_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(50),
    district VARCHAR(50),
    postal_code VARCHAR(20),
    phone VARCHAR(20),
    address_type ENUM('primary','secondary') DEFAULT 'primary',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    brand VARCHAR(50),
    category VARCHAR(50),
    description TEXT,
    image_url VARCHAR(255),
    price DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    status ENUM('pending','preparing','out_for_delivery','delivered','postponed') DEFAULT 'pending',
    delivery_method ENUM('pickup','delivery') DEFAULT 'pickup',
    address_id INT,
    total DECIMAL(10,2) NOT NULL,
    discount DECIMAL(10,2) DEFAULT 0,
    estimated_delivery DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (address_id) REFERENCES addresses(address_id)
);

CREATE TABLE order_details (
    order_detail_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    price DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

CREATE TABLE payments (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    payment_method ENUM('cash','card','transfer') NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'PEN',
    transaction_id VARCHAR(100),
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('pending','completed','failed') DEFAULT 'pending',
    FOREIGN KEY (order_id) REFERENCES orders(order_id)
);

CREATE TABLE payment_history (
    history_id INT AUTO_INCREMENT PRIMARY KEY,
    payment_id INT NOT NULL,
    status ENUM('pending','completed','failed') NOT NULL,
    transaction_id VARCHAR(100),
    note TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (payment_id) REFERENCES payments(payment_id)
);

CREATE TABLE delivery (
    delivery_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    delivery_person_id INT,
    status ENUM('pending','out_for_delivery','delivered','postponed') DEFAULT 'pending',
    delivery_fee DECIMAL(10,2) DEFAULT 0,
    scheduled_date DATETIME,
    actual_delivery DATETIME,
    delay_reason VARCHAR(255),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (delivery_person_id) REFERENCES users(user_id)
);

CREATE TABLE delivery_history (
    history_id INT AUTO_INCREMENT PRIMARY KEY,
    delivery_id INT NOT NULL,
    status ENUM('pending','out_for_delivery','delivered','postponed') NOT NULL,
    comment TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (delivery_id) REFERENCES delivery(delivery_id)
);
select * from orders
DELIMITER $$
CREATE PROCEDURE create_order(
    IN p_user_id INT,
    IN p_address_id INT,
    IN p_total DECIMAL(10,2),
    IN p_estimated_delivery DATETIME,
    IN p_payment_method VARCHAR(20),
    IN p_details JSON
)
BEGIN
    DECLARE stock_current INT;
    DECLARE i INT DEFAULT 0;
    DECLARE n INT;
    DECLARE order_id INT;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;

    INSERT INTO orders (user_id, address_id, total, estimated_delivery)
    VALUES (p_user_id, p_address_id, p_total, p_estimated_delivery);

    SET order_id = LAST_INSERT_ID();
    SET n = JSON_LENGTH(p_details);

    WHILE i < n DO
        SELECT stock INTO stock_current
        FROM products
        WHERE product_id = CAST(JSON_UNQUOTE(JSON_EXTRACT(p_details, CONCAT('$[', i, '].product_id'))) AS UNSIGNED);

        IF stock_current < CAST(JSON_UNQUOTE(JSON_EXTRACT(p_details, CONCAT('$[', i, '].quantity'))) AS UNSIGNED) THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Insufficient stock';
        END IF;

        INSERT INTO order_details (order_id, product_id, quantity, price, subtotal)
        VALUES (
            order_id,
            CAST(JSON_UNQUOTE(JSON_EXTRACT(p_details, CONCAT('$[', i, '].product_id'))) AS UNSIGNED),
            CAST(JSON_UNQUOTE(JSON_EXTRACT(p_details, CONCAT('$[', i, '].quantity'))) AS UNSIGNED),
            CAST(JSON_UNQUOTE(JSON_EXTRACT(p_details, CONCAT('$[', i, '].price'))) AS DECIMAL(10,2)),
            CAST(JSON_UNQUOTE(JSON_EXTRACT(p_details, CONCAT('$[', i, '].subtotal'))) AS DECIMAL(10,2))
        );

        UPDATE products
        SET stock = stock - CAST(JSON_UNQUOTE(JSON_EXTRACT(p_details, CONCAT('$[', i, '].quantity'))) AS UNSIGNED)
        WHERE product_id = CAST(JSON_UNQUOTE(JSON_EXTRACT(p_details, CONCAT('$[', i, '].product_id'))) AS UNSIGNED);

        SET i = i + 1;
    END WHILE;

    INSERT INTO payments (order_id, payment_method, amount)
    VALUES (order_id, p_payment_method, p_total);

    COMMIT;
END $$