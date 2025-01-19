# ERP Lead Management System

A robust backend system built with Cloudflare Workers for managing sales leads.
This system provides RESTful APIs for lead management operations including creation, updating, searching, and filtering of leads.

## 🛠️ Tech Stack

- **Runtime**: Cloudflare Workers
- **API Framework**: Hono.js
- **Database**: NeonDB (Postgres)
- **ORM**: Drizzle ORM
- **Type Safety**: TypeScript
- **Validation**: Zod
- **Testing**: Vitest

## 🏗️ Architecture

The project follows a clean architecture pattern with:

- Controllers: Handle HTTP requests and responses
- Services: Contain business logic
- Models: Define database schema
- Types: Define TypeScript types and validation schemas
- Middleware: Handle cross-cutting concerns
- Config: Manage application configuration

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Cloudflare account
- NeonDB account

## 🚀 Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd erp-lead-management
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Create .dev.vars file for local development
cp .env.example .dev.vars
# Edit .dev.vars with your credentials
```

4. Set up the database:
```bash
# Generate database migrations
npm run generate

# Apply migrations
npm run migrate
```

5. Start development server:
```bash
npm run dev
```

## 🔑 Environment Variables

Create a `.dev.vars` file in the root directory:

```env
DATABASE_URL=postgres://<user>:<password>@<host>/<database>
```

### 📝 API Endpoints

### Get Leads
``` 
- GET /leads  :Retrieves a list of leads with optional filters (e.g., page, limit, source, owner, and search query).
```

### Create Lead
``` 
POST /leads   :Creates a new lead with provided details like name, email, source, and owner.
```

### Update Lead Stage
``` 
PATCH /leads/:leadId/stage   :Updates the stage of a lead (e.g., from 'New' to 'In Progress').
```

### Update Lead Owner
``` 
PATCH /leads/:leadId/owner    :Changes the owner of the specified lead.
```

## 🧪 Testing

Run the test suite:
```bash
npm test
```

## 📦 Deployment

1. Login to Cloudflare:
```bash
npx wrangler login
```

2. Set up your secrets:
```bash
npx wrangler secret put DATABASE_URL
```

3. Deploy:
```bash
npm run deploy
```

## 📁 Project Structure

```
src/
├── config/         # Configuration files
├── controllers/    # Request handlers
├── models/         # Database models and schema
├── services/       # Business logic
├── middleware/     # Custom middleware
├── types/          # TypeScript type definitions
└── index.ts        # Application entry point
```

## 🛠️ Development Commands

- `npm run dev`: Start development server
- `npm run deploy`: Deploy to Cloudflare Workers
- `npm test`: Run tests
- `npm run generate`: Generate database migrations
- `npm run migrate`: Apply database migrations

## ⚡ Performance Considerations

- Uses connection pooling for database connections
- Implements pagination for large datasets
- Leverages Cloudflare's edge network for low latency
- Uses proper indexing on database queries

## 🔒 Security Features

- Input validation using Zod
- CORS protection
- Environment variable security
- SQL injection prevention through ORM
- Request validation middleware

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
