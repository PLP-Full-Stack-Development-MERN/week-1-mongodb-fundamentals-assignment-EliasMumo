const uri = "mongodb+srv://<username>:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const database = client.db('library');
    const books = database.collection('books');

    // Create an index on the "author" field
    await books.createIndex({ author: 1 });
    console.log("Index created on 'author' field.");
  } finally {
    await client.close();
  }
}
run().catch(console.dir);