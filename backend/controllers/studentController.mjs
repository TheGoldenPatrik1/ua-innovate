import express from "express"
const router = express.Router();
import Student from '../models/Student.mjs'
import User from '../models/User.mjs'
import upload from '../middleware/upload.mjs'

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
router.post('/students', upload.single('resume'), async (req, res) => {
  try{
    req.body.categories = JSON.parse(req.body.categories)
    req.body.location_prefs = JSON.parse(req.body.location_prefs)
    const student = new Student(req.body)
    if (req.file) {
      student.resume = req.file.path
    }
    await student.save();
    res.send(student);
  } catch (error) {
    console.log(error)
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

// Delete a user by ID
router.delete("/users/:username", async (req, res) => {
  try {
    const users = await User.find()
    const user = users.filter((u) => u.username == req.params.username)[0]
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    const deletedUser = await User.findByIdAndDelete(user._id)
    res.json(deletedUser)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router;