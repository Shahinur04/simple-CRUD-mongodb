const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
const port = process.env.port || 5000;

app.use(cors());
app.use(express.json());
// shahinur0
// U9L6DXXhuWXIe8wK

const uri =
  "mongodb+srv://shahinur0:U9L6DXXhuWXIe8wK@cluster0.qnkpdci.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

const userCollection=client.db('userDb').collection('users');
    app.get('/users', async (req,res)=>{
      const cursor =  userCollection.find();
      const result =await cursor.toArray();
      res.send(result);
    })
    app.post("/users", async (req, res) => {
      const newUser=req.body;
      const result =await userCollection.insertOne(newUser);
      res.send(result);
    });

    app.delete("/users/:id",async(req,res)=>{
      const id =req.params.id;
      console.log('please delete from database',id)
      const query ={_id:ObjectId};
      const result = await userCollection.deleteOne(query);
      res.send(result);

    })
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("simple crud");
});

app.listen(port, () => {
  console.log(`listen port ${port}`);
});
