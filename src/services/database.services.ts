import { MongoClient, ServerApiVersion } from 'mongodb'
const uri = 'mongodb+srv://minhnguyen102:KwbamXogjjTMQXkR@cluster0.sqjfe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

class DatabaseService {
  private client: MongoClient
  constructor() {
    this.client = new MongoClient(uri)
  }

  async connect() {
    try {
      // Send a ping to confirm a successful connection
      await this.client.db("admin").command({ ping: 1 })
      console.log("Pinged your deployment. You successfully connected to MongoDB!")
    } finally {
      // Ensures that the client will close when you finish/error
      await this.client.close()
    }
  }
}

// Khởi tạo đối tượng
const databaseService = new DatabaseService()
export default databaseService
