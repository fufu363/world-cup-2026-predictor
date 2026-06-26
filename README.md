# GoalMap — 2026 World Cup Predictor

[简体中文](./README.zh-CN.md)

A zero-dependency, bilingual World Cup bracket predictor. Rank every group by dragging teams, compare the 12 third-placed teams, and pick every winner through the final.

## Features

- Chinese and English interface with saved language preference
- Drag-and-drop ranking for all 12 groups
- Separate ranking for the 12 third-placed teams
- Automatic round-of-32 allocation
- Complete knockout path through the final
- Browser-based autosave using `localStorage`
- Responsive desktop and mobile layout
- Static architecture designed for GitHub Pages

## Live data snapshot

The included standings snapshot was updated on **June 25, 2026 at 17:22 (UTC+8)**.

When opened as a static page, the app uses the bundled snapshot in [`real-data.js`](./real-data.js). For dynamic data, run the Python backend; it reads ESPN's public standings JSON and converts it into the frontend data shape.

## Run locally

No installation or build step is required.

You can open `index.html` directly, or serve the folder with any static server:

```bash
python -m http.server 8080
```

Then visit `http://localhost:8080`.

## Run with the Python backend

The backend uses only the Python standard library:

```bash
python backend/server.py --port 8000
```

Then visit `http://127.0.0.1:8000`.

The backend exposes two routes:

- `GET /real-data.js`: dynamically generates `window.GOALMAP_REAL_DATA` and falls back to the local snapshot if the upstream request fails
- `GET /api/world-cup/standings`: returns the normalized standings as JSON

## Deploy to GitHub Pages

1. Create a new GitHub repository.
2. Upload or push all files in this folder.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and the `/ (root)` folder.

The site uses relative asset paths, so it works from both a user site and a project site.

## Project structure

```text
.
├── assets/
│   └── favicon.svg
├── index.html
├── styles.css
├── app.js
├── real-data.js
├── backend/
│   ├── server.py
│   └── worldcup_provider.py
├── README.md
├── README.zh-CN.md
└── LICENSE
```

## Data and trademark notice

Standings are based on public competition data and cross-checked against FIFA's official pages. This project is not affiliated with or endorsed by FIFA.

## License

[MIT](./LICENSE)
