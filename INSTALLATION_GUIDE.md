# Quick Installation Guide - Stock Management System

## ⚡ Quick Start (3 Simple Steps)

### Step 1: Setup Database (2 minutes)

1. Open **MySQL Workbench** or **MySQL Command Line**
2. Copy and paste content from `db.sql` file
3. Execute the script
4. Database `SMS` is now ready!

Alternative command line method:
```bash
mysql -u root -p < db.sql
```

---

### Step 2: Start Backend Server (1 minute)

Open Command Prompt/Terminal:

```bash
cd backend-project
npm install
npm start
```

✅ Backend running at: **http://localhost:5000**

**Important:** If you have a MySQL password, open `server.js` and update line 16:
```javascript
password: 'YOUR_PASSWORD_HERE'
```

---

### Step 3: Start Frontend Application (1 minute)

Open NEW Command Prompt/Terminal:

```bash
cd frontend-project
npm install
npm start
```

✅ Frontend running at: **http://localhost:3000**

Browser will open automatically!

---

## 🔐 Login to System

**Username:** admin  
**Password:** admin123

---

## ✅ Verify Installation

After login, you should see:
- Dashboard with 4 statistics cards
- Navigation menu: Dashboard, Products, Warehouses, Transactions, Reports
- Sample data displayed

---

## 🐛 Troubleshooting

### Backend won't start?
- Make sure MySQL is running
- Check database credentials in `server.js`
- Verify port 5000 is not in use

### Frontend won't start?
- Make sure backend is running first
- Verify port 3000 is not in use
- Clear browser cache and reload

### "Cannot connect to database"?
- Verify MySQL is running: `mysql --version`
- Check username/password in `server.js`
- Ensure database `SMS` exists: `SHOW DATABASES;`

### Port already in use?
Change backend port in `server.js`:
```javascript
const PORT = 5001; // Change to any available port
```

Then update frontend API calls in all component files:
```javascript
'http://localhost:5001/api/...'
```

---

## 📦 Dependencies Installed

### Backend:
- express
- mysql2
- cors
- body-parser

### Frontend:
- react
- react-dom
- react-router-dom
- axios
- tailwindcss
- autoprefixer
- postcss

---

## 🎯 What to Test

1. ✅ Login with admin credentials
2. ✅ View dashboard statistics
3. ✅ Add a product (Products page)
4. ✅ Add a warehouse (Warehouses page)
5. ✅ Create stock IN transaction
6. ✅ Create stock OUT transaction
7. ✅ Edit a transaction (only transactions can be edited)
8. ✅ Delete a transaction
9. ✅ View reports (daily, weekly, monthly)
10. ✅ Logout

---

## 📱 Responsive Design

- Open the application on your phone browser
- Navigate to: `http://YOUR_COMPUTER_IP:3000`
- Everything should work perfectly!

---

## 🆘 Need Help?

Common Commands:

**Check if MySQL is running:**
```bash
mysql --version
```

**Check if Node.js is installed:**
```bash
node --version
npm --version
```

**Stop backend server:**
Press `Ctrl + C` in the backend terminal

**Stop frontend server:**
Press `Ctrl + C` in the frontend terminal

**Restart everything:**
1. Stop both servers (Ctrl + C)
2. Close terminals
3. Repeat Step 2 and Step 3 above

---

## ✨ You're All Set!

Your Stock Management System is now running and ready to use!

Navigate to: **http://localhost:3000** and login!
