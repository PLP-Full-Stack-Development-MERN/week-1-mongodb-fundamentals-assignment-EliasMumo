const uri = "mongodb+srv://<username>:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const database = client.db('library');
    const books = database.collection('books');

    // Query 1: All books
    const allBooks = await books.find({}).toArray();
    console.log("All Books:", allBooks);

    // Query 2: Books by George Orwell
    const authorBooks = await books.find({ author: "George Orwell" }).toArray();
    console.log("George Orwell's Books:", authorBooks);

    // Query 3: Books published after 2000
    const recentBooks = await books.find({ publishedYear: { $gt: 2000 } }).toArray();
    console.log("Books Published After 2000:", recentBooks);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);