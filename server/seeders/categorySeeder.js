require('dotenv').config();
const mongoose = require('mongoose');
const Category = require('../models/Category');

const categories = [
  {
    name: 'Electronics',
    description: 'Electronic devices and gadgets',
  },
  {
    name: 'Clothing',
    description: 'Apparel and fashion items',
  },
  {
    name: 'Books',
    description: 'Books and reading materials',
  },
  {
    name: 'Home & Garden',
    description: 'Home and garden products',
  },
  {
    name: 'Sports',
    description: 'Sports equipment and accessories',
  },
  {
    name: 'Toys',
    description: 'Toys and games',
  },
];

const seedCategories = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Clear existing categories
    await Category.deleteMany({});
    console.log('Cleared existing categories');

    // Insert new categories
    const insertedCategories = await Category.insertMany(categories);
    console.log(`Successfully seeded ${insertedCategories.length} categories`);

    // Display inserted categories
    console.log('\nInserted Categories:');
    insertedCategories.forEach((cat) => {
      console.log(`- ${cat.name} (ID: ${cat._id})`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Error seeding categories:', error.message);
    process.exit(1);
  }
};

seedCategories();
