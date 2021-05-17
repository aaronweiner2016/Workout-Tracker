const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require('path');


const PORT = process.env.PORT || 3000;


const db = require("./models");
const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workoutdb", { useNewUrlParser: true });


app.get('/stats', (req, res) => res.sendFile(path.join(__dirname, './public/stats.html')));
app.get('/exercise', (req, res) => res.sendFile(path.join(__dirname, './public/exercise.html')));


app.get("/api/workouts", (req, res) => {
  db.Workout.find({})
    .then((found) => {
      res.json(found);
    })
    .catch((error) => { console.log(error) })

})

app.put('/api/workouts/:id', (req, res) => {

  console.log(req.body)

  db.Workout.findByIdAndUpdate(
    req.params.id,
    {
      $push: {
        exercises: {
          ...req.body
        }
      }
    },
    (error, data) => {
      if (error) {
        res.send(error);
      } else {
        res.send(data);
      }
    }
  );
});

app.post('/api/workouts', ({ body }, res) => {

  const workout = body;
  console.log("Workoutttttt", workout)

  db.Workout.create(workout)
    .then(dbUser => {
      console.log("success")
      res.json(dbUser);
    })
    .catch(err => {
      res.json(err);
    });

});

app.get('/api/workouts/range', (req, res) => {
  console.log("RANGEEE", req.body)

  db.Workout.find({})
    .sort({ day: -1 })
    .limit(7)
    .then((found) => {
      res.json(found);
    })
    .catch((error) => { console.log(error) })

});


app.get('*', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
