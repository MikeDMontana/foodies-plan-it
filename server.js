var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var request = require('request');
var mongoose = require('mongoose');
mongoose.connect('mongodb://MikeDMontana:Mi55oula123@ds129143.mlab.com:29143/foodies-plan-it');

// define all Mongoose Models
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

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

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


//***************************************ALL ROUTES FOR PARTIES**************************
router.route('/parties')

  //============================================================create a new party at POST http://localhost:8080/api/parties
  .post(function(req, res) {

    var party = new Party({
      title: req.body.title,
      description: req.body.description,
      date: req.body.date,
      users: req.body.users
    });

    //save the party and check for errors
    party.save(function(err) {
      if (err)
        res.send(err);

        res.json({ message: 'party created!' });
    });
  })
  //============================================================GET all parties at http://localhost:8080/api/parties
    .get(function(req, res) {
      Party.find(function(err, parties) {
        if (err)
        res.send(err);

        res.json(parties);
      });
    });

    //============================================================GET specific party http://localhost:8080/api/parties/:party_id
    router.route('/parties/:party_id')

      .get(function(req, res) {
        Party.findById(req.params.party_id, function(err, party) {
          if (err)
            res.send(err);
            res.json(party);
        });
      })

      //============================================================UPDATE specific party http://localhost:8080/api/parties/:party_id
      //============================================================Define new meal through user input and push to model
      .put(function(req, res) {

        // use our party model to find the party we want
        Party.findById(req.params.party_id, function(err, party) {
          if (err)
            res.send(err);

            var meal = new Meal({
              title: req.body.title,
              description: req.body.description,
            });

          party.meals.push(meal);

          party.save(function(err) {
            if (err)
              res.send(err);

            res.json(party.meals);
          });
        });
      })

      //============================================================DELETE specific party http://localhost:8080/api/parties/:party_id
      .delete(function(req, res) {
        party.remove({
          _id: req.params.party_id
        }, function(err, user) {
          if (err)
            res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
      });

      //============================================================GET all meals within party http://localhost:8080/api/parties/:party_id/meals
      router.route('/parties/:party_id/meals')
        .get(function(req, res) {
          Party.findById(req.params.party_id, function(err, party) {
            if (err)
              res.send(err);
              res.json(party.meals);
          });
        });

      //============================================================GET specific meal within party http://localhost:8080/api/parties/:party_id/meals/:meal_id
      router.route('/parties/:party_id/meals/:meal_id')

        .get(function(req, res) {
          Party.findById(req.params.party_id, function(err, party) {
            if (err)
              res.send(err);
              res.json(party.meals.id(req.params.meal_id));
          });
        })

        //============================================================UPDATE specific meal at http://localhost:8080/api/parties/:party_id/meals/:meal_id
        //============================================================a new recipe object is defined through user input and pushed to meal
        .put(function(req, res) {

          // use our party model to find the party we want
          Party.findById(req.params.party_id, function(err, party) {
            if (err)
              res.send(err);

              var recipe = new Recipe({
                name: req.body.name,
                directions: req.body.directions,
                ingredients: req.body.ingredients,
                upvotes: req.body.upvotes,
                downvotes: req.body.downvotes,
                dishType: req.body.dishType
              });

            party.meals.id(req.params.meal_id).recipes.push(recipe);
            party.save(function(err) {
              if (err)
                res.send(err);

              res.json({ message: 'party updated!' });
            });
          });
        });

        //============================================================GET all recipes within meal at http://localhost:8080/api/parties/:party_id/meals/:meal_id/recipes
        router.route('/parties/:party_id/meals/:meal_id/recipes')
          .get(function(req, res) {
            Party.findById(req.params.party_id, function(err, party) {
              if (err)
                res.send(err);
                res.json(party.meals.id(req.params.meal_id).recipes);
            });
          });

        //============================================================GET specific recipe within meal at http://localhost:8080/api/parties/:party_id/meals/:meal_id/recipes/:recipe_id
        router.route('/parties/:party_id/meals/:meal_id/recipes/:recipe_id')
          .get(function(req, res) {
            Party.findById(req.params.party_id, function(err, party) {
              if (err)
                res.send(err);
                res.json(party.meals.id(req.params.meal_id).recipes.id(req.params.recipe_id));
            });
          })

          //============================================================update recipe votes up or down at http://localhost:8080/api/parties/:party_id/meals/:meal_id/recipes/:recipe_id
          .put(function(req, res) {
            Party.findById(req.params.party_id, function(err, party) {
              if (err)
                res.send(err)

                party.meals.id(req.params.meal_id).recipes.id(req.params.recipe_id).upvotes += parseInt(req.body.upvotes);
                party.meals.id(req.params.meal_id).recipes.id(req.params.recipe_id).downvotes -= parseInt(req.body.downvotes);

              party.save(function(err) {
                if (err)
                  res.send(err);

                res.json({ message: 'party updated!' });
              });
            });
          });


//***************************************NEW ROUTE FOR USERs**************************
router.route('/users')

  .get(function(req, res) {
    User.find(function(err, users) {
      if (err)
      res.send(err);

      res.json(users);
    });
  });

//***************************************NEW ROUTE FOR EXTERNAL API**************************
router.route('/recipes/:recipeSearch')

.get(function(req, res) {
  var url = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/searchComplex?addRecipeInformation=true&fillIngredients=false&instructionsRequired=true&limitLicense=false&number=8&offset=0&query=' + req.params.recipeSearch;
  req.pipe(request(url)).pipe(res);
});

// Register Our Routes ------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// Start the Server
// ==============================================
app.listen(port);
console.log('Magic happens on port ' + port);
