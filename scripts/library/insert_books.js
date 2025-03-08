const uri = "mongodb+srv://<username>:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const database = client.db('library');
    const books = database.collection('books');

    // Insert 5 books
    const docs = [
      {
        title: "1984",
        author: "George Orwell",
        publishedYear: 1949,
        genre: "Dystopian",
        ISBN: "978-0451524935"
      },
      {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        publishedYear: 1960,
        genre: "Fiction",
        ISBN: "978-0446310789"
      },
      {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        publishedYear: 1925,
        genre: "Classic",
        ISBN: "978-0743273565"
      },
      {
        title: "Pride and Prejudice",
        author: "Jane Austen",
        publishedYear: 1813,
        genre: "Romance",
        ISBN: "978-0141439518"
      },
      {
        title: "The Hunger Games",
        author: "Suzanne Collins",
        publishedYear: 2008,
        genre: "Science Fiction",
        ISBN: "978-0439023528"
      }
    ];
    const result = await books.insertMany(docs);
    console.log(`${result.insertedCount} books inserted`);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);