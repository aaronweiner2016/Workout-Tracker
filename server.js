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

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/userdb", { useNewUrlParser: true });


app.get('/stats', (req, res) => res.sendFile(path.join(__dirname, './public/stats.html')));
app.get('/exercise', (req, res) => res.sendFile(path.join(__dirname, './public/exercise.html')));


app.get("/api/workouts", (req, res) => {
  db.Workout.find((error, found) => {
    if (error) {
      console.log(error);
    } else {
      res.json(found);
    }
  });

})

app.put('/api/workouts/:id', (req, res) => {
  // db.notes.update(
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

app.post('/api/workouts', (req, res) => {
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

app.get('/api/workouts/range', (req, res) => {

});


app.get('*', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
