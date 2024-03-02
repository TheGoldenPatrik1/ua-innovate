import express from "express"
const router = express.Router();
import Major from '../models/Major.mjs'

// Get all majors
router.get('/majors', async (req, res) => {
  try {
    const majors = await Major.find();
    res.json(majors);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get a single major by ID
router.get('/majors/:id', async (req, res) => {
  try {
    const major = await Major.findById(req.params.id);
    if (!major) {
      return res.status(404).json({ error: 'Major not found' });
    }
    res.json(major);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;