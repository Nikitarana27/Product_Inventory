# Product Inventory Server

Backend API for the Product Inventory System built with Node.js, Express, and MongoDB.

## Features

- Product management (CRUD operations)
- Category management
- Pagination support
- Search by product name
- Filter by multiple categories
- Server-side validation
- Comprehensive error handling

## Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file based on `.env.example`:
```bash
PORT=5000
MONGODB_URI=mongodb://localhost:27017/product_inventory
NODE_ENV=development
```

3. Seed the database with categories:
```bash
npm run seed
```

### Running the Server

Development mode (with hot reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

### Products
- `POST /api/products` - Create a new product
- `GET /api/products` - Get all products (with pagination, search, and filtering)
- `GET /api/products/:id` - Get a product by ID
- `PUT /api/products/:id` - Update a product
- `DELETE /api/products/:id` - Delete a product

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get a category by ID

## Query Parameters

### GET /api/products
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `search` - Search by product name
- `categories` - Comma-separated category IDs for filtering

Example:
```
GET /api/products?page=1&limit=10&search=laptop&categories=id1,id2
```
