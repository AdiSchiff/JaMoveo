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
* **ESLint** & **Prettier** for code quality

---

## Key Features

* **User authentication** & instrument selection
* **Admin‑controlled rehearsal sessions**
* **Real‑time song selection & updates** over WebSockets
* Responsive **lyrics & chord display** with auto‑scroll
* **High‑contrast interface** optimised for dim rehearsal rooms
* **Export set‑lists as PDF** via a Puppeteer worker

---

## Project Structure

```text
JaMoveo/
├── client/              # React front‑end (Vite)
│   ├── src/
│   └── ...
├── server/              # Express + Socket.io API
│   ├── controllers/
│   ├── models/
│   └── ...
├── render-build.sh      # Installs OS libs & Chrome for Puppeteer
├── render.yaml          # Render service definition
└── README.md
```

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
4. Open `http://localhost:5173` (Vite default) in your browser.

---

## Environment Variables

| Variable     | Purpose                                      |
| ------------ | -------------------------------------------- |
| `PORT`       | Port for Express (Render sets automatically) |
| `MONGO_URI`  | MongoDB Atlas connection string              |
| `CLIENT_URL` | Public URL of the front‑end                  |
| `JWT_SECRET` | Secret for signing auth tokens               |

Create a `.env` file in both `client/` and `server/` as required.

---

## Deployment on Render

1. **Create** a **Web Service** from the GitHub repo.
2. **Build Command**: `./render-build.sh`
3. **Start Command**: `node server/index.js`
4. Add the environment variables listed above in **Settings → Environment**.
5. Enable build cache. The script installs Chromium *once* and caches it under `/opt/render/project/.cache/puppeteer`.

> **Puppeteer & Render**
> Render containers run without full Linux namespaces, so Chromium must launch with the *no‑sandbox* flags **and** be installed during build:
>
> ```jsonc
> // package.json – server/
> {
>   "scripts": {
>     "postinstall": "puppeteer browsers install chrome"
>   }
> }
> ```
>
> ```bash
> # render-build.sh (excerpt)
> apt-get update && apt-get install -y \
>   libasound2 libatk1.0-0 libatk-bridge2.0-0 libcups2 libdbus-1-3 \
>   libgdk-pixbuf2.0-0 libnspr4 libnss3 libx11-xcb1 libxcomposite1 \
>   libxdamage1 libxrandr2 libgbm1 xdg-utils fonts-liberation --no-install-recommends
>
> npx puppeteer browsers install chrome
> ```
>
> And when you launch the browser:
>
> ```js
> const browser = await puppeteer.launch({
>   args: ["--no-sandbox", "--disable-setuid-sandbox"],
> });
> ```

---

## Contributing

1. Fork the project & create your feature branch (`git checkout -b feature/awesome`)
2. Commit your changes (`git commit -m 'feat: add awesome feature'`)
3. Push to the branch (`git push origin feature/awesome`)
4. Open a Pull Request 🙌

---

## License

Distributed under the MIT License. See `LICENSE` for more information.
