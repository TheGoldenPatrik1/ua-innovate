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
    const student = new Student(req.body)
    await student.save();
    res.send(student);
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

// Edit a student by ID
router.put("/students/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {new: true})
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json(student)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
})

// Delete a student by ID
router.delete("/students/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id)
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json(student)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
})

export default router;