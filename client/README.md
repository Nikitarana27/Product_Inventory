# Product Inventory Client

Frontend React application for the Product Inventory System.

## Features

- Product listing with pagination
- Search products by name
- Filter products by multiple categories
- Add new products
- Delete products
- Responsive design
- Real-time form validation

## Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend server running on http://localhost:5000

### Installation

1. Install dependencies:
```bash
npm install
```

### Running the Application

Development mode:
```bash
npm start
```

This will open the application in your default browser at `http://localhost:3000`.

Build for production:
```bash
npm run build
```

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── AddProduct.js    # Product form component
│   ├── ProductList.js   # Products display component
│   └── FilterSearch.js  # Search and filter component
├── pages/              # Page components
├── services/           # API service calls
│   └── api.js          # Axios API client
├── styles/             # CSS files
│   ├── index.css       # Global styles
│   ├── App.css         # App styles
│   ├── AddProduct.css  # Form styles
│   ├── ProductList.css # List styles
│   └── FilterSearch.css # Filter styles
├── App.js              # Main app component
└── index.js            # Entry point
```

## Features

### Product Management
- Create products with name, description, quantity, and categories
- View all products in a paginated grid
- Delete products with confirmation

### Search and Filtering
- Real-time search by product name
- Multi-select category filtering
- Products matching ANY of the selected categories are shown

### Validation
- Client-side form validation
- Real-time error feedback
- Success messages

## API Integration

The application communicates with the backend API at:
- Products: `/api/products`
- Categories: `/api/categories`

All requests are made through the `api.js` service layer.
