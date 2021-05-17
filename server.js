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


app.get("/api/workouts", ({ body }, res) => {
  db.Workout.find({})
    .then((found) => {
      res.json(found);
    })
    .catch((error) => { console.log(error) })

})

app.put('/api/workouts/:id', ({ body }, res) => {

  console.log(body)

  // const workout = new db.Workout(body);
  // workout.setFullName();
  // workout.lastUpdatedDate();

  // workout.create(workout)
  //   .then(dbworkout => {
  //     res.json(dbworkout);
  //   })
  //   .catch(err => {
  //     res.json(err);
  //   });

  // db.Workout.post(
  //   {
  //     _id: mongojs.ObjectId(req.params.id)
  //   },
  //   {
  //     $set: {
  //       title: req.body.title,
  //       note: req.body.note,
  //       modified: Date.now()
  //     }
  //   },
  //   (error, data) => {
  //     if (error) {
  //       res.send(error);
  //     } else {
  //       res.send(data);
  //     }
  //   }
  // );
});

app.post('/api/workouts', ({ body }, res) => {
  console.log(body);

  const workout = new db.Workout(body);
  console.log("Workoutttttt", workout)

  db.Workout.create(workout)
    .then(dbUser => {
      console.log("success")
      res.json(dbUser);
    })
    .catch(err => {
      res.json(err);
    });
  // db.Workout.create(
  //   [
  //     {
  //       $set: {
  //         day: req.body.day,
  //       }
  //     },
  //     {
  //       $set: {
  //         type: req.body.type,
  //         name: req.body.name,
  //         duration: req.body.duration,
  //         weight: req.body.weight,
  //         reps: req.body.reps,
  //         sets: req.body.sets,
  //       }
  //     },
  //     {
  //       $set: {
  //         type: req.body.type,
  //         name: req.body.name,
  //         duration: req.body.duration,
  //         distance: req.body.distance,
  //       }
  //     }
  //   ],
  //   (error, data) => {
  //     if (error) {
  //       res.send(error);
  //     } else {
  //       res.send(data);
  //     }
  //   }
  // );
});

app.get('/api/workouts/range', ({ body }, res) => {
  console.log("RANGEEE", body)
});


app.get('*', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
