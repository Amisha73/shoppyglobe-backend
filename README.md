# ShoppyGlobe API

## Overview
ShoppyGlobe is an e-commerce application backend built using Node.js, Express.js, and MongoDB. This API provides endpoints for managing products, shopping cart functionality, and user authentication.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [API Endpoints](#api-endpoints)
- [MongoDB Integration](#mongodb-integration)
- [Error Handling and Validation](#error-handling-and-validation)
- [Authentication & Authorization](#authentication--authorization)
- [Testing](#testing)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features
- Fetch a list of products and product details.
- Add, update, and remove items from the shopping cart.
- User registration and login with JWT-based authentication.
- Protected routes for cart management.

## Technologies Used
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)

## API Endpoints

### Products
- **GET /products/**: Fetch a list of products.
- **GET /products/:id**: Fetch details of a single product by its ID.
- **POST /products/**: Add product.
- **PUT /products/updateProduct/:id**: Update product details by its ID.
- **DELETE /products/deleteProduct/:id**: Delete product by its ID.

### Cart
- **POST /cart/addToCart**: Add a product to the shopping cart.
- **PUT /cart/:id**: Update the quantity of a product in the cart.
- **DELETE /cart/:id**: Remove a product from the cart.
- **GET /cart/**: Fetch the current shopping cart contents.

### User Authentication
- **POST /auth/register**: Register a new user.
- **POST /auth/login**: Authenticate user and return a JWT token.

## MongoDB Integration
- **Products Collection**: Stores product data with fields such as name, price, description, and InStock quantity.
- **Cart Collection**: Stores items added to the cart, including product IDs and quantities.


## Error Handling and Validation
- Implemented error handling for all API routes.
- Input data validation to ensure product IDs exist before adding to the cart.

## Authentication & Authorization
- JWT-based authentication for secure user login.
- Protected cart routes to ensure only logged-in users can access them.

## Testing
- All API routes have been tested using Postman.

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Amisha73/shoppyglobe-backend

2. To start application : 
   - install node package manager -- `npm i`
   - .env file contain -- `MONGODB_URL`, `PORT` & `JWT_SECRET`
   - start application -- `npm start`