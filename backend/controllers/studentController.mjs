import express from "express"
const router = express.Router();
import Student from '../models/Student.mjs'
import User from '../models/User.mjs'

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

// Get student ID from username
router.get('/users/:username', async (req, res) => {
  try {
    const users = await User.find();
    const user = users.filter((u) => u.username == req.params.username)[0]
    if (user.admin) {res.send("admin")}
    else {
      const students = await Student.find();
      const student = students.filter((s) => s.email == req.params.username)[0]
      res.send(student._id)
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

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