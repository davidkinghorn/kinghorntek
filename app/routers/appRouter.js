var passport = require('passport'),

    signupController = require('../controllers/signupController.js');

module.exports = function(express) {
  var router = express.Router();

  var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated())
      return next();
    req.flash('error', 'You have to be logged in to access the page.');
    res.redirect("/home")
  };

  router.get('/signup', signupController.show);
  router.post('/signup', signupController.signup);

  router.post('/login', passport.authenticate('local', {
      successRedirect: '/dashboard',
      failureRedirect: '/',
      failureFlash: true 
  }));

  router.get('/', function(req, res) {
    res.render('index');
  });

  router.get('/dashboard', isAuthenticated, function(req, res) {
    if (req.user) {
       //   res.render('dashboard', {layout: "app" });
        res.render('dashboard');
    } else {
       res.render('home');
      }
   })

  router.get('/logout', function(req, res) {
    req.logout()
    res.redirect('/')
  })

    router.get ('/home', function(req, res) {
        res.render('home')
    })


   router.get ('/login', function(req, res) {
       res.render('login')
   })

    router.get ('/index', function(req, res) {
        res.render('index')
    })

    router.get ('/userManagement', isAuthenticated, function(req, res) {
        res.render('userManagement', {layout: "admintools"});
    })

  return router
}