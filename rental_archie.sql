/*select emp.empid,emp.empname,sum(sal)
from emp,work
where emp.empid=work.empid
group by work.empid
having count(compid)>1 and sum(sal)>20000;*/
/*update work set sal=1.1*sal
where compid in
(select compid from comp where city='北京');*/
/*
UPDATE work
SET sal = 1.1 * sal
WHERE compid IN (SELECT compid FROM comp WHERE city = '北京');
*/
drop database rental;
create database rental;
use rental;
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
                         rental_id INT AUTO_INCREMENT PRIMARY KEY,
                         driver_id VARCHAR(20),
                         plate_number VARCHAR(20),
                         id_card_number VARCHAR(20),
                         rental_mode VARCHAR(50),
                         rental_rate DECIMAL(8, 2),
                         rental_period INT,
                         deposit DECIMAL(10, 2),
                         rental_start_date DATE,
                         rental_end_date DATE,
                         amount_received DECIMAL(10, 2),
                         FOREIGN KEY (plate_number) REFERENCES vehicles(plate_number),
                         FOREIGN KEY (id_card_number) REFERENCES customers(id_card_number),
                         FOREIGN KEY (driver_id) REFERENCES drivers(id_card_number)
);


-- 用户表
CREATE TABLE users (
                       user_id INT AUTO_INCREMENT PRIMARY KEY,
                       username VARCHAR(50),
                       password VARCHAR(50),
                       user_type VARCHAR(20)
);




-- Inserting the first record
INSERT INTO vehicles VALUES ('ABC123', 'Sedan1', 'Toyota Camry', 25000.00, '2022-12-14', 'unused', 60.00);

-- Inserting the second record
INSERT INTO vehicles VALUES ('DEF456', 'Truck', 'Ford F-150', 35000.00, '2023-03-07', 'unused', 70.00);

-- Inserting the third record
INSERT INTO vehicles VALUES ('GHI789', 'Convertible', 'Mazda MX-5', 28000.00, '2023-04-20', 'unused', 55.00);

-- Inserting the fourth record
INSERT INTO vehicles VALUES ('JKL012', 'Hatchback', 'Volkswagen Golf', 22000.00, '2023-05-05', 'under_rented', 45.00);

-- Inserting the fifth record
INSERT INTO vehicles VALUES ('XYZ789', 'SUV', 'Honda CR-V', 30000.00, '2023-02-15', 'under_rented', 60.00);


INSERT INTO users (username, password, user_type)
VALUES
    ('john', 'password123', 'admin'),
    ('alice', 'securepass', 'system_admin'),
    ('bob', 'pass456', 'client'),
    ('felix', 'pass456', 'driver');





-- Inserting data into the customers table
-- Inserting data into the customers table
INSERT INTO customers (id_card_number, name, gender, birth_date, address, phone)
VALUES
    ('ID123', 'John Doe', 'Male', '1990-01-15', '123 Main St, Cityville', '555-1234'),
    ('ID456', 'Jane Smith', 'Female', '1985-05-20', '456 Oak St, Townsville', '555-5678'),
    ('ID789', 'Bob Johnson', 'Male', '1993-08-10', '789 Pine St, Villagetown', '555-9876'),
    ('ID987', 'Alice Brown', 'Female', '1988-03-25', '987 Elm St, Hamletville', '555-4321'),
    ('ID654', 'Charlie Davis', 'Male', '1995-11-05', '654 Birch St, Boroughville', '555-8765'),
    ('ID012', 'Eva Wilson', 'Female', '1992-07-03', '012 Cedar St, Township', '555-5432'),
    ('ID345', 'Frank Miller', 'Male', '1983-12-18', '345 Maple St, Settlement', '555-2109'),
    ('ID678', 'Grace Taylor', 'Female', '1998-04-30', '678 Spruce St, Outskirts', '555-7890');





INSERT INTO drivers (id_card_number, name, gender, birth_date, address, phone, license_number)
VALUES
    ('12345', 'John', 'Male', '1990-01-01', '123 Main St', '555-1234', 'ABC123'),
    ('67890', 'Jane', 'Female', '1985-03-15', '456 Oak St', '555-5678', 'XYZ789'),
    ('23456', 'Bob', 'Male', '1995-07-20', '789 Pine St', '555-4321', 'DEF456'),
    ('78901', 'Alice', 'Female', '1980-05-10', '101 Elm St', '555-8765', 'GHI789'),
    ('34567', 'Charlie', 'Male', '1992-11-30', '202 Maple St', '555-2109', 'JKL012');


-- Inserting more data into the rentals table
INSERT INTO rentals (plate_number, id_card_number, rental_mode, rental_rate, rental_period, deposit, rental_start_date, rental_end_date, amount_received)
VALUES
    ('ABC123', 'ID123', 'Daily', 50.00, 7, 100.00, '2023-01-01', '2023-01-07', 0.00),
    ('ABC123', 'ID456', 'Weekly', 80.00, 14, 150.00, '2023-02-01', '2023-02-14', 0.00),
    ('DEF456', 'ID789', 'Daily', 60.00, 5, 120.00, '2023-03-01', '2023-03-05', 0.00),
    ('DEF456', 'ID987', 'Monthly', 110.00, 30, 180.00, '2023-04-01', '2023-04-30', 0.00),
    ('DEF456', 'ID654', 'Weekly', 75.00, 14, 130.00, '2023-05-01', '2023-05-14', 0.00),
    ('GHI789', 'ID012', 'Monthly', 120.00, 30, 200.00, '2023-04-01', '2023-04-30', 0.00),
    ('JKL012', 'ID345', 'Daily', 55.00, 7, 110.00, '2023-05-01', '2023-05-07', 0.00),
    ('XYZ789', 'ID678', 'Weekly', 75.00, 14, 130.00, '2023-06-01', '2023-06-14', 0.00);


UPDATE `rental`.`rentals` SET `amount_received` = '100', `driver_id` = '12345' WHERE (`rental_id` = '1');
UPDATE `rental`.`rentals` SET `amount_received` = '160', `driver_id` = '12345' WHERE (`rental_id` = '2');
UPDATE `rental`.`rentals` SET `amount_received` = '150', `driver_id` = '67890' WHERE (`rental_id` = '3');
UPDATE `rental`.`rentals` SET `amount_received` = '300', `driver_id` = '67890' WHERE (`rental_id` = '4');
UPDATE `rental`.`rentals` SET `amount_received` = '800', `driver_id` = '67890' WHERE (`rental_id` = '5');
UPDATE `rental`.`rentals` SET `amount_received` = '400', `driver_id` = '78901' WHERE (`rental_id` = '6');
UPDATE `rental`.`rentals` SET `amount_received` = '700', `driver_id` = '78901' WHERE (`rental_id` = '7');
UPDATE `rental`.`rentals` SET `amount_received` = '800', `driver_id` = '34567' WHERE (`rental_id` = '8');


UPDATE `rental`.`vehicles` SET `vehicle_condition` = 'under_rented' WHERE (`plate_number` = 'ABC123');
UPDATE `rental`.`vehicles` SET `vehicle_condition` = 'unused' WHERE (`plate_number` = 'DEF456');
UPDATE `rental`.`vehicles` SET `vehicle_condition` = 'unused' WHERE (`plate_number` = 'GHI789');
UPDATE `rental`.`vehicles` SET `vehicle_condition` = 'under_rented' WHERE (`plate_number` = 'JKL012');
UPDATE `rental`.`vehicles` SET `vehicle_condition` = 'under_rented' WHERE (`plate_number` = 'XYZ789');

  
