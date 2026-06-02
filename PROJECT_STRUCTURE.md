# Project Structure Overview

## 📁 Complete File Structure

```
FirstName_LastName_National_Practical_Exam_2026/
│
├── 📄 README.md                           # Complete project documentation
├── 📄 INSTALLATION_GUIDE.md               # Quick setup instructions
├── 📄 PROJECT_STRUCTURE.md                # This file
├── 📄 db.sql                              # Database schema & sample data
│
├── 📂 backend-project/
│   ├── 📄 server.js                       # Complete backend server (all routes)
│   ├── 📄 package.json                    # Backend dependencies
│   └── 📄 .gitignore                      # Git ignore file
│
└── 📂 frontend-project/
    ├── 📂 public/
    │   └── 📄 index.html                  # HTML template
    │
    ├── 📂 src/
    │   ├── 📂 components/
    │   │   ├── 📄 Login.js                # Login page component
    │   │   ├── 📄 Navbar.js               # Navigation bar component
    │   │   ├── 📄 Dashboard.js            # Dashboard with statistics
    │   │   ├── 📄 Product.js              # Product management (INSERT only)
    │   │   ├── 📄 Warehouse.js            # Warehouse management (INSERT only)
    │   │   ├── 📄 Transaction.js          # Transaction CRUD (full operations)
    │   │   └── 📄 Reports.js              # Daily/Weekly/Monthly reports
    │   │
    │   ├── 📄 App.js                      # Main app with routing
    │   ├── 📄 index.js                    # React entry point
    │   └── 📄 index.css                   # Global styles with Tailwind
    │
    ├── 📄 package.json                    # Frontend dependencies
    ├── 📄 tailwind.config.js              # Tailwind CSS configuration
    ├── 📄 postcss.config.js               # PostCSS configuration
    └── 📄 .gitignore                      # Git ignore file
```

---

## 🗂️ Component Breakdown

### Backend (server.js)
Single file containing all backend logic:

```javascript
├── Database Connection Setup
├── Middleware Configuration (CORS, body-parser)
│
├── Authentication Routes
│   └── POST /api/auth/login
│
├── Product Routes
│   ├── GET /api/products (all)
│   ├── GET /api/products/:code (single)
│   └── POST /api/products (create)
│
├── Warehouse Routes
│   ├── GET /api/warehouses (all)
│   ├── GET /api/warehouses/:code (single)
│   └── POST /api/warehouses (create)
│
├── Transaction Routes
│   ├── GET /api/transactions (all)
│   ├── GET /api/transactions/:id (single)
│   ├── POST /api/transactions (create)
│   ├── PUT /api/transactions/:id (update)
│   └── DELETE /api/transactions/:id (delete)
│
├── Reports Routes
│   ├── GET /api/reports/daily
│   ├── GET /api/reports/weekly
│   └── GET /api/reports/monthly
│
└── Server Startup (Port 5000)
```

### Frontend Components

#### 1. **Login.js**
- User authentication form
- Username and password fields
- Error handling
- Redirects to dashboard on success

#### 2. **Navbar.js**
- Navigation menu
- Active page highlighting
- User info display
- Logout button

#### 3. **Dashboard.js**
- 4 statistics cards (Products, Warehouses, Transactions, Total Stock)
- Recent transactions table
- Visual icons for each stat

#### 4. **Product.js**
- Add product form (INSERT operation)
- Product list table
- Form validation
- Success/error messages

#### 5. **Warehouse.js**
- Add warehouse form (INSERT operation)
- Warehouse display in cards
- Location information
- Visual icons

#### 6. **Transaction.js**
- **Full CRUD Operations:**
  - CREATE: Add new transaction
  - READ: View all transactions
  - UPDATE: Edit existing transaction
  - DELETE: Remove transaction
- Product and warehouse selection dropdowns
- Stock type (IN/OUT)
- Automatic stock updates

#### 7. **Reports.js**
- Report type selector (Daily/Weekly/Monthly)
- Date filters
- Statistical cards
- Daily breakdown table for weekly reports

---

