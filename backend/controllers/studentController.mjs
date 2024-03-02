import express from "express"
const router = express.Router();
import Student from '../models/Student.mjs'

// Get all students
router.get('/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create new student
router.post('/students', async (req, res) => {
  try{
    console.log("here1")
    const student = new Student(req.body)
    console.log("here2")
    await student.save();
    console.log("here4");
    res.send(student);
    console.log("here5")
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get a single student by ID
router.get('/students/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;