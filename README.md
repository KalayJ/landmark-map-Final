
# 🗺️ Landmark Map Project (Full Version)

This project was developed as part of the **CENG-3502 Dynamic Web Programming Midterm Assignment**.

## 📌 Project Description

An interactive map application that allows users to:
- Select locations on a map
- Add notes to existing landmarks
- View previously visited landmarks
- Create visiting plans for multiple landmarks
- Search and filter landmarks based on name, category or description

## ⚙️ Technologies Used

- **Frontend**: HTML, CSS, JavaScript, Leaflet.js
- **Backend**: Node.js, Express.js
- **Data Storage**: JSON files (`landmarks.json`, `visited.json`)

## 🔧 How to Run the Project

### 1. Backend Setup
```bash
cd backend
npm install
node server.js
```
Backend will run at: `http://localhost:5000`

### 2. Frontend Usage
No setup required. Just open `frontend/index.html` in a browser.

---

## 📁 Folder Structure

```
project-root/
│
├── backend/
│   ├── server.js
│   ├── data/
│   │   ├── landmarks.json
│   │   └── visited.json
│   └── package.json
│
├── frontend/
│   └── index.html
│
└── README.md
```

---

## ✅ Features Implemented

 Add landmark with name, description, and category
 Add visit notes to selected landmarks
 View visited landmarks with notes
 Create visiting plans with multiple notes
 Search & filter functionality
 Full API implementation (GET, POST, PUT, DELETE)
 Data persistence via JSON files

---

## 👤 Developer Info

- **Name**: Mert Kalaycı  
- **University**: Muğla Sıtkı Koçman University  
- **Course**: CENG-3502 Dynamic Web Programming  
