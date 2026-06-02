# Entity Relationship Diagram (ERD) Design

## Database Design for Stock Management System

---

## 📊 Entity Relationship Diagram

```
┌─────────────────────────────┐
│        PRODUCT              │
├─────────────────────────────┤
│ PK: productCode (VARCHAR)   │
│     productName             │
│     category                │
│     quantityInStock         │
│     unitPrice               │
│     supplierName            │
│     dateReceived            │
│     createdAt               │
└─────────────┬───────────────┘
              │
              │ 1
              │
              │
              │ N
┌─────────────┴───────────────┐
│    STOCK_TRANSACTION        │
├─────────────────────────────┤
│ PK: transactionId (INT)     │
│ FK: productCode    ─────────┼──→ Product.productCode
│ FK: warehouseCode  ─────────┼──→ Warehouse.warehouseCode
│     transactionDate         │
│     quantityMoved           │
│     transactionType         │
│     createdAt               │
└─────────────┬───────────────┘
              │ N
              │
              │
              │ 1
              │
┌─────────────┴───────────────┐
│        WAREHOUSE            │
├─────────────────────────────┤
│ PK: warehouseCode (VARCHAR) │
│     warehouseName           │
│     warehouseLocation       │
│     createdAt               │
└─────────────────────────────┘


┌─────────────────────────────┐
│          USERS              │
├─────────────────────────────┤
│ PK: userId (INT)            │
│     username (UNIQUE)       │
│     password                │
│     createdAt               │
└─────────────────────────────┘
```

---

## 🔗 Relationships

### 1. Product → StockTransaction (One-to-Many)
- **Cardinality:** 1:N
- **Description:** One product can have many transactions (stock in/out)
- **Foreign Key:** StockTransaction.productCode references Product.productCode
- **Cascade:** ON DELETE CASCADE (if product deleted, transactions deleted)

### 2. Warehouse → StockTransaction (One-to-Many)
- **Cardinality:** 1:N
- **Description:** One warehouse can have many transactions
- **Foreign Key:** StockTransaction.warehouseCode references Warehouse.warehouseCode
- **Cascade:** ON DELETE CASCADE (if warehouse deleted, transactions deleted)

### 3. Users (Independent)
- **Description:** Authentication table, no direct relationship with other entities
- **Purpose:** Store system users for login

---

## 📋 Entity Descriptions

### 1. PRODUCT
**Purpose:** Store information about products available in stock

| Attribute | Type | Constraints | Description |
|-----------|------|-------------|-------------|
| productCode | VARCHAR(50) | PRIMARY KEY | Unique product identifier |
| productName | VARCHAR(100) | NOT NULL | Name of the product |
| category | VARCHAR(50) | NOT NULL | Product category |
| quantityInStock | INT | NOT NULL, DEFAULT 0 | Current stock quantity |
| unitPrice | DECIMAL(10,2) | NOT NULL | Price per unit in RWF |
| supplierName | VARCHAR(100) | NOT NULL | Supplier name |
| dateReceived | DATE | NOT NULL | Date product was received |
| createdAt | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Record creation time |

**Business Rules:**
- productCode must be unique
- quantityInStock updates automatically with transactions
- unitPrice in Rwandan Francs (RWF)

---

### 2. WAREHOUSE
**Purpose:** Store warehouse location information

| Attribute | Type | Constraints | Description |
|-----------|------|-------------|-------------|
| warehouseCode | VARCHAR(50) | PRIMARY KEY | Unique warehouse identifier |
| warehouseName | VARCHAR(100) | NOT NULL | Name of the warehouse |
| warehouseLocation | VARCHAR(200) | NOT NULL | Physical location address |
| createdAt | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Record creation time |

**Business Rules:**
- warehouseCode must be unique
- Location should be in Kigali, Rwanda

---

### 3. STOCK_TRANSACTION
**Purpose:** Track all stock movements (in and out)

| Attribute | Type | Constraints | Description |
|-----------|------|-------------|-------------|
| transactionId | INT | PRIMARY KEY, AUTO_INCREMENT | Unique transaction ID |
| productCode | VARCHAR(50) | FOREIGN KEY, NOT NULL | Links to Product |
| warehouseCode | VARCHAR(50) | FOREIGN KEY, NOT NULL | Links to Warehouse |
| transactionDate | DATE | NOT NULL | Date of transaction |
| quantityMoved | INT | NOT NULL | Amount of stock moved |
| transactionType | ENUM('IN','OUT') | NOT NULL | Type: IN or OUT |
| createdAt | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Record creation time |

**Business Rules:**
- transactionType can only be 'IN' or 'OUT'
- IN: Increases product stock (receiving goods)
- OUT: Decreases product stock (selling/dispatching goods)
- quantityMoved must be positive
- Deleting transaction reverses stock changes

---

### 4. USERS
**Purpose:** Store user authentication credentials

| Attribute | Type | Constraints | Description |
|-----------|------|-------------|-------------|
| userId | INT | PRIMARY KEY, AUTO_INCREMENT | Unique user ID |
| username | VARCHAR(50) | UNIQUE, NOT NULL | Login username |
| password | VARCHAR(255) | NOT NULL | User password |
| createdAt | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Record creation time |

**Business Rules:**
- username must be unique
- Default user: admin / admin123

---

## 🎯 ERD Symbols & Notations

### Cardinality Symbols:
- **1** → One
- **N** → Many
- **0..1** → Zero or One
- **1..N** → One or Many

### Relationship Types:
- **─────** → Relationship line
- **┬** → Junction point
- **→** → Foreign key direction

---

## 💡 ERD Drawing Instructions

### For Manual Drawing (on paper):

1. **Draw 4 rectangles** for the 4 entities:
   - Product (top left)
   - Warehouse (bottom left)
   - StockTransaction (center)
   - Users (separate, top right)

2. **Draw relationship lines:**
   - Product to StockTransaction (1:N)
   - Warehouse to StockTransaction (1:N)

3. **Mark Primary Keys** with underline:
   - productCode
   - warehouseCode
   - transactionId
   - userId

4. **Mark Foreign Keys** with "FK":
   - StockTransaction.productCode (FK)
   - StockTransaction.warehouseCode (FK)

5. **Add cardinality notation:**
   - Product side: "1"
   - StockTransaction side: "N" (many)
   - Warehouse side: "1"
   - StockTransaction side: "N" (many)

---

## 🖥️ Digital Drawing Tools

Recommended software for ERD:
1. **Draw.io** (https://app.diagrams.net) - Free, web-based
2. **Lucidchart** (https://www.lucidchart.com) - Professional
3. **MySQL Workbench** - Built-in ERD designer
4. **Edraw Max** - Desktop application
5. **Visual Paradigm** - Full-featured

---

## 🔍 ERD Best Practices

✅ **Include:**
- Entity names (uppercase or title case)
- All attributes for each entity
- Primary keys (marked with PK or underlined)
- Foreign keys (marked with FK)
- Relationship lines with cardinality
- Data types (optional but recommended)

✅ **Guidelines:**
- Use crow's foot notation or Chen notation
- Show cardinality clearly (1:1, 1:N, N:M)
- Use verb phrases on relationships (optional)
- Keep layout clean and readable
- Avoid crossing lines when possible

---

## 📊 Sample Data Relationships

### Example Flow:

```
PRODUCT (P001: Rice 25kg)
    ↓ has many
STOCK_TRANSACTION
    ├─ Transaction #1: IN 50 units (WH001)
    ├─ Transaction #2: OUT 10 units (WH001)
    └─ Transaction #3: IN 30 units (WH002)
    ↓ stored in
WAREHOUSE
    ├─ WH001: Main Warehouse
    └─ WH002: Secondary Storage
```

**Result:** Product P001 has quantityInStock = 70 units

---

## 🔐 Referential Integrity

### Constraints Enforced:

1. **Cannot create transaction** without valid productCode
2. **Cannot create transaction** without valid warehouseCode
3. **Deleting product** removes all its transactions (CASCADE)
4. **Deleting warehouse** removes all its transactions (CASCADE)
5. **Username must be unique** in Users table

---

## 📈 Database Normalization

**Current Normalization Level:** 3NF (Third Normal Form)

✅ **1NF:** All attributes contain atomic values
✅ **2NF:** No partial dependencies
✅ **3NF:** No transitive dependencies

**No Redundancy:** Product and warehouse names stored once, referenced by code

---

This ERD design ensures data integrity, eliminates redundancy, and supports all required operations for the Stock Management System.
