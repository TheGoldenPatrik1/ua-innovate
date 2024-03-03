import express from "express"
const router = express.Router();
import School from '../models/School.mjs'

// Get all schools
router.get('/schools', async (req, res) => {
  try {
    const schools = await School.find();
    res.json(schools);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get a single school by ID
router.get('/schools/:id', async (req, res) => {
  try {
    const school = await School.findById(req.params.id);
    if (!school) {
      return res.status(404).json({ error: 'School not found' });
    }
    res.json(school);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;