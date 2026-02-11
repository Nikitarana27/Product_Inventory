# Product Inventory System

A complete MERN (MongoDB, Express.js, React.js, Node.js) stack application for managing product inventory with advanced features like search, filtering, and pagination.

## 📋 Features

### Product Management
- ✅ Create products with unique names
- ✅ Add product description and quantity
- ✅ Assign multiple categories to products
- ✅ Delete products with confirmation
- ✅ Edit product information

### Product Listing
- ✅ Paginated product display (10 items per page)
- ✅ Display product name, description, quantity, and categories
- ✅ Show product creation date
- ✅ Numbered pagination controls

### Search & Filtering
- ✅ Real-time search by product name
- ✅ Multi-select category filtering
- ✅ Products matching ANY selected category appear in results
- ✅ Clear filters button

### Validation & Error Handling
- ✅ Client-side validation with real-time feedback
- ✅ Server-side validation
- ✅ Unique product name constraint
- ✅ Comprehensive error messages
- ✅ User-friendly notifications

### Performance & Scalability
- ✅ Database indexes on frequently queried fields
- ✅ Pagination for efficient data handling
- ✅ Modular code structure
- ✅ RESTful API design

## 🏗️ Project Structure

```
Product Inventory/
├── server/                    # Node.js + Express backend
│   ├── config/
│   │   └── database.js       # MongoDB connection
│   ├── models/
│   │   ├── Product.js        # Product schema
│   │   └── Category.js       # Category schema
│   ├── controllers/
│   │   ├── productController.js
│   │   └── categoryController.js
│   ├── routes/
│   │   ├── productRoutes.js
│   │   └── categoryRoutes.js
│   ├── middleware/
│   │   ├── validation.js     # Express validation
│   │   └── errorHandler.js   # Error handling
│   ├── seeders/
│   │   └── categorySeeder.js # Category seeding
│   ├── server.js             # Entry point
│   ├── package.json
│   ├── .env.example
│   └── README.md
│
└── client/                    # React frontend
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── AddProduct.js
    │   │   ├── ProductList.js
    │   │   └── FilterSearch.js
    │   ├── services/
    │   │   └── api.js        # API client
    │   ├── styles/
    │   │   ├── index.css
    │   │   ├── App.css
    │   │   ├── AddProduct.css
    │   │   ├── ProductList.css
    │   │   └── FilterSearch.css
    │   ├── App.js
    │   └── index.js
    ├── package.json
    └── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js v14+
- MongoDB (local or cloud, e.g., MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file from `.env.example`:
```bash
PORT=5000
MONGODB_URI=mongodb://localhost:27017/product_inventory
NODE_ENV=development
```

4. Seed categories:
```bash
npm run seed
```

5. Start the server:
```bash
# Development mode (with hot reload)
npm run dev

# Production mode
npm start
```

Server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

Application will open at `http://localhost:3000`

## 📊 Database Schema

### Product
```javascript
{
  name: String (unique, 3-100 chars),
  description: String (10-1000 chars),
  quantity: Number (≥ 0),
  categories: [ObjectId],
  createdAt: Date,
  updatedAt: Date
}
```

### Category
```javascript
{
  name: String (unique),
  description: String,
  createdAt: Date,
  updatedAt: Date
}
```

## 🔌 API Endpoints

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/products` | Create product |
| GET | `/api/products` | Get all products (paginated) |
| GET | `/api/products/:id` | Get product by ID |
| PUT | `/api/products/:id` | Update product |
| DELETE | `/api/products/:id` | Delete product |

### Categories
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/categories` | Get all categories |
| GET | `/api/categories/:id` | Get category by ID |

### Query Parameters (GET /api/products)
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `search` - Search by product name
- `categories` - Comma-separated category IDs

### Example Requests

```bash
# Get page 1 with 10 items
GET /api/products?page=1&limit=10

# Search for "laptop"
GET /api/products?search=laptop

# Filter by categories
GET /api/products?categories=id1,id2

# Combined
GET /api/products?page=1&limit=10&search=laptop&categories=id1,id2
```

## ✅ Validation Rules

### Product Name
- Required
- Must be unique
- 3-100 characters
- Trimmed before storage

### Description
- Required
- 10-1000 characters

### Quantity
- Required
- Non-negative integer

### Categories
- At least one required
- Must exist in database

## 🎨 UI/UX Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Form Validation**: Real-time error feedback
- **Category Tags**: Color-coded category badges
- **Pagination**: Numbered page controls
- **Search**: Instant search results
- **Filters**: Multi-select dropdowns
- **Confirmations**: Delete confirmation dialogs
- **Success Messages**: Feedback on successful actions

## 🛡️ Error Handling

- **Validation Errors**: Field-specific error messages
- **Duplicate Names**: Unique constraint enforcement
- **Not Found**: 404 responses for missing resources
- **Server Errors**: Generic 500 error handling
- **Network Errors**: Graceful error display to users

## 📱 Responsive Breakpoints

- Mobile: < 480px
- Tablet: 480px - 768px
- Desktop: > 768px

## 🔄 State Management

- React Hooks (useState, useEffect)
- Local component state for forms
- API calls for data fetching

## 📦 Dependencies

### Backend
- express: Web framework
- mongoose: MongoDB ORM
- cors: CORS middleware
- express-validator: Input validation
- dotenv: Environment variables

### Frontend
- react: UI library
- axios: HTTP client
- react-router-dom: Navigation

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running locally or connection string is correct
- Check `.env` file has correct `MONGODB_URI`

### Port Already in Use
- Change `PORT` in `.env` (default: 5000 for server, 3000 for client)

### CORS Errors
- Ensure backend server is running
- Verify `proxy` setting in client `package.json`

### Categories Not Loading
- Run `npm run seed` in server directory to seed categories

## 🚀 Deployment

### Backend (Node.js/Express)
- Deploy to Heroku, DigitalOcean, AWS, etc.
- Set environment variables on hosting platform
- Use MongoDB Atlas for cloud database

### Frontend (React)
- Build: `npm run build`
- Deploy to Vercel, Netlify, GitHub Pages, etc.
- Update API URL in production

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Built as a MERN stack portfolio project.

---

**Ready to get started?** Follow the Quick Start section above!
