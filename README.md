# Stock Management System (SMS)
## StockHub Ltd - Kigali, Rwanda

A complete web-based stock management application built with React.js, Node.js, Express.js, and MySQL.

---

## 📋 Project Structure

```
FirstName_LastName_National_Practical_Exam_2026/
├── db.sql                          # Database schema and sample data
├── backend-project/
│   ├── server.js                   # Complete backend server
│   └── package.json                # Backend dependencies
├── frontend-project/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.js
│   │   │   ├── Navbar.js
│   │   │   ├── Dashboard.js
│   │   │   ├── Product.js
│   │   │   ├── Warehouse.js
│   │   │   ├── Transaction.js
│   │   │   └── Reports.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   ├── tailwind.config.js
│   └── postcss.config.js
└── README.md
```

---

## 🗄️ Database Design

### Entities and Relationships:

1. **Product** (productCode PK, productName, category, quantityInStock, unitPrice, supplierName, dateReceived)
2. **Warehouse** (warehouseCode PK, warehouseName, warehouseLocation)
3. **StockTransaction** (transactionId PK, productCode FK, warehouseCode FK, transactionDate, quantityMoved, transactionType)
4. **Users** (userId PK, username, password)

### Relationships:
- Product 1:N StockTransaction (One product can have many transactions)
- Warehouse 1:N StockTransaction (One warehouse can have many transactions)

---

## 🚀 Installation & Setup

### Prerequisites:
- Node.js (v14 or higher)
- MySQL (v5.7 or higher)
- npm or yarn

### Step 1: Database Setup

1. Start MySQL server
2. Open MySQL command line or MySQL Workbench
3. Run the database script:

```bash
mysql -u root -p < db.sql
```

Or manually:
```sql
source db.sql
```

### Step 2: Backend Setup

1. Navigate to backend directory:
```bash
cd backend-project
```

2. Install dependencies:
```bash
npm install
```

3. Update database credentials in `server.js` (if needed):
```javascript
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'YOUR_MYSQL_PASSWORD',  // Update this
    database: 'SMS'
});
```

4. Start backend server:
```bash
npm start
```

Backend will run on: `http://localhost:5000`

### Step 3: Frontend Setup

1. Open new terminal and navigate to frontend directory:
```bash
cd frontend-project
```

2. Install dependencies:
```bash
npm install
```

3. Start frontend development server:
```bash
npm start
```

Frontend will run on: `http://localhost:3000`

---

## 🔐 Default Login Credentials

- **Username:** admin
- **Password:** admin123

---

## 📱 Features

### 1. **Authentication**
- Secure login system
- Session management

### 2. **Product Management**
- Add new products
- View all products in a table
- Track product details (code, name, category, stock, price, supplier, date)

### 3. **Warehouse Management**
- Add new warehouses
- View all warehouses in card layout
- Track warehouse location

### 4. **Transaction Management (Full CRUD)**
- ✅ **Create:** Add stock IN/OUT transactions
- ✅ **Read:** View all transactions
- ✅ **Update:** Edit existing transactions
- ✅ **Delete:** Remove transactions
- Automatic stock quantity updates

### 5. **Reports**
- **Daily Report:** Stock status for a specific date
- **Weekly Report:** Stock movement over a week with daily breakdown
- **Monthly Report:** Complete monthly stock analysis

### 6. **Dashboard**
- Overview statistics (products, warehouses, transactions, total stock)
- Recent transactions display
- Visual cards with icons

### 7. **Responsive Design**
- Works on desktop, tablet, and mobile
- Clean, professional UI with Tailwind CSS
- No gradients, simple and elegant design

---

## 🎨 Technology Stack

### Frontend:
- React.js 18
- React Router DOM (navigation)
- Axios (API calls)
- Tailwind CSS (styling)

### Backend:
- Node.js
- Express.js
- MySQL2 (database driver)
- CORS (cross-origin requests)
- Body Parser (request parsing)

### Database:
- MySQL

---

## 📊 API Endpoints

### Authentication
- `POST /api/auth/login` - User login

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:code` - Get single product
- `POST /api/products` - Create product

### Warehouses
- `GET /api/warehouses` - Get all warehouses
- `GET /api/warehouses/:code` - Get single warehouse
- `POST /api/warehouses` - Create warehouse

### Transactions
- `GET /api/transactions` - Get all transactions
- `GET /api/transactions/:id` - Get single transaction
- `POST /api/transactions` - Create transaction
- `PUT /api/transactions/:id` - Update transaction
- `DELETE /api/transactions/:id` - Delete transaction

### Reports
- `GET /api/reports/daily?date=YYYY-MM-DD` - Daily report
- `GET /api/reports/weekly?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD` - Weekly report
- `GET /api/reports/monthly?month=MM&year=YYYY` - Monthly report

---

## 🧪 Testing

### Sample Data
The database includes sample data:
- 3 Warehouses
- 3 Products
- 4 Sample Transactions

### Testing Steps:
1. Login with admin credentials
2. View dashboard statistics
3. Add a new product
4. Add a new warehouse
5. Create stock IN transaction
6. Create stock OUT transaction
7. Edit a transaction
8. Delete a transaction
9. Generate daily report
10. Generate weekly report
11. Generate monthly report

---

## 🎯 Key Features Implemented

✅ Complete CRUD operations on transactions
✅ Automatic stock quantity updates on transactions
✅ Transaction rollback on delete/update
✅ User authentication system
✅ Responsive design (mobile-friendly)
✅ Professional UI with Tailwind CSS
✅ Real-time data updates
✅ Form validation
✅ Error handling
✅ Daily, weekly, and monthly reports
✅ Clean navigation menu

---

## 📝 Notes

- Stock quantities are automatically updated when transactions are created, updated, or deleted
- Transaction updates properly reverse old stock changes and apply new ones
- All forms include validation
- The system uses database transactions to ensure data integrity
- Reports show current available stock and historical movement data

---

## 👨‍💻 Development Time

Total Development Time: 6 hours (as per requirement)

---

## 📧 Support

For any issues or questions, please contact the system administrator.

---

**Developed for StockHub Ltd, Kigali, Rwanda**
