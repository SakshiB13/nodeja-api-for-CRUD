# nodejs-api-for-CRUD
Node.js API with Typescript &amp; Express for CRUD operations on MySQL database.


# API Documentation

## Overview
This API allows users to perform CRUD (Create, Read, Update, Delete) operations on a collection of items. The API requires authentication using a JWT (JSON Web Token) token.

## Authentication
All endpoints except for the login endpoint require authentication. To authenticate, send a POST request to the `/login` endpoint with a `username` and `password` in the request body. If the login is successful, the response will contain a JWT token, which should be included in the `Authorization` header of subsequent requests in the format `Bearer <JWT token>`. 

## Endpoints
### Create an item
`POST /items`
Creates a new item with the specified name, description, and price. Returns the newly created item.

Request body:
```
{
  "name": "Item Name",
  "description": "Item description",
  "price": 10.99
}
```

### Get all items
`GET /items`
Returns a list of all items.

### Get a single item
`GET /items/:id`
Returns the item with the specified ID.

### Update an item
`PUT /items/:id`
Updates the item with the specified ID with the provided name, description, and price. Returns the updated item.

Request body:
```
{
  "name": "Updated Item Name",
  "description": "Updated item description",
  "price": 15.99
}
```

### Delete an item
`DELETE /items/:id`
Deletes the item with the specified ID.

## Error responses
The API returns the following error responses:

* `401 Unauthorized` - The request is not authenticated. Make sure to include a valid JWT token in the `Authorization` header.
* `404 Not Found` - The requested resource could not be found.
* `422 Unprocessable Entity` - The request body contains invalid data.

## Example usage
### Creating an item
```
POST /items
Authorization: Bearer <JWT token>
Content-Type: application/json

{
  "name": "New Item",
  "description": "New item description",
  "price": 20.99
}
```
### Getting all items
```
GET /items
Authorization: Bearer <JWT token>
```

### Getting a single item
```
GET /items/1
Authorization: Bearer <JWT token>
```

### Updating an item
```
PUT /items/1
Authorization: Bearer <JWT token>
Content-Type: application/json

{
  "name": "Updated Item",
  "description": "Updated item description",
  "price": 25.99
}
```

### Deleting an item
```
DELETE /items/1
Authorization: Bearer <JWT token>
```
