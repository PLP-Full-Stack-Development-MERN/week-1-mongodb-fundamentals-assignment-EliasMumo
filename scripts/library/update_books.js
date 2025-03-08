const uri = "mongodb+srv://<username>:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const database = client.db('library');
    const books = database.collection('books');

    // Update 1: Fix publishedYear for "1984"
    await books.updateOne(
      { ISBN: "978-0451524935" },
      { $set: { publishedYear: 1949 } }
    );
    console.log("Updated '1984' publishedYear.");

    // Update 2: Add a rating field to all books
    await books.updateMany(
      {},
      { $set: { rating: 4.5 } }
    );
    console.log("Added 'rating' field to all books.");
  } finally {
    await client.close();
  }
}
run().catch(console.dir);