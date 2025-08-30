const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = process.env.URL;

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
    await client.connect();
    const TaskCollection = client.db('ToDo').collection('task');

    app.get('/task',async(req,res)=>{
      const tasks = await TaskCollection.find().toArray();
      res.send(tasks);
    });

    app.post('/task',async(req,res)=>{
      const task = req.body;
      const result = await TaskCollection.insertOne(task);
      res.send(result);
    });
    app.delete('/task/:id',async(req,res)=>{
        try {
            const id = req.params.id;
            const result = await TaskCollection.deleteOne({ _id: new ObjectId(id) });
            res.send(result);
        } catch (error) {
            console.error('Delete error:', error);
            res.status(500).send({ error: 'Failed to delete task' });
        }
    })

    app.put('/task/:id',async(req,res)=>{
        try {
            const id = req.params.id;
            const updatedTask = req.body;
            const result = await TaskCollection.updateOne({ _id: new ObjectId(id) }, { $set: updatedTask });
            res.send(result);
        } catch (error) {
            console.error('Update error:', error);
            res.status(500).send({ error: 'Failed to update task' });
        }
    })

    // Connect the client to the server	(optional starting in v4.7) kjd
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);



app.get('/',(req,res)=>{
    res.send('server is running');
})
//hfshfdhsfht
app.listen(port,()=>{
    console.log(`server is sitting on port ${port}`);
})