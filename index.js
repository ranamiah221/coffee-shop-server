const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const app= express();
const port = process.env.PORT || 5000;


// MIDDLE WARE
app.use(cors())
app.use(express.json())

// database....

const uri = `mongodb+srv://${process.env.DB_User}:${process.env.DB_pass}@cluster0.ungcn7e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    
    const coffeesCollection=client.db('coffeeDB').collection('coffees')
//   coffees collection 
    app.get('/coffees', async(req, res)=>{
        const cursor= coffeesCollection.find();
        const result = await cursor.toArray();
        res.send(result) 
    })

   app.get('/coffees/:id', async(req, res)=>{
        const id = req.params.id;
        const query= {_id : new ObjectId(id)}
        const result= await coffeesCollection.findOne(query)
        res.send(result) 
   })

    app.post('/coffees', async(req, res)=>{
        const coffee = req.body;
        const result = await coffeesCollection.insertOne(coffee)
        res.send(result)
    })

    app.delete('/coffees/:id', async(req, res)=>{
      const id = req.params.id;
      const query = {_id : new ObjectId(id)}
      const result = await coffeesCollection.deleteOne(query)
      res.send(result)
    })

    
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);






app.get('/', (req, res)=>{
    res.send('coffee shop server')
})

app.listen(port, ()=>{
    console.log(`coffee shop running on port : ${port}`)
})