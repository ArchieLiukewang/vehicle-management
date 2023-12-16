create database rental;
-- 车辆信息表
CREATE TABLE vehicles (
    plate_number VARCHAR(20) PRIMARY KEY,
    vehicle_type VARCHAR(50),
    vehicle_name VARCHAR(50),
    price DECIMAL(10, 2),
    purchase_date DATE,
    vehicle_condition VARCHAR(100),
    rental_rate DECIMAL(8, 2)
);

-- 客户信息表
CREATE TABLE customers (
    id_card_number VARCHAR(20) PRIMARY KEY,
    name VARCHAR(50),
    gender VARCHAR(10),
    birth_date DATE,
    address VARCHAR(100),
    phone VARCHAR(20)
);

-- 司机信息表
CREATE TABLE drivers (
    id_card_number VARCHAR(20) PRIMARY KEY,
    name VARCHAR(50),
    gender VARCHAR(10),
    birth_date DATE,
    address VARCHAR(100),
    phone VARCHAR(20),
    license_number VARCHAR(50)
);

-- 租赁信息表
CREATE TABLE rentals (
    plate_number VARCHAR(20),
    id_card_number VARCHAR(20),
    rental_mode VARCHAR(50),
    rental_rate DECIMAL(8, 2),
    rental_period INT,
    deposit DECIMAL(10, 2),
    rental_start_date DATE,
    rental_end_date DATE,
    amount_received DECIMAL(10, 2),
    PRIMARY KEY (plate_number, id_card_number),
    FOREIGN KEY (plate_number) REFERENCES vehicles(plate_number),
    FOREIGN KEY (id_card_number) REFERENCES customers(id_card_number)
);

-- 用户表
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50),
    password VARCHAR(50),
    user_type VARCHAR(20)
);
