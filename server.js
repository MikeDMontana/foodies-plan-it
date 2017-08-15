var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://MikeDMontana:Mi55oula123@ds129143.mlab.com:29143/foodies-plan-it');

var UserSchema = require('./models/user');
var PartySchema = require('./models/user');
var MealSchema = require('./models/user');
var User = UserSchema.User;
var Party = UserSchema.Party;
var Meal = PartySchema.Meal;
var Recipe = MealSchema.Recipe;

//configure app to use BodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var port = process.env.PORT || 8080;  //set port

// Routes for our API
//===========================================
var router = express.Router();  // get instance of express router

//middleware to use for all requests
router.use(function(req, res, next) {
  //do logging
  console.log('Something is happening.');
  next(); //make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working
//(accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
  res.json({ message: 'hooray! welcome to our api!' });
});

// more routes for our API will happpen here

// on routes that end in /users
router.route('/users')

  //create a user accessed at POST http://localhost:8080/api/users
  .post(function(req, res) {

    var recipe = new Recipe({
      dishType: 'Appetizer For A King',
      name: 'Chocolate Cake',
      ingredients: ['flour', 'eggs', 'sugar'],
      directions: 'do this then that',
      upvotes: 3,
      downvotes: 2
    });

    var meal = new Meal({
      title: 'mealtitle for a king',
      description: 'mealdescript for a king',
      recipes: recipe
    });

    var user = new User();  //create a new instance of the user model
    user.name = req.body.name;  // user name
    user.email = req.body.email; // user email
    user.nickname = req.body.nickname;  // nickname coming from Auth0
    user.password = req.body.nickname; // password coming from Auth0
    user.parties = party; // list of parties belonging to user

    //save the user and check for errors
    user.save(function(err) {
      if (err)
        res.send(err);

        res.json({ message: 'user created!' });
    });
  })
  // get all the users accessed at GET http://localhost:8080/api/users
    .get(function(req, res) {
      User.find(function(err, users) {
        if (err)
        res.send(err);

        res.json(users);
      });
    });

    //on routes that end in /users/:user_id
    //==================================================
    router.route('/users/:user_id')

      //get the user with that id (accessed at GET http://localhost:8080/api/users/:user_id)
      .get(function(req, res) {
        User.findById(req.params.user_id, function(err, user) {
          if (err)
            res.send(err);
            res.json(user);
        });
      })

      //update the user with this id (accessed at PUT http://localhost:8080/api/users/:user_id)
      .put(function(req, res) {

        // use our user model to find the user we want
        User.findById(req.params.user_id, function(err, user) {
          if (err)
            res.send(err);

            var party = new Party({
              title: req.body.title,
              description: req.body.description,
              date: req.body.date
            });


          // user.name = req.body.name;  // update user name
          // user.email = req.body.email; // update user email
          user.parties = party;
          //save the user
          user.save(function(err) {
            if (err)
              res.send(err);

            res.json({ message: 'user updated!' });
          });
        });
      })

      // delete the user with this id (accessed at DELETE http://localhost:8080/api/users/:user_id)
      .delete(function(req, res) {
        user.remove({
          _id: req.params.user_id
        }, function(err, user) {
          if (err)
            res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
      });

      router.route('/users/:user_id/parties/:party_id')

        //get the user with that id (accessed at GET http://localhost:8080/api/users/:user_id)
        .get(function(req, res) {
          User.findById(req.params.user_id, function(err, user) {
            if (err)
              res.send(err);
              res.json(user.parties.id(req.params.party_id));
          });
        })

        // after the GETting the correct party update it!
        .put(function(req, res) {

          // use our user model to find the user we want
          User.findById(req.params.user_id, function(err, user) {
            if (err)
              res.send(err);

              var meal = new Meal({
                title: req.body.title,
                description: req.body.description,
              });


            // user.name = req.body.name;  // update user name
            // user.email = req.body.email; // update user email
            user.parties.id(req.params.party_id).meals = meal;
            //save the user
            user.save(function(err) {
              if (err)
                res.send(err);

              res.json({ message: 'user updated!' });
            });
          });
        })


// Register Our Routes ------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// Start the Server
// ==============================================
app.listen(port);
console.log('Magic happens on port ' + port);
