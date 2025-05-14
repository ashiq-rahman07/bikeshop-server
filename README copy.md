
## Live Link
[Live Link](https://asignment-2-five.vercel.app)
## API Endpoints

## Bike Endpoints

POST /api/products  – Create a new bike.

GET /api/products – Get all bikes.

GET /api/products/:productId  – Get a specific bike by ID.

patch /api/products/:productId – Update a bike by ID.

DELETE /api/products/:productId – Delete a bike by ID.

## Order Endpoints
POST /api/orders– Place a bike order.

GET /api/orders/revenue – Calculate total revenue.

Validation
Input validation is handled using Zod for all requests, ensuring proper data structure and format.

