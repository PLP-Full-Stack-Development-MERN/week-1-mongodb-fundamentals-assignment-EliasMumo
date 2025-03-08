const uri = "mongodb+srv://<username>:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const database = client.db('library');
    const books = database.collection('books');

    // Delete 1: Remove "Pride and Prejudice" by ISBN
    await books.deleteOne({ ISBN: "978-0141439518" });
    console.log("Deleted 'Pride and Prejudice'.");

    // Delete 2: Remove all Dystopian books
    await books.deleteMany({ genre: "Dystopian" });
    console.log("Deleted all Dystopian books.");
  } finally {
    await client.close();
  }
}
run().catch(console.dir);