
# 🛠️ Note Taking App — Backend

This is the backend server of the note-taking app using **Node.js + Express + TypeScript**. It provides secure **OTP and Google OAuth-based authentication**, as well as **CRUD APIs for personal notes**.

## ⚙️ Features

- 📧 OTP via Nodemailer
- 🔐 Google OAuth Login
- 🧾 JWT-based authentication
- 📝 Create/Delete notes
- 🗄️ MongoDB + Mongoose
- 🛡️ Auth middleware protection

---

## 🔧 Tech Stack

- Node.js + Express
- TypeScript
- MongoDB (via Mongoose)
- JWT for token-based auth
- Nodemailer (email OTP)
- Google OAuth

---

## 📂 API Routes

### 🔐 Auth APIs

| Route                     | Method | Description           |
|--------------------------|--------|-----------------------|
| `/api/auth/send-otp`     | POST   | Send OTP to email     |
| `/api/auth/verify-otp`   | POST   | Verify OTP & login    |
| `/api/auth/google-login` | POST   | Login via Google      |

### 📝 Notes APIs (Require JWT)

| Route                 | Method | Description     |
|----------------------|--------|-----------------|
| `/api/notes`         | GET    | Get all notes   |
| `/api/notes`         | POST   | Add a new note  |
| `/api/notes/:id`     | DELETE | Delete a note   |

---

## ⚙️ Environment Variables

Create a `.env` file in root:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/note-app
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
GOOGLE_CLIENT_ID=your_google_client_id
