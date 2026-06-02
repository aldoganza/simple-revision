# ⚡ QUICK START GUIDE

Get your Stock Management System running in 5 minutes!

---

## 🚀 Three Simple Steps

### 1️⃣ Setup Database (1 minute)

Open MySQL and run:

```sql
source db.sql
```

OR copy/paste the content of `db.sql` into MySQL Workbench and execute.

✅ Database `SMS` created with sample data!

---

### 2️⃣ Start Backend (2 minutes)

**Option A: Double-click the batch file**
- Double-click `START_BACKEND.bat`

**Option B: Manual command**
```bash
cd backend-project
npm install
npm start
```

✅ Backend running on **http://localhost:5000**

---

### 3️⃣ Start Frontend (2 minutes)

**Option A: Double-click the batch file**
- Double-click `START_FRONTEND.bat`

**Option B: Manual command**
```bash
cd frontend-project
npm install
npm start
```

✅ Frontend running on **http://localhost:3000**

---

## 🔐 Login Credentials

```
Username: admin
Password: admin123
```

---

## 📋 What to Test First

1. **Login** → Use credentials above
2. **Dashboard** → See statistics and recent transactions
3. **Products** → Add a new product (e.g., "Banana 1kg")
4. **Warehouses** → Add a new warehouse (e.g., "South Branch")
5. **Transactions** → Create stock IN/OUT, then try Edit/Delete
6. **Reports** → Check Daily, Weekly, Monthly reports

---

## 🎯 Feature Highlights

### ✅ What Works

| Feature | Status |
|---------|--------|
| User Login | ✅ Working |
| Dashboard | ✅ Working |
| Add Product | ✅ Working |
| Add Warehouse | ✅ Working |
| Add Transaction | ✅ Working |
| Edit Transaction | ✅ Working |
| Delete Transaction | ✅ Working |
| Daily Report | ✅ Working |
| Weekly Report | ✅ Working |
| Monthly Report | ✅ Working |
| Responsive Design | ✅ Working |

---

## 📱 Pages Overview

### 🏠 Dashboard
- View total products, warehouses, transactions, stock
- See recent transactions

### 📦 Products
- Add new products
- View all products in table

### 🏢 Warehouses
- Add new warehouses
- View warehouses in cards

### 🔄 Transactions
- **Full CRUD:**
  - ➕ Add (Stock IN/OUT)
  - ✏️ Edit
  - 🗑️ Delete
  - 👁️ View all

### 📊 Reports
- 📅 Daily (select date)
- 📆 Weekly (date range)
- 📈 Monthly (month/year)

---

## 🛠️ Tech Stack

```
Frontend:  React.js + Tailwind CSS + Axios
Backend:   Node.js + Express.js
Database:  MySQL
```

---

## 💡 Quick Tips

### Adding Sample Data

**Quick Test Product:**
- Code: TEST001
- Name: Test Product
- Category: Test
- Stock: 100
- Price: 1000
- Supplier: Test Supplier
- Date: Today

**Quick Test Warehouse:**
- Code: WHTEST
- Name: Test Warehouse
- Location: Kigali Test Area

**Quick Test Transaction:**
- Select any product & warehouse
- Date: Today
- Quantity: 10
- Type: IN

---

## 🐛 Troubleshooting

### Backend won't start?
```bash
# Check if port 5000 is free
netstat -an | find "5000"

# If busy, change port in server.js
```

### Frontend won't start?
```bash
# Check if port 3000 is free
netstat -an | find "3000"

# Delete node_modules and reinstall
rmdir /s /q node_modules
npm install
```

### Database connection error?
```bash
# Check MySQL is running
mysql --version

# Verify credentials in server.js line 16
```

### "Module not found" error?
```bash
# Reinstall dependencies
npm install
```

---

## 📊 Sample Test Scenario

1. **Login** as admin
2. **Add Product:** 
   - Code: P999
   - Name: Water 500ml
   - Category: Beverages
   - Stock: 0 (we'll add via transaction)
   - Price: 500
   - Supplier: Water Co
   - Date: Today

3. **Add Warehouse:**
   - Code: WH999
   - Name: Test Storage
   - Location: Nyarugenge

4. **Add Transaction (IN):**
   - Product: Water 500ml
   - Warehouse: Test Storage
   - Date: Today
   - Quantity: 100
   - Type: IN

5. **Check:** Go to Products → Water should show 100 in stock

6. **Add Transaction (OUT):**
   - Product: Water 500ml
   - Warehouse: Test Storage
   - Date: Today
   - Quantity: 25
   - Type: OUT

7. **Check:** Go to Products → Water should show 75 in stock

8. **Edit Transaction:** Change OUT quantity from 25 to 15

9. **Check:** Go to Products → Water should show 85 in stock

10. **Generate Report:** Go to Reports → Daily → See today's activity

---

## ✅ Success Indicators

You know it's working when:
- ✅ Dashboard shows 3+ products
- ✅ Dashboard shows 3+ warehouses
- ✅ Dashboard shows 4+ transactions
- ✅ Can add new product without errors
- ✅ Can add transaction and see stock change
- ✅ Can edit transaction and stock updates
- ✅ Can delete transaction and stock reverts
- ✅ Reports show correct numbers

---

## 🎨 UI Features

- **Colors:**
  - Blue = Primary actions, navigation
  - Green = Stock IN, success
  - Red = Stock OUT, delete
  - Gray = Text, backgrounds

- **Responsive:**
  - Works on desktop (1920x1080)
  - Works on tablet (768px)
  - Works on mobile (375px)

- **Clean Design:**
  - No gradients (solid colors only)
  - Simple cards and tables
  - Professional icons

---

## 📖 Quick Reference

### API Base URL
```
http://localhost:5000
```

### Key Endpoints
```
POST   /api/auth/login
GET    /api/products
POST   /api/products
GET    /api/warehouses
POST   /api/warehouses
GET    /api/transactions
POST   /api/transactions
PUT    /api/transactions/:id
DELETE /api/transactions/:id
GET    /api/reports/daily?date=YYYY-MM-DD
GET    /api/reports/weekly?startDate=...&endDate=...
GET    /api/reports/monthly?month=MM&year=YYYY
```

---

## 🎯 Testing Checklist

Quick 5-minute test:

- [ ] Login works
- [ ] Dashboard loads
- [ ] Add product works
- [ ] Add warehouse works
- [ ] Add transaction IN works
- [ ] Stock quantity increased
- [ ] Add transaction OUT works
- [ ] Stock quantity decreased
- [ ] Edit transaction works
- [ ] Delete transaction works
- [ ] Daily report works
- [ ] Logout works

---

## 📞 Common Questions

**Q: Where is the data stored?**  
A: MySQL database named `SMS`

**Q: Can I add more users?**  
A: Yes, insert into Users table in MySQL

**Q: How to reset to default?**  
A: Re-run db.sql script

**Q: Can I change the port?**  
A: Yes, edit PORT in server.js and update API URLs in frontend

**Q: Is this production-ready?**  
A: No, passwords should be hashed, add more validation for production

---

## 🚀 You're Ready!

Everything is set up and ready to use. 

**Start URL:** http://localhost:3000

**Default Login:** admin / admin123

**Enjoy your Stock Management System! 🎉**

---

**Need help?** Check the full README.md for detailed documentation.
