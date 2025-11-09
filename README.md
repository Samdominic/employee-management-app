---

# 👩‍💼 Employee Management App

A modern, responsive Employee Management System built with **Angular**, **Angular Material**, and **JSON Server**.
This app allows you to manage employee details — including adding, editing, viewing, and deleting employees — with a clean and intuitive UI.

---

## 🚀 Getting Started

Follow the steps below to set up and run the project locally.

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Samdominic/employee-management-app.git
cd employee-management-app
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Run the Angular Application

```bash
ng serve
```

The application will be available at:
👉 **[http://localhost:4200](http://localhost:4200)**

### 4️⃣ Run the JSON Server (Mock API)

In a separate terminal, run the JSON server:

```bash
npm run watch:json-server
```

This starts the mock backend on:
👉 **[http://localhost:3000](http://localhost:3000)**

> The command is defined in `package.json` as:
>
> ```json
> "watch:json-server": "json-server --watch db.json --port 3000"
> ```

---

## ⚙️ Project Overview

| Service     | Port   | Command                     |
| ----------- | ------ | --------------------------- |
| Angular App | `4200` | `ng serve`                  |
| JSON Server | `3000` | `npm run watch:json-server` |

---

## 🧩 Tech Stack

* **Angular 20**
* **Angular Material**
* **TypeScript**
* **RxJS**
* **JSON Server**

---

## 📁 Features

* ➕ Add new employees
* ✏️ Edit employee details
* 🗑️ Delete employees
* 🔍 Search and filter by name or department
* 📊 Responsive Material Design UI

---

## 🧑‍💻 Author

**Sam Dominic**
[GitHub Profile](https://github.com/Samdominic)

---

Would you like me to make it include **badges** (for Angular version, license, and last update) at the top — like professional open-source projects?
