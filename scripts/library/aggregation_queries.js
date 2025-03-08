const uri = "mongodb+srv://<username>:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const database = client.db('library');
    const books = database.collection('books');

    // Aggregation 1: Total books per genre
    const genreCounts = await books.aggregate([
      { $group: { _id: "$genre", count: { $sum: 1 } } }
    ]).toArray();
    console.log("Books per Genre:", genreCounts);

    // Aggregation 2: Average published year
    const avgYear = await books.aggregate([
      { $group: { _id: null, avgYear: { $avg: "$publishedYear" } } }
    ]).toArray();
    console.log("Average Published Year:", avgYear[0]?.avgYear || 0);

    // Aggregation 3: Top-rated book
    const topBook = await books.aggregate([
      { $sort: { rating: -1 } },
      { $limit: 1 }
    ]).toArray();
    console.log("Top-Rated Book:", topBook[0]);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);