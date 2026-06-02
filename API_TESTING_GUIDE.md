# API Testing Guide

Quick reference for testing all backend endpoints using tools like Postman, Thunder Client, or curl.

---

## 🔧 Base URL
```
http://localhost:5000
```

---

## 1️⃣ Authentication Endpoints

### Login
**POST** `/api/auth/login`

**Request Body:**
```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "username": "admin"
  }
}
```

**Error Response (401):**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

---

## 2️⃣ Product Endpoints

### Get All Products
**GET** `/api/products`

**Response (200):**
```json
[
  {
    "productCode": "P001",
    "productName": "Rice 25kg",
    "category": "Food",
    "quantityInStock": 100,
    "unitPrice": "25000.00",
    "supplierName": "Rwanda Grain Suppliers",
    "dateReceived": "2026-06-01T00:00:00.000Z",
    "createdAt": "2026-06-02T10:30:00.000Z"
  }
]
```

### Get Single Product
**GET** `/api/products/:productCode`

Example: `/api/products/P001`

**Response (200):**
```json
{
  "productCode": "P001",
  "productName": "Rice 25kg",
  "category": "Food",
  "quantityInStock": 100,
  "unitPrice": "25000.00",
  "supplierName": "Rwanda Grain Suppliers",
  "dateReceived": "2026-06-01T00:00:00.000Z",
  "createdAt": "2026-06-02T10:30:00.000Z"
}
```

### Create Product
**POST** `/api/products`

**Request Body:**
```json
{
  "productCode": "P004",
  "productName": "Milk 1L",
  "category": "Dairy",
  "quantityInStock": 50,
  "unitPrice": 1200.00,
  "supplierName": "Dairy Fresh Ltd",
  "dateReceived": "2026-06-02"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Product created successfully",
  "productCode": "P004"
}
```

---

## 3️⃣ Warehouse Endpoints

### Get All Warehouses
**GET** `/api/warehouses`

**Response (200):**
```json
[
  {
    "warehouseCode": "WH001",
    "warehouseName": "Main Warehouse",
    "warehouseLocation": "Kigali City Center",
    "createdAt": "2026-06-02T10:30:00.000Z"
  }
]
```

### Get Single Warehouse
**GET** `/api/warehouses/:warehouseCode`

Example: `/api/warehouses/WH001`

**Response (200):**
```json
{
  "warehouseCode": "WH001",
  "warehouseName": "Main Warehouse",
  "warehouseLocation": "Kigali City Center",
  "createdAt": "2026-06-02T10:30:00.000Z"
}
```

### Create Warehouse
**POST** `/api/warehouses`

**Request Body:**
```json
{
  "warehouseCode": "WH004",
  "warehouseName": "North Branch",
  "warehouseLocation": "Gasabo District"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Warehouse created successfully",
  "warehouseCode": "WH004"
}
```

---

## 4️⃣ Transaction Endpoints (Full CRUD)

### Get All Transactions
**GET** `/api/transactions`

**Response (200):**
```json
[
  {
    "transactionId": 1,
    "productCode": "P001",
    "productName": "Rice 25kg",
    "warehouseCode": "WH001",
    "warehouseName": "Main Warehouse",
    "transactionDate": "2026-06-01T00:00:00.000Z",
    "quantityMoved": 50,
    "transactionType": "IN",
    "createdAt": "2026-06-02T10:30:00.000Z"
  }
]
```

### Get Single Transaction
**GET** `/api/transactions/:transactionId`

Example: `/api/transactions/1`

**Response (200):**
```json
{
  "transactionId": 1,
  "productCode": "P001",
  "productName": "Rice 25kg",
  "warehouseCode": "WH001",
  "warehouseName": "Main Warehouse",
  "transactionDate": "2026-06-01T00:00:00.000Z",
  "quantityMoved": 50,
  "transactionType": "IN",
  "createdAt": "2026-06-02T10:30:00.000Z"
}
```

### Create Transaction
**POST** `/api/transactions`

**Request Body (Stock IN):**
```json
{
  "productCode": "P001",
  "warehouseCode": "WH001",
  "transactionDate": "2026-06-02",
  "quantityMoved": 25,
  "transactionType": "IN"
}
```

**Request Body (Stock OUT):**
```json
{
  "productCode": "P001",
  "warehouseCode": "WH001",
  "transactionDate": "2026-06-02",
  "quantityMoved": 10,
  "transactionType": "OUT"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Transaction created successfully",
  "transactionId": 5
}
```

### Update Transaction
**PUT** `/api/transactions/:transactionId`

Example: `/api/transactions/5`

**Request Body:**
```json
{
  "productCode": "P001",
  "warehouseCode": "WH001",
  "transactionDate": "2026-06-02",
  "quantityMoved": 30,
  "transactionType": "IN"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Transaction updated successfully"
}
```

### Delete Transaction
**DELETE** `/api/transactions/:transactionId`

Example: `/api/transactions/5`

**Success Response (200):**
```json
{
  "success": true,
  "message": "Transaction deleted successfully"
}
```

---

## 5️⃣ Report Endpoints

### Daily Report
**GET** `/api/reports/daily?date=YYYY-MM-DD`

Example: `/api/reports/daily?date=2026-06-02`

**Response (200):**
```json
{
  "date": "2026-06-02",
  "availableStock": 240,
  "stockIn": 100,
  "stockOut": 10,
  "transactionCount": 2
}
```

### Weekly Report
**GET** `/api/reports/weekly?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD`

Example: `/api/reports/weekly?startDate=2026-05-26&endDate=2026-06-02`

**Response (200):**
```json
{
  "startDate": "2026-05-26",
  "endDate": "2026-06-02",
  "availableStock": 240,
  "dailyData": [
    {
      "date": "2026-06-02",
      "stockIn": 100,
      "stockOut": 10
    },
    {
      "date": "2026-06-01",
      "stockIn": 80,
      "stockOut": 20
    }
  ]
}
```

### Monthly Report
**GET** `/api/reports/monthly?month=MM&year=YYYY`

Example: `/api/reports/monthly?month=6&year=2026`

**Response (200):**
```json
{
  "month": "6",
  "year": "2026",
  "availableStock": 240,
  "stockIn": 180,
  "stockOut": 30,
  "transactionCount": 4
}
```

---

## 🧪 Testing with cURL

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"username\":\"admin\",\"password\":\"admin123\"}"
```

### Get All Products
```bash
curl http://localhost:5000/api/products
```

### Create Product
```bash
curl -X POST http://localhost:5000/api/products ^
  -H "Content-Type: application/json" ^
  -d "{\"productCode\":\"P005\",\"productName\":\"Bread\",\"category\":\"Bakery\",\"quantityInStock\":100,\"unitPrice\":500,\"supplierName\":\"Local Bakery\",\"dateReceived\":\"2026-06-02\"}"
```

### Create Transaction
```bash
curl -X POST http://localhost:5000/api/transactions ^
  -H "Content-Type: application/json" ^
  -d "{\"productCode\":\"P001\",\"warehouseCode\":\"WH001\",\"transactionDate\":\"2026-06-02\",\"quantityMoved\":15,\"transactionType\":\"IN\"}"
```

### Update Transaction
```bash
curl -X PUT http://localhost:5000/api/transactions/1 ^
  -H "Content-Type: application/json" ^
  -d "{\"productCode\":\"P001\",\"warehouseCode\":\"WH001\",\"transactionDate\":\"2026-06-02\",\"quantityMoved\":20,\"transactionType\":\"IN\"}"
```

### Delete Transaction
```bash
curl -X DELETE http://localhost:5000/api/transactions/1
```

### Get Daily Report
```bash
curl "http://localhost:5000/api/reports/daily?date=2026-06-02"
```

---

## 📋 Common HTTP Status Codes

| Code | Meaning | When Used |
|------|---------|-----------|
| 200 | OK | Successful GET, PUT, DELETE |
| 201 | Created | Successful POST (resource created) |
| 400 | Bad Request | Invalid request body/parameters |
| 401 | Unauthorized | Invalid login credentials |
| 404 | Not Found | Resource doesn't exist |
| 500 | Server Error | Database or server error |

---

## ✅ Testing Checklist

### Authentication
- [ ] Login with correct credentials
- [ ] Login with incorrect credentials

### Products
- [ ] Get all products
- [ ] Get single product (existing)
- [ ] Get single product (non-existing)
- [ ] Create new product
- [ ] Create product with duplicate code (should fail)

### Warehouses
- [ ] Get all warehouses
- [ ] Get single warehouse (existing)
- [ ] Get single warehouse (non-existing)
- [ ] Create new warehouse
- [ ] Create warehouse with duplicate code (should fail)

### Transactions (Full CRUD)
- [ ] Get all transactions
- [ ] Get single transaction (existing)
- [ ] Get single transaction (non-existing)
- [ ] Create stock IN transaction
- [ ] Create stock OUT transaction
- [ ] Verify stock quantity updated after creation
- [ ] Update transaction
- [ ] Verify stock quantity updated after update
- [ ] Delete transaction
- [ ] Verify stock quantity updated after deletion

### Reports
- [ ] Get daily report (today)
- [ ] Get daily report (specific date)
- [ ] Get weekly report (last 7 days)
- [ ] Get monthly report (current month)
- [ ] Get monthly report (specific month/year)

---

## 🐛 Common Errors

### "Cannot POST /api/products"
- ✅ Check URL spelling
- ✅ Ensure backend server is running
- ✅ Verify port 5000 is correct

### "Database connection failed"
- ✅ Start MySQL service
- ✅ Check credentials in server.js
- ✅ Verify SMS database exists

### "Duplicate entry for key 'PRIMARY'"
- ✅ Use unique productCode/warehouseCode
- ✅ Check if code already exists

### "Cannot add foreign key constraint"
- ✅ Ensure productCode exists before creating transaction
- ✅ Ensure warehouseCode exists before creating transaction

---

## 💡 Tips

1. **Use Postman Collections:** Save all requests for quick testing
2. **Check Response Headers:** Verify Content-Type is application/json
3. **Enable CORS:** Already configured in server.js
4. **Test Sequence:** Create product → Create warehouse → Create transaction
5. **Stock Tracking:** Watch quantityInStock change with transactions

---

**Happy Testing! 🚀**
