# Securinets website

React + Vite static site.

    npm install
    npm run dev       # local preview
    npm run build     # outputs the static site to dist/

Upload the contents of `dist/` to any static host (GitHub Pages, Netlify, Vercel...).
Routing uses the URL hash (#/workshops), so no server setup is needed.

## GitHub Pages

Pushing to `main` builds and deploys the site through GitHub Actions. Once the first
deployment completes, the site is available at
https://j4ckii3.github.io/securinets/.

## What to edit

| What                         | Where                                              |
| ---------------------------- | -------------------------------------------------- |
| Logo (transparent PNG/SVG)   | src/assets/logo.png (replaces the placeholder)     |
| Best of 2025/2026 photos     | src/assets/best-of/ (01-name.jpg, 02-name.jpg...)  |
| Calendar dates + photo links | src/data/calendar.js                               |
| Workshop categories          | src/data/paths.js                                  |
| CTF SAW details              | src/data/events.js                                 |
| Footer social links          | src/data/site.js                                   |
| Colours                      | :root in src/styles/base.css (--signal = #BA0202)   |
