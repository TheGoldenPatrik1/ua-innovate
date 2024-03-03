import express from "express"
import fs from "fs"
import markdownpdf from "markdown-pdf"
const router = express.Router();
import Student from '../models/Student.mjs'
import Major from '../models/Major.mjs'
import School from '../models/School.mjs'
import Category from '../models/Category.mjs'
import Location from '../models/Location.mjs'
import User from '../models/User.mjs'
import upload from '../middleware/upload.mjs'

const generateMd = (student, school, major, categories, location_prefs) => {
  let md = `# ${student.lname}, ${student.fname}\n`
    + '\n'
    + '### Contact Info\n'
    + `**Email:** ${student.email}\n\n`
    + `**Phone:** ${student.phone}\n\n`
  if (student.linkedin) {md = md + `**LinkedIn:** ${student.linkedin}\n\n`}
  md = md + '\n\n'
  md = md + `### Academic Information\n`
    + `**School:** ${school}\n\n`
    + `**Major:** ${major}\n\n`
    + `**Anticipated Graduation Date**: ${student.grad_date}\n\n`
  md = md + `### Preferences\n`
    + `**Job Type:** ${student.job_type}\n\n`
    + `**Roles of Interest:** `
  categories.forEach((category) => {
    md = md + category + ", "
  })
  md = md.substring(0, md.length - 2)
  md = md + `\n\n`
    + `**Locations:** `
  location_prefs.forEach((location) => {
    md = md + location + "; "
  })
  md = md.substring(0, md.length - 2)
  md = md + '\n\n'
    + `### Feedback\n`
    + `**Interview Status:** ${student.interview_status}\n\n`
  let techScore = "N/A"
  if (student.technical_score) {techScore = student.technical_score}
  let behScore = "N/A"
  if (student.behavioral_score) {behScore = student.behavioral_score}
  let com = "N/A"
  if (student.comments) {com = student.comments}
  md = md + `**Technical Score:** ${techScore}\n\n`
    + `**Behavioral Score:** ${behScore}\n\n`
    + `**Other Comments:** ${com}\n\n`
  return md
}

const generateCsv = (students) => {
  let csv = "Last Name, First Name, Email, Phone, LinkedIn, School, Major, Graduation Date, Job Type, Roles, Locations, Interview Status, Technical Score, Behavioral Score, Comments\n"
  students.forEach((stu) => {
    csv = csv + stu.lname + ', ' + stu.fname + ', ' + stu.email + ', ' + stu.phone + ', ' + stu.linkedin + ', '
      + stu.school + ', ' + stu.major + ', ' + stu.grad_date + ', ' + stu.categories + ', ' + stu.location_prefs + ', '
      + stu.interview_status + ', ' + stu.technical_score + ', ' + stu.behavioral_score + ', ' + stu.comments + '\n'
  })
  return csv
}

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

// Generate a PDF report by ID
router.get("/reports/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id)
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    let major = await Major.findById(student.major);
    major = major.major
    let school = await School.findById(student.school);
    school = school.school
    const categories = []
    const allCategories = await Category.find()
    student.categories.forEach((c) => {
      let category = allCategories.filter((aCat) => aCat._id == c)[0]
      categories.push(category.category)
    })
    const location_prefs = []
    const allLocations = await Location.find()
    student.location_prefs.forEach((location) => {
      let loc = allLocations.filter((aLoc) => aLoc._id == location)[0]
      let city = loc.city
      let state = loc.state
      location_prefs.push(`${city}, ${state}`)
    })
    let md = generateMd(student, school, major, categories, location_prefs)
    const mdFilename = 'reports/' + student._id + '.md'
    const pdfFilename = 'reports/' + student._id + '.pdf'
    console.log("here")
    fs.writeFile(mdFilename, md, (err) => {
      if (err) throw err;
    })

    fs.createReadStream(mdFilename)
      .pipe(markdownpdf())
      .pipe(fs.createWriteStream(pdfFilename))
    res.json(student)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

router.post("/reports/filtered", async (req, res) => {
  try {
    const allStudents = await Student.find()
    const allLocations = await Location.find()
    const allCategories = await Category.find()
    const allMajors = await Major.find()
    const allSchools = await School.find()
    const students = allStudents.filter((stu) => req.body.includes(stu._id))
    students.forEach((stu) => {

      new_location_prefs = ""
      stu.location_prefs.forEach((loc) => {
        l = allLocations.filter((aLoc) => aLoc._id == loc)[0]
        new_location_prefs = new_location_prefs + l.city + " " + l.state + "; "
      })
      stu.location_prefs = new_location_prefs.substring(0, new_location_prefs.length - 2)

      new_categories = ""
      stu.categories.forEach((cat) => {
        c = allCategories.filter((aCat) => aCat._id == cat)[0]
        new_categories = new_categories + c.category + '; '
      })
      stu.categories = new_categories.substring(0, new_categories.length - 2)

      stu.major = allMajors.filter((maj) => maj._id == stu.major)[0].major
      stu.school = allSchools.filter((sch) => sch._id == stu.school)[0].school

      if (!stu.linkedin) {stu.linkedin = ""}
      if (!stu.technical_score) {stu.technical_score = ""}
      if (!stu.behavioral_score) {stu.behavioral_score = ""}
      if (!stu.comments) {stu.comments = ""}
    })
    let csv = generateCsv(students)
    console.log(csv)
    res.json
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router;