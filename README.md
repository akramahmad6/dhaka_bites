# Dhaka Bites

A responsive restaurant website for Dhaka Bites with a contact form that emails the restaurant owner.

**Live site:** https://dhaka-bites.netlify.app

## Features

- Responsive design with a mobile navigation menu
- Menu, restaurant story, and contact sections
- Contact form with client- and server-side validation
- Email delivery to the restaurant owner using Nodemailer

## Tech

- Frontend: HTML, CSS, and vanilla JavaScript
- Backend: Node.js, Express, CORS, dotenv, and Nodemailer
- Development: nodemon
- Hosting: Netlify (frontend) and Render (backend)

## Run locally

1. Install Node.js, then open a terminal in the project folder.
2. Set up and start the backend:

   ```powershell
   cd server
   npm install
   Copy-Item .env.example .env
   ```

3. Edit `server/.env` with your Gmail address and Gmail App Password, then run:

   ```powershell
   npm run dev
   ```

4. Open `client/index.html` with the VS Code Live Server extension. The default expected origin is `http://127.0.0.1:5500`.

If the browser reports a CORS error, make sure `CLIENT_URL` in `server/.env` exactly matches the Live Server origin (including `127.0.0.1` versus `localhost` and the port), then restart the server.

## Screenshots

- [Homepage screenshot](./screenshots/homepage.png) — replace this placeholder with a screenshot.
- [Menu screenshot](./screenshots/menu.png) — replace this placeholder with a screenshot.
- [Mobile screenshot](./screenshots/mobile.png) — replace this placeholder with a screenshot.

## Deploy

### Backend on Render

1. Create a **New > Web Service** and connect the GitHub repository.
2. Set **Root Directory** to `server`, **Build Command** to `npm install`, and **Start Command** to `npm start`.
3. Add `EMAIL_USER`, `EMAIL_PASS`, and `CLIENT_URL` as environment variables. `CLIENT_URL` must be the Netlify site URL without a trailing slash; Render supplies `PORT`.

The Render free plan sleeps when idle, so the first request can take 30–60 seconds.

### Frontend on Netlify

1. Connect the GitHub repository.
2. Set **Base directory** to `client`, leave **Build command** empty, and set **Publish directory** to `client`.

After both sites are deployed, replace `API_URL` in `client/app.js` with the Render service URL, set Render's `CLIENT_URL` to the Netlify URL (no trailing slash), then commit and push that change.

## Push to GitHub

After creating the repository at `https://github.com/akramahmad6/dhaka-bites`, run:

```powershell
git remote add origin https://github.com/akramahmad6/dhaka-bites.git
git branch -M main
git push -u origin main
```