## 🗄️ Database Tables

### 1. **Product**
```sql
productCode (PK)
productName
category
quantityInStock
unitPrice
supplierName
dateReceived
createdAt
```

### 2. **Warehouse**
```sql
warehouseCode (PK)
warehouseName
warehouseLocation
createdAt
```

### 3. **StockTransaction**
```sql
transactionId (PK, AUTO_INCREMENT)
productCode (FK → Product)
warehouseCode (FK → Warehouse)
transactionDate
quantityMoved
transactionType (ENUM: 'IN', 'OUT')
createdAt
```

### 4. **Users**
```sql
userId (PK, AUTO_INCREMENT)
username (UNIQUE)
password
createdAt
```

---

## 🔄 Data Flow

### Creating a Transaction:
```
User Input → Transaction Component → Axios POST Request → Backend API
→ Database Transaction Begin → Insert StockTransaction
→ Update Product quantityInStock → Commit Transaction
→ Response → Frontend Update → Success Message
```

### Viewing Reports:
```
User Selects Report Type → Reports Component → Axios GET Request
→ Backend API → SQL Aggregation Queries → Database
→ Response with Statistics → Frontend Display → Visual Cards
```

### Authentication Flow:
```
Login Form → POST /api/auth/login → MySQL Query
→ Validate Credentials → Return User Data → Store in LocalStorage
→ Redirect to Dashboard → Navbar Shows Username
```

---

## 🎨 Styling Architecture

### Tailwind CSS Classes Used:

**Colors:**
- Blue: Primary actions, product stats
- Green: Success messages, stock IN, warehouses
- Red: Delete actions, stock OUT
- Gray: Text, backgrounds, borders
- Orange: Total stock statistics

**Components:**
- Cards: `bg-white rounded-lg shadow p-6`
- Buttons: `bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg`
- Inputs: `px-4 py-2 border border-gray-300 rounded-lg focus:ring-2`
- Tables: `w-full divide-y divide-gray-200`

**Responsive:**
- Grid: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4`
- Flex: `flex flex-wrap gap-4`
- Hidden on mobile: `hidden md:flex`

---

## 📊 Features Summary

### CRUD Operations:
| Entity | Create | Read | Update | Delete |
|--------|--------|------|--------|--------|
| Product | ✅ | ✅ | ❌ | ❌ |
| Warehouse | ✅ | ✅ | ❌ | ❌ |
| Transaction | ✅ | ✅ | ✅ | ✅ |
| Users | - | ✅ | - | - |

### Reports:
- ✅ Daily Report (specific date)
- ✅ Weekly Report (date range with daily breakdown)
- ✅ Monthly Report (month & year selection)

### Additional Features:
- ✅ User Authentication
- ✅ Automatic stock quantity updates
- ✅ Transaction rollback on delete
- ✅ Responsive design
- ✅ Form validation
- ✅ Error handling
- ✅ Success/error messages

---

## 🚀 Quick Navigation

- **Login:** `http://localhost:3000/login`
- **Dashboard:** `http://localhost:3000/dashboard`
- **Products:** `http://localhost:3000/products`
- **Warehouses:** `http://localhost:3000/warehouses`
- **Transactions:** `http://localhost:3000/transactions`
- **Reports:** `http://localhost:3000/reports`

---

## 📝 Important Notes

1. **Single File Backend:** All backend logic is in one file (`server.js`) as requested
2. **Simple Structure:** Frontend uses simple component structure, no complex folder nesting
3. **No Gradients:** Clean, professional design without linear gradients
4. **Professional UI:** Tailwind CSS with icons, cards, and responsive layout
5. **Full CRUD on Transactions:** Only transactions have update and delete operations
6. **Automatic Stock Management:** Stock quantities update automatically with transactions

---

**Total Files Created:** 24 files
**Backend Files:** 3 (server.js, package.json, .gitignore)
**Frontend Files:** 13 main files + documentation
**Database Files:** 1 (db.sql)
**Documentation Files:** 3 (README, INSTALLATION_GUIDE, PROJECT_STRUCTURE)
