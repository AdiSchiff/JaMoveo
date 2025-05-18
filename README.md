# JaMoveo 🎶

A real‑time collaborative music rehearsal **web application** that lets musicians connect remotely, view synchronized lyrics & chords, and jam together from anywhere.

---

## Live Demo / Deployment

| Environment             | URL                                |
| ----------------------- | ---------------------------------- |
| **Production** (Render) | `https://jamoveo.onrender.com`     |
| **API base**            | `https://jamoveo.onrender.com/api` |

> ℹ️  If the Render service is sleeping it can take \~30 s to wake up on the first request.

---

## Tech Stack

### Front‑end

* **React 18** (Vite bundler)
* **Socket.io‑client** for real‑time events
* **Tailwind CSS** for utility‑first styling

### Back‑end

* **Node.js 20** & **Express 4**
* **Socket.io** WebSocket server
* **MongoDB Atlas** using **Mongoose** ODM
* **Puppeteer v22** – headless Chrome for PDF / screenshot generation

### DevOps / Tooling

* **Render** Web Service (Docker‑free) for server
* **Vercel** Web Service (Docker‑free) for client
* **GitHub Actions** for continuous deployment

---

## Key Features

* **User authentication** & instrument selection
* **Admin‑controlled rehearsal sessions**
* **Real‑time song selection & updates** over WebSockets
* Responsive **lyrics & chord display** with auto‑scroll
* **High‑contrast interface** optimised for dim rehearsal rooms
* **Export set‑lists as PDF** via a Puppeteer worker

---

## Local Development

1. **Clone** the repo

   ```bash
   git clone https://github.com/AdiSchiff/JaMoveo.git && cd JaMoveo
   ```
2. **Install** all dependencies

   ```bash
   npm run install-all   # or run npm install in both client/ & server/
   ```
3. **Start** dev servers

   ```bash
   # Terminal 1 – API
   cd server && npm run dev

   # Terminal 2 – Front‑end
   cd client && npm run dev
   ```
4. Open `http://localhost:3001` (Vite default) in your browser.

5. In the server/index.js file inside the io cors choose the relevent client's URL.

---

## Environment Variables

| Variable            | Purpose                                      |
| --------------------| -------------------------------------------- |
| `PORT`              | Port for Express (Render sets automatically) |
| `MONGO_URI`         | MongoDB Atlas connection string              |
| `REACT_APP_API_URL` | Public URL of the front‑end                  |
| `JWT_SECRET`        | Secret for signing auth tokens               |

Create a `.env` file in both `client/` and `server/` as required.

---

## Deployment URL

* https://ja-moveo-umber.vercel.app/admin
