import express from "express";
import './db.mjs'
import cors from 'cors'
import expressSession from "express-session"
import passport from "passport"
import passportLocal from "passport-local"
import studentController from './controllers/studentController.mjs'
import majorController from './controllers/majorController.mjs'
import categoryController from './controllers/categoryController.mjs'
import locationController from './controllers/locationController.mjs'
import schoolController from './controllers/schoolController.mjs'
import User from './models/User.mjs'

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json())
app.use(expressSession({
  secret: "bnawrpbiprawinpeniapwe",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize())
app.use(passport.session()); // allows persistent sessions
app.use('/api', studentController)
app.use('/api', majorController)
app.use('/api', categoryController)
app.use('/api', locationController)
app.use('/api', schoolController)
app.use('/uploads', express.static('uploads'))

passport.serializeUser(User.serializeUser()) // encodes data into the session
passport.deserializeUser(User.deserializeUser()) // decodes data from the session
const localStrategy = passportLocal.Strategy;
passport.use(new localStrategy(User.authenticate()))

app.get('/', (req, res) => {
  res.send('Welcome to my server!');
});

app.post('/signup', async (req, res) => {
  try {
    const newUser = await User.register(new User({
      username: req.body.username
    }), req.body.password)
    passport.authenticate('local')(req, res, () => {
      res.json({
        status: "success",
      })
    })
  } catch (err) {
    console.log(err)
    res.send(err)
  }
})

app.post('/login', passport.authenticate('local', {
  successRedirect: '/login-success',
  failureRedirect: '/login-failure'
}))

app.get('/login-success', (req, res) => {
  res.send('success')
})

app.get('/login-failure', (req, res) => {
  res.send('failure')
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});