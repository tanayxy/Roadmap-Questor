
---

## Getting Started

### Prerequisites

- [Docker](https://www.docker.com/get-started)
- [Node.js](https://nodejs.org/) (for local dev)
- [Python 3.10+](https://www.python.org/) (for AI backend)
- [MySQL](https://www.mysql.com/) (or use Dockerized DB)

### 1. Clone the Repository

```sh
git clone https://github.com/yourusername/roadmap-questor.git
cd roadmap-questor
```

### 2. Environment Setup

- Copy `.env.example` to `.env` and fill in required values for Node.js backend (DB credentials, JWT secret, etc.).
- (Optional) Set up Python virtual environment for `backend/app.py`.

### 3. Run with Docker Compose

```sh
docker-compose up
```
- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend API: [http://localhost:3001](http://localhost:3001)

### 4. Run AI Backend (Python)

```sh
cd backend
pip install -r requirements.txt
python app.py
```

---

## Scripts

- `npm run dev` — Start frontend in development mode
- `npm run build` — Build frontend for production
- `npm run lint` — Lint codebase

---

## API Overview

- `POST /api/register` — Register a new user
- `POST /api/login` — User login
- `GET /api/progress` — Get user progress (auth required)
- `POST /api/progress/learning` — Update learning progress
- `POST /api/progress/quest` — Update quest progress
- `POST /api/roadmaps/custom` — Create a custom roadmap

---

## Technologies Used

- **Frontend:** React, Vite, TypeScript, Tailwind CSS, shadcn/ui, Radix UI
- **Backend:** Node.js, Express, MySQL, JWT, bcrypt
- **AI Backend:** Python, LangChain, Ollama
- **DevOps:** Docker, Docker Compose, Jenkins, Kubernetes

---

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## License

MIT

---

*Happy learning and building!*