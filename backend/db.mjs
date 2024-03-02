import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

const db_user = process.env.DB_USER
const db_password = process.env.DB_PASSWORD
const db_name = "ua-innovate-2024-db"
const db_uri = `mongodb+srv://${db_user}:${db_password}@ua-innovate-2024-cluste.eeeeobe.mongodb.net/${db_name}?retryWrites=true&w=majority&appName=ua-innovate-2024-cluster`

mongoose.connect(db_uri)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });