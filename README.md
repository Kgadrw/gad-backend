# Backend (API)

Simple Express + TypeScript API that exposes the portfolio data currently hardcoded in the React components.

## Endpoints

- `GET /health`
- `GET /api/profile`
- `GET /api/about`
- `GET /api/education`
- `GET /api/experiences`
- `GET /api/skills`
- `GET /api/certifications`
- `GET /api/contact`

## Run locally

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

By default it listens on `http://localhost:5174`.

