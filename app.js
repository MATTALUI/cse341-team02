if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('req-flash');
const csrf = require('csurf');
const fs = require('fs');

const authRouter = require('./src/routers/auth');
const CustomMiddleware = require('./src/utils/middleware');
const registerLocals = require('./src/utils/views');

const app = express();
const csrfProtection = csrf({ cookie: true });
const banner = require('./src/utils/banner');
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/team02";
console.log({ MONGO_URL });
const DB_CONFIG = {
    // useUnifiedTopology: true,
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    // family: 4
};
const sessionOptions = {
  secret: process.env.SESSION_SECRET || 'SUPER_SECRET',
  resave: false,
  saveUninitialized: true,
};
const corsOptions = {
  origin: "*", // TODO: Update once we've got a domain
  optionsSuccessStatus: 200
};

registerLocals(app);
app
  .set('view engine', 'ejs')
  .set('views', path.join(__dirname, '/src/views'))
  .use(cors(corsOptions))
  .use(express.static(path.join(__dirname, '/src/static')))
  .use(bodyParser.urlencoded({ extended: false })) // parse application/x-www-form-urlencoded
  .use(bodyParser.json()) // parse application/json
  .use(cookieParser())
  .use(session(sessionOptions))
  .use(flash({ locals: 'flashes' }))
  .use(CustomMiddleware.setUser)
  .use(csrfProtection)
  .use('/auth', authRouter)
  .get('/', (req,res,next) => res.send('<h1>Hello, World!</h1>'))
  .get('*',  (req,res,next) => res.render('common/404', {
    csrfToken: req.csrfToken(),
    currentUser: req.user,
  }))
  .use((err, req, res, next) => console.error(err) || res.render('common/500', {
    csrfToken: req.csrfToken(),
    currentUser: req.user,
  })); // Something bad has happened!

mongoose.connect(MONGO_URL, DB_CONFIG)
  .then(() => app.listen(PORT, '0.0.0.0', () => {
    console.log(`${banner}\n\n\nlistening on 0.0.0.0:${PORT}`);
  }))
  .catch(console.error);
