-- Stock Management System Database
-- Created for StockHub Ltd

-- Create database
CREATE DATABASE IF NOT EXISTS SMS;
USE SMS;

-- Drop tables if they exist (for clean setup)
DROP TABLE IF EXISTS StockTransaction;
DROP TABLE IF EXISTS Product;
DROP TABLE IF EXISTS Warehouse;
DROP TABLE IF EXISTS Users;

-- Create Warehouse table
CREATE TABLE Warehouse (
    warehouseCode VARCHAR(50) PRIMARY KEY,
    warehouseName VARCHAR(100) NOT NULL,
    warehouseLocation VARCHAR(200) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Product table
CREATE TABLE Product (
    productCode VARCHAR(50) PRIMARY KEY,
    productName VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    quantityInStock INT NOT NULL DEFAULT 0,
    unitPrice DECIMAL(10, 2) NOT NULL,
    supplierName VARCHAR(100) NOT NULL,
    dateReceived DATE NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create StockTransaction table
CREATE TABLE StockTransaction (
    transactionId INT AUTO_INCREMENT PRIMARY KEY,
    productCode VARCHAR(50) NOT NULL,
    warehouseCode VARCHAR(50) NOT NULL,
    transactionDate DATE NOT NULL,
    quantityMoved INT NOT NULL,
    transactionType ENUM('IN', 'OUT') NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (productCode) REFERENCES Product(productCode) ON DELETE CASCADE,
    FOREIGN KEY (warehouseCode) REFERENCES Warehouse(warehouseCode) ON DELETE CASCADE
);

-- Create Users table for authentication
CREATE TABLE Users (
    userId INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default admin user (password: admin123)
INSERT INTO Users (username, password) VALUES ('admin', 'admin123');

-- Insert sample data for testing

-- Sample Warehouses
INSERT INTO Warehouse (warehouseCode, warehouseName, warehouseLocation) VALUES
('WH001', 'Main Warehouse', 'Kigali City Center'),
('WH002', 'Secondary Storage', 'Remera District'),
('WH003', 'Cold Storage', 'Nyarugenge Sector');

-- Sample Products
INSERT INTO Product (productCode, productName, category, quantityInStock, unitPrice, supplierName, dateReceived) VALUES
('P001', 'Rice 25kg', 'Food', 100, 25000.00, 'Rwanda Grain Suppliers', '2026-06-01'),
('P002', 'Cooking Oil 5L', 'Food', 50, 15000.00, 'Oil Distributors Ltd', '2026-06-01'),
('P003', 'Sugar 1kg', 'Food', 200, 1500.00, 'Sweet Suppliers', '2026-06-02');

-- Sample Transactions
INSERT INTO StockTransaction (productCode, warehouseCode, transactionDate, quantityMoved, transactionType) VALUES
('P001', 'WH001', '2026-06-01', 50, 'IN'),
('P002', 'WH001', '2026-06-01', 30, 'IN'),
('P001', 'WH001', '2026-06-02', 10, 'OUT'),
('P003', 'WH002', '2026-06-02', 100, 'IN');
