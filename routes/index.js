var express = require('express');
var router = express.Router();
var userModel = require('./users');
var postModel = require('./post');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
// passport.use(new localStrategy(userModel.authenticate()));
passport.use(userModel.createStrategy());
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/profile', isLoggedIn, function (req, res, next) {
  res.send("THis Profile Page");
});

router.post('/register', function (req, res) {
  // const { userName, email, fullName } = req.body;
  // const userData = new userModel({ userName, email, fullName });
  
  // userModel.register(userData, req.body.password).then(function () {
  //   passport.authenticate('local')(req, res, function () {
  //       res.send("/profile");
  //       res.send("Done");
  //     })
  //   })
  
    const newUser = new userModel({
      userName: req.body.userName,
      fullName: req.body.fullName,
      // fatherName: req.body.fatherName,
      // motherName: req.body.motherName,
      email: req.body.email,
      password: req.body.password,
    });
    newUser
      .save()
      .then((result) => {
        res.send("/profile");
        console.log("Printing Result-->>", result);
       
      })
      .catch((error) => {
        console.log("Error-->>", error);
       
      });
});


// Login Router
router.post('/login', passport.authenticate("local", {
  successRedirect: "/profile",
  failureRedirect: "/"
}), function (req, res) {
});

// Logout Router
router.get('/logout', function (req, res, next) {
  req.logOut(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});


function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  return res.redirect('/')
}

// All Old Code For Testing
// Register 
// router.get('/register', async function (req, res, next) {
//   let registerUser =  await userModel.create({
//     userName: "Demo",
//     password: "4",
//     posts: [],
//     email: "demo@email.com",
//     fullName: "demoFour"
//   });
//   res.send(registerUser);
// });
// Post
// router.get('/addPost', async function (req, res, next) {
//   let postAdd =  await postModel.create({
//     postText: "This is My First Third Post",

//     userID:'65bca307b924483c1a8850fc'
//   });
//   let user = await userModel.findOne({_id:"65bca307b924483c1a8850fc"});
//   user.posts.push(postAdd._id);
//   await user.save();
//   res.send("SucessFully");
// });

module.exports = router;
