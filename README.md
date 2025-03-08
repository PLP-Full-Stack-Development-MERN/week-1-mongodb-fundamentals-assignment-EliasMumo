
## Setup Instructions

### 1. Create a MongoDB Atlas Cluster
- Sign in to [MongoDB Atlas](https://www.mongodb.com/atlas/database) and create a new cluster.
- Choose the free tier and select a cloud provider and region.
- Click **Create Cluster** and wait for the deployment.

### 2. Configure Network Access
- Go to **Network Access** in Atlas.
- Add your IP address (or `0.0.0.0/0` for universal access).
- Create a database user with authentication credentials.

### 3. Install MongoDB Shell (mongosh)
- Download and install [MongoDB Shell](https://www.mongodb.com/try/download/shell) for your OS.
- Connect to your cluster using the connection string:
  ```sh
  mongosh "mongodb+srv://<username>:<password>@cluster-url/"
  ```

## Scripts Section

### 1. `create_database.js`
Creates the database and collections.
```sh
mongosh --file create_database.js
```

### 2. `insert_books.js`
Inserts sample books into the database.
```sh
mongosh --file insert_books.js
```

### 3. `aggregate_books.js`
Runs aggregation queries to analyze book data.
```sh
mongosh --file aggregate_books.js
```

## Data Model

### Collections and Schema

#### `users`
```json
{
  "_id": ObjectId(),
  "name": "John Doe",
  "email": "johndoe@example.com",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "zip": "10001"
  }
}
```

#### `products`
```json
{
  "_id": ObjectId(),
  "name": "Laptop",
  "category": "Electronics",
  "price": 1200.99
}
```

#### `orders`
```json
{
  "_id": ObjectId(),
  "user_id": ObjectId("user_id_reference"),
  "products": [
    { "product_id": ObjectId("product_id_reference"), "quantity": 1 }
  ],
  "total_price": 1200.99,
  "status": "shipped"
}
```

### Relationships
- `users` and `orders`: Referencing (`user_id` stored in `orders`).
- `orders` and `products`: Embedded array (`products` field contains objects with `product_id` references).

## Aggregation & Indexing

### Aggregation Examples

#### Total Books Per Genre
```json
[
  { "$group": { "_id": "$genre", "count": { "$sum": 1 } } }
]
```

#### Average Price Per Category
```json
[
  { "$group": { "_id": "$category", "avg_price": { "$avg": "$price" } } }
]
```

### Indexing
Index on `author` field for fast searches:
```sh
 db.books.createIndex({ "author": 1 })
```
Purpose:
- Speeds up queries that filter or sort by `author`.
- Improves performance for large datasets.

## Testing

### Using MongoDB Compass
1. Connect to the database using the connection string.
2. Browse collections and verify inserted data.

### Using MongoDB Shell
```sh
mongosh "mongodb+srv://<username>:<password>@cluster-url/" --eval "db.books.find().pretty()"
```

## Submission Checklist
- [ ] `create_database.js`
- [ ] `insert_books.js`
- [ ] `aggregate_books.js`
- [ ] `README.md`
- [ ] Verified data in MongoDB Compass or Shell

## Design Decisions
- **Referencing in `orders`**: Avoids data duplication; allows tracking user history efficiently.
- **Embedding `products` in `orders`**: Provides order-specific details without needing frequent joins.
- **Indexing `author`**: Improves query performance for book lookups.

---
This completes the MongoDB assignment setup and execution guide.

