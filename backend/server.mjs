import express from "express";
import './db.mjs'
import studentController from './controllers/studentController.mjs'
import majorController from './controllers/majorController.mjs'
import categoryController from './controllers/categoryController.mjs'
import locationController from './controllers/locationController.mjs'

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json())
app.use('/api', studentController)
app.use('/api', majorController)
app.use('/api', categoryController)
app.use('/api', locationController)

app.get('/', (req, res) => {
  res.send('Welcome to my server!');
});

app.get('/students', (req, res) => {
  res.send('List of students')
})

app.get('/categories', (req, res) => {
  res.send('List of job categories')
})

app.get('/schools', (req, res) => {
  res.send('List of schools')
})

app.get('/majors', (req, res) => {
  res.send('List of majors')
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});