const uri = "mongodb+srv://<username>:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const database = client.db('ecommerce');

    // Create collections
    const users = database.collection('users');
    const products = database.collection('products');
    const orders = database.collection('orders');

    // Insert sample data
    await users.insertMany([
      {
        name: "Alice",
        email: "alice@example.com",
        orders: []
      }
    ]);

    await products.insertMany([
      {
        name: "Wireless Headphones",
        price: 99.99,
        category: "Electronics"
      }
    ]);

    await orders.insertMany([
      {
        user_id: (await users.findOne({}))._id,
        products: [
          { product_id: (await products.findOne({}))._id, quantity: 1 }
        ],
        total: 99.99
      }
    ]);
    console.log("E-commerce collections created and populated.");
  } finally {
    await client.close();
  }
}
run().catch(console.dir);