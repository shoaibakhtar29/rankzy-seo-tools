
# ShoaibAkhtar.org - Online SEO Tools - SEO Tools Website

A comprehensive SEO tools website built with React and Node.js. This project provides users with free SEO tools to optimize their website content and improve search engine rankings.

## Features

- **Modern UI**: Clean, responsive interface built with React and Tailwind CSS
- **SEO Optimized**: Meta tags, structured data, and optimized content for better search rankings
- **Multiple SEO Tools**:
  - Word Counter
  - Keyword Density Analyzer
  - Meta Tag Generator
  - Text Case Converter
  - Plagiarism Checker

## Tech Stack

### Frontend
- React.js with TypeScript
- Tailwind CSS
- React Router Dom
- Shadcn UI Components
- Axios for API requests

### Backend
- Node.js with Express
- MongoDB for database
- API endpoints for each tool

## Project Structure

```
├── frontend/             # Frontend source code
│   ├── components/       # UI components
│   ├── pages/            # Page components and routes
│   ├── utils/            # Utility functions
│   └── ...
│
├── backend/              # Backend code
│   ├── controllers/      # API controllers
│   ├── models/           # MongoDB schema models
│   ├── routes/           # API routes
│   └── server.js         # Main server file
│
└── ...
```

## Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB (local or Atlas)

### Installation

1. Clone the repository
```
git clone <repository-url>
cd rankreaddytools
```

2. Install frontend dependencies
```
npm install
```

3. Install backend dependencies
```
cd backend
npm install
```

4. Set up environment variables
```
cp backend/.env.example backend/.env
# Edit the .env file with your configuration
```

5. Start the development servers

Frontend:
```
npm run dev
```

Backend:
```
cd backend
npm run dev
```

## Deployment

### Frontend
The frontend can be deployed to Vercel, Netlify, or any static site host:

```
npm run build
```

### Backend
The backend can be deployed to Heroku, Digital Ocean, or any Node.js host:

```
cd backend
npm start
```

## SEO Features

- Meta tags for all pages
- Structured data for rich snippets
- Sitemap.xml and robots.txt
- Semantic HTML structure
- Mobile-friendly responsive design
- Fast loading times through optimized assets

## License

This project is licensed under the MIT License - see the LICENSE file for details.
