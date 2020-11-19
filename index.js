const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const usersRoutes = require('./routes/user-routes');
const basicRoutes = require('./routes/basic-routes')
const adminRoutes = require('./routes/admin-routes');
const session = require('express-session');
const mongostore = require('connect-mongo')(session);
// body parser middle ware
app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json());



// session middle ware
app.use(session({
  secret : 'mysupersecret',
  resave : false,
  saveUninitialized : false,
  store : new mongostore({ mongooseConnection : mongoose.connection }),
  // cookie : { maxAge : 180 * 60 * 1000 }
}));

// Passport Config
require('./config/passport')(passport);
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.set('views', path.join(__dirname,'views'));
app.set('view engine','ejs');

app.use(express.static(path.join(__dirname,'public')));

// Express Messages middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});

app.get('*', function(req,res,next) {
  res.locals.user = req.user || null;
  next();
});


// basic routes 
app.use('/' , basicRoutes);

//admin routes
app.use('/admin',adminRoutes);

 // user routes 
 app.use('/users', usersRoutes);



 app.use((error, req, res, next) => {
    if (res.headerSent) {
      return next(error);
    }
    const status = error.status || 500;
    res.status(status);
    res.json({ message: error.message || 'An unknown error occurred!' });
  });


 

mongoose
  .connect(
    'mongodb+srv://Payal:payalplacement@cluster0.xjtag.mongodb.net/db1?retryWrites=true&w=majority',
    { useCreateIndex: true,useUnifiedTopology: true, useNewUrlParser: true },
  )
  .then(() => app.listen(process.env.PORT || 5000, console.log("Your server is up man.....")))
  .catch((err) => console.log(err));