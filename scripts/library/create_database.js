// Connect to MongoDB Atlas (replace with your credentials)
const uri = "mongodb+srv://<username>:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const database = client.db('library');
    console.log("Connected to 'library' database");
  } finally {
    await client.close();
  }
}
run().catch(console.dir);