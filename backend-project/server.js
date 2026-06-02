const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL Database Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Change this to your MySQL password
    database: 'SMS'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL database successfully!');
});

// ==================== AUTHENTICATION ROUTES ====================

// Login
app.post('/api/auth/login', (req, res) => {
    const { username, password } = req.body;
    
    const query = 'SELECT * FROM Users WHERE username = ? AND password = ?';
    db.query(query, [username, password], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database error', details: err });
        }
        
        if (results.length > 0) {
            res.json({ 
                success: true, 
                message: 'Login successful',
                user: { username: results[0].username }
            });
        } else {
            res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    });
});

// ==================== PRODUCT ROUTES ====================

// Get all products
app.get('/api/products', (req, res) => {
    const query = 'SELECT * FROM Product ORDER BY createdAt DESC';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database error', details: err });
        }
        res.json(results);
    });
});

// Get single product
app.get('/api/products/:code', (req, res) => {
    const query = 'SELECT * FROM Product WHERE productCode = ?';
    db.query(query, [req.params.code], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database error', details: err });
        }
        if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    });
});

// Create product
app.post('/api/products', (req, res) => {
    const { productCode, productName, category, quantityInStock, unitPrice, supplierName, dateReceived } = req.body;
    
    const query = 'INSERT INTO Product (productCode, productName, category, quantityInStock, unitPrice, supplierName, dateReceived) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [productCode, productName, category, quantityInStock, unitPrice, supplierName, dateReceived], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to create product', details: err });
        }
        res.status(201).json({ 
            success: true, 
            message: 'Product created successfully',
            productCode: productCode
        });
    });
});

// ==================== WAREHOUSE ROUTES ====================

// Get all warehouses
app.get('/api/warehouses', (req, res) => {
    const query = 'SELECT * FROM Warehouse ORDER BY createdAt DESC';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database error', details: err });
        }
        res.json(results);
    });
});

// Get single warehouse
app.get('/api/warehouses/:code', (req, res) => {
    const query = 'SELECT * FROM Warehouse WHERE warehouseCode = ?';
    db.query(query, [req.params.code], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database error', details: err });
        }
        if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.status(404).json({ error: 'Warehouse not found' });
        }
    });
});

// Create warehouse
app.post('/api/warehouses', (req, res) => {
    const { warehouseCode, warehouseName, warehouseLocation } = req.body;
    
    const query = 'INSERT INTO Warehouse (warehouseCode, warehouseName, warehouseLocation) VALUES (?, ?, ?)';
    db.query(query, [warehouseCode, warehouseName, warehouseLocation], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to create warehouse', details: err });
        }
        res.status(201).json({ 
            success: true, 
            message: 'Warehouse created successfully',
            warehouseCode: warehouseCode
        });
    });
});

// ==================== TRANSACTION ROUTES ====================

// Get all transactions
app.get('/api/transactions', (req, res) => {
    const query = `
        SELECT 
            t.*,
            p.productName,
            w.warehouseName
        FROM StockTransaction t
        JOIN Product p ON t.productCode = p.productCode
        JOIN Warehouse w ON t.warehouseCode = w.warehouseCode
        ORDER BY t.transactionDate DESC, t.createdAt DESC
    `;
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database error', details: err });
        }
        res.json(results);
    });
});

// Get single transaction
app.get('/api/transactions/:id', (req, res) => {
    const query = `
        SELECT 
            t.*,
            p.productName,
            w.warehouseName
        FROM StockTransaction t
        JOIN Product p ON t.productCode = p.productCode
        JOIN Warehouse w ON t.warehouseCode = w.warehouseCode
        WHERE t.transactionId = ?
    `;
    db.query(query, [req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database error', details: err });
        }
        if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.status(404).json({ error: 'Transaction not found' });
        }
    });
});

// Create transaction
app.post('/api/transactions', (req, res) => {
    const { productCode, warehouseCode, transactionDate, quantityMoved, transactionType } = req.body;
    
    // Start transaction to update product quantity
    db.beginTransaction((err) => {
        if (err) {
            return res.status(500).json({ error: 'Transaction failed', details: err });
        }
        
        // Insert transaction
        const insertQuery = 'INSERT INTO StockTransaction (productCode, warehouseCode, transactionDate, quantityMoved, transactionType) VALUES (?, ?, ?, ?, ?)';
        db.query(insertQuery, [productCode, warehouseCode, transactionDate, quantityMoved, transactionType], (err, result) => {
            if (err) {
                return db.rollback(() => {
                    res.status(500).json({ error: 'Failed to create transaction', details: err });
                });
            }
            
            // Update product quantity
            const quantityChange = transactionType === 'IN' ? quantityMoved : -quantityMoved;
            const updateQuery = 'UPDATE Product SET quantityInStock = quantityInStock + ? WHERE productCode = ?';
            db.query(updateQuery, [quantityChange, productCode], (err) => {
                if (err) {
                    return db.rollback(() => {
                        res.status(500).json({ error: 'Failed to update stock', details: err });
                    });
                }
                
                db.commit((err) => {
                    if (err) {
                        return db.rollback(() => {
                            res.status(500).json({ error: 'Commit failed', details: err });
                        });
                    }
                    res.status(201).json({ 
                        success: true, 
                        message: 'Transaction created successfully',
                        transactionId: result.insertId
                    });
                });
            });
        });
    });
});

// Update transaction
app.put('/api/transactions/:id', (req, res) => {
    const { productCode, warehouseCode, transactionDate, quantityMoved, transactionType } = req.body;
    const transactionId = req.params.id;
    
    // Get old transaction details first
    db.query('SELECT * FROM StockTransaction WHERE transactionId = ?', [transactionId], (err, oldTransaction) => {
        if (err || oldTransaction.length === 0) {
            return res.status(404).json({ error: 'Transaction not found' });
        }
        
        const old = oldTransaction[0];
        
        db.beginTransaction((err) => {
            if (err) {
                return res.status(500).json({ error: 'Transaction failed', details: err });
            }
            
            // Reverse old transaction effect
            const oldQuantityChange = old.transactionType === 'IN' ? -old.quantityMoved : old.quantityMoved;
            const reverseQuery = 'UPDATE Product SET quantityInStock = quantityInStock + ? WHERE productCode = ?';
            db.query(reverseQuery, [oldQuantityChange, old.productCode], (err) => {
                if (err) {
                    return db.rollback(() => {
                        res.status(500).json({ error: 'Failed to reverse old stock', details: err });
                    });
                }
                
                // Update transaction
                const updateQuery = 'UPDATE StockTransaction SET productCode = ?, warehouseCode = ?, transactionDate = ?, quantityMoved = ?, transactionType = ? WHERE transactionId = ?';
                db.query(updateQuery, [productCode, warehouseCode, transactionDate, quantityMoved, transactionType, transactionId], (err) => {
                    if (err) {
                        return db.rollback(() => {
                            res.status(500).json({ error: 'Failed to update transaction', details: err });
                        });
                    }
                    
                    // Apply new transaction effect
                    const newQuantityChange = transactionType === 'IN' ? quantityMoved : -quantityMoved;
                    const applyQuery = 'UPDATE Product SET quantityInStock = quantityInStock + ? WHERE productCode = ?';
                    db.query(applyQuery, [newQuantityChange, productCode], (err) => {
                        if (err) {
                            return db.rollback(() => {
                                res.status(500).json({ error: 'Failed to apply new stock', details: err });
                            });
                        }
                        
                        db.commit((err) => {
                            if (err) {
                                return db.rollback(() => {
                                    res.status(500).json({ error: 'Commit failed', details: err });
                                });
                            }
                            res.json({ 
                                success: true, 
                                message: 'Transaction updated successfully'
                            });
                        });
                    });
                });
            });
        });
    });
});

// Delete transaction
app.delete('/api/transactions/:id', (req, res) => {
    const transactionId = req.params.id;
    
    // Get transaction details first
    db.query('SELECT * FROM StockTransaction WHERE transactionId = ?', [transactionId], (err, transaction) => {
        if (err || transaction.length === 0) {
            return res.status(404).json({ error: 'Transaction not found' });
        }
        
        const trans = transaction[0];
        
        db.beginTransaction((err) => {
            if (err) {
                return res.status(500).json({ error: 'Transaction failed', details: err });
            }
            
            // Reverse transaction effect on stock
            const quantityChange = trans.transactionType === 'IN' ? -trans.quantityMoved : trans.quantityMoved;
            const updateQuery = 'UPDATE Product SET quantityInStock = quantityInStock + ? WHERE productCode = ?';
            db.query(updateQuery, [quantityChange, trans.productCode], (err) => {
                if (err) {
                    return db.rollback(() => {
                        res.status(500).json({ error: 'Failed to update stock', details: err });
                    });
                }
                
                // Delete transaction
                const deleteQuery = 'DELETE FROM StockTransaction WHERE transactionId = ?';
                db.query(deleteQuery, [transactionId], (err) => {
                    if (err) {
                        return db.rollback(() => {
                            res.status(500).json({ error: 'Failed to delete transaction', details: err });
                        });
                    }
                    
                    db.commit((err) => {
                        if (err) {
                            return db.rollback(() => {
                                res.status(500).json({ error: 'Commit failed', details: err });
                            });
                        }
                        res.json({ 
                            success: true, 
                            message: 'Transaction deleted successfully'
                        });
                    });
                });
            });
        });
    });
});

// ==================== REPORTS ROUTES ====================

// Daily report
app.get('/api/reports/daily', (req, res) => {
    const { date } = req.query;
    const targetDate = date || new Date().toISOString().split('T')[0];
    
    const query = `
        SELECT 
            transactionType,
            SUM(quantityMoved) as totalQuantity,
            COUNT(*) as transactionCount
        FROM StockTransaction
        WHERE DATE(transactionDate) = ?
        GROUP BY transactionType
    `;
    
    db.query(query, [targetDate], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database error', details: err });
        }
        
        // Get available stock
        db.query('SELECT SUM(quantityInStock) as totalStock FROM Product', (err, stockResults) => {
            if (err) {
                return res.status(500).json({ error: 'Database error', details: err });
            }
            
            const report = {
                date: targetDate,
                availableStock: stockResults[0].totalStock || 0,
                stockIn: 0,
                stockOut: 0,
                transactionCount: 0
            };
            
            results.forEach(row => {
                if (row.transactionType === 'IN') {
                    report.stockIn = row.totalQuantity;
                } else if (row.transactionType === 'OUT') {
                    report.stockOut = row.totalQuantity;
                }
                report.transactionCount += row.transactionCount;
            });
            
            res.json(report);
        });
    });
});

// Weekly report
app.get('/api/reports/weekly', (req, res) => {
    const { startDate, endDate } = req.query;
    
    const query = `
        SELECT 
            DATE(transactionDate) as date,
            transactionType,
            SUM(quantityMoved) as totalQuantity,
            COUNT(*) as transactionCount
        FROM StockTransaction
        WHERE transactionDate >= ? AND transactionDate <= ?
        GROUP BY DATE(transactionDate), transactionType
        ORDER BY date DESC
    `;
    
    db.query(query, [startDate, endDate], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database error', details: err });
        }
        
        // Get available stock
        db.query('SELECT SUM(quantityInStock) as totalStock FROM Product', (err, stockResults) => {
            if (err) {
                return res.status(500).json({ error: 'Database error', details: err });
            }
            
            const report = {
                startDate,
                endDate,
                availableStock: stockResults[0].totalStock || 0,
                dailyData: []
            };
            
            // Group by date
            const dateMap = {};
            results.forEach(row => {
                if (!dateMap[row.date]) {
                    dateMap[row.date] = { date: row.date, stockIn: 0, stockOut: 0 };
                }
                if (row.transactionType === 'IN') {
                    dateMap[row.date].stockIn = row.totalQuantity;
                } else {
                    dateMap[row.date].stockOut = row.totalQuantity;
                }
            });
            
            report.dailyData = Object.values(dateMap);
            res.json(report);
        });
    });
});

// Monthly report
app.get('/api/reports/monthly', (req, res) => {
    const { month, year } = req.query;
    
    const query = `
        SELECT 
            transactionType,
            SUM(quantityMoved) as totalQuantity,
            COUNT(*) as transactionCount
        FROM StockTransaction
        WHERE MONTH(transactionDate) = ? AND YEAR(transactionDate) = ?
        GROUP BY transactionType
    `;
    
    db.query(query, [month, year], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database error', details: err });
        }
        
        // Get available stock
        db.query('SELECT SUM(quantityInStock) as totalStock FROM Product', (err, stockResults) => {
            if (err) {
                return res.status(500).json({ error: 'Database error', details: err });
            }
            
            const report = {
                month,
                year,
                availableStock: stockResults[0].totalStock || 0,
                stockIn: 0,
                stockOut: 0,
                transactionCount: 0
            };
            
            results.forEach(row => {
                if (row.transactionType === 'IN') {
                    report.stockIn = row.totalQuantity;
                } else if (row.transactionType === 'OUT') {
                    report.stockOut = row.totalQuantity;
                }
                report.transactionCount += row.transactionCount;
            });
            
            res.json(report);
        });
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
