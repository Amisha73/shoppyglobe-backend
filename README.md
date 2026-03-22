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
   git clone https://github.com/Amisha73/shoppyglobe-backend.git
   cd shoppyglobe-backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with:
   ```env
   MONGODB_URL=mongodb://localhost:27017/shoppyglobe
   PORT=3000
   JWT_SECRET=your_jwt_secret
   ```
4. Start locally:
   ```bash
   npm start
   ```

## Docker
1. Build the Docker image:
   ```bash
   docker build -t shoppyglobe-backend .
   ```
2. Run the container:
   ```bash
   docker run -d --name shoppyglobe -p 3000:3000 \
     -e MONGODB_URL="mongodb://host.docker.internal:27017/shoppyglobe" \
     -e PORT=3000 \
     -e JWT_SECRET=your_jwt_secret \
     shoppyglobe-backend
   ```
3. Access API: `http://localhost:3000`

## Docker Compose
1. Ensure `docker-compose.yml` has the `app` and `mongo` services (updated in this repo).
2. Start with:
   ```bash
   docker compose up --build
   ```
3. Stop:
   ```bash
   docker compose down
   ```

## Usage
- Open `http://localhost:3000` and use the API endpoints documented above.
