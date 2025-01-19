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

## 📝 API Endpoints

### Get Leads
```http
GET /leads
```
Query Parameters:
- `page` (optional): Page number (default: 1)
- `limit` (optional): Results per page (default: 20)
- `source` (optional): Filter by lead source
- `owner` (optional): Filter by lead owner
- `query` (optional): Search leads by name

### Create Lead
```http
POST /leads
```
Request Body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "source": "Facebook",
  "owner": "1234"
}
```

### Update Lead Stage
```http
PATCH /leads/{leadId}/stage
```
Request Body:
```json
{
  "stage": "In Progress"
}
```

### Update Lead Owner
```http
PATCH /leads/{leadId}/owner
```
Request Body:
```json
{
  "owner": "5678"
}
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
