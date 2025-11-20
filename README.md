# MiniStock

A lightweight, cloud-based inventory management tool designed for small retail shops that currently rely on paper logs or spreadsheets to track stock.

## Features

- **Simple Product Management**: Add, edit, and delete products with ease
- **Real-time Stock Updates**: Track inventory changes in real-time
- **Low-Stock Alerts**: Get notified when products are running low
- **Barcode Scanning**: Use your phone camera to scan barcodes
- **Intuitive Reports**: View stock levels and product performance analytics
- **Progressive Web App (PWA)**: Works on any device—laptop, tablet, or smartphone
- **No Special Hardware Required**: Use your existing devices

## Tech Stack

- **Frontend**: Next.js 14 (React) with TypeScript
- **Backend**: Node.js with Express and TypeScript
- **Database**: MongoDB
- **Containerization**: Docker & Docker Compose

## Prerequisites

- Docker and Docker Compose installed on your system
- Node.js 18+ (for local development without Docker)

## Quick Start with Docker

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd mini-stock
   ```

2. Copy environment file:
   ```bash
   cp .env.example .env
   ```

3. Start all services:
   ```bash
   docker-compose up -d
   ```

4. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001
   - MongoDB: localhost:27017

## Development

### Running Services Separately

#### Backend (Express)
```bash
cd backend
npm install
npm run dev
```

#### Frontend (Next.js)
```bash
cd frontend
npm install
npm run dev
```

### Database Setup

MongoDB will be automatically initialized when using Docker Compose. For local development:

1. Install MongoDB or use Docker:
   ```bash
   docker run -d -p 27017:27017 --name mongodb mongo:7
   ```

2. Update `.env` file with your MongoDB connection string

## Project Structure

```
mini-stock/
├── backend/           # Express API server
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── utils/
│   ├── Dockerfile
│   └── package.json
├── frontend/          # Next.js application
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── lib/
│   │   └── types/
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml
├── .env.example
└── README.md
```

## API Endpoints

(Will be documented as the API is developed)

## License

MIT

