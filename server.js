const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const mongojs = require("mongojs");
const path = require('path');


const PORT = process.env.PORT || 3000;

const databaseUrl = "workout";
const collections = ["workouts"];

const db = mongojs(databaseUrl, collections);

db.on("error", error => {
  console.log("Database Error:", error);
});

const workout = require("./models/index.js");
const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/userdb", { useNewUrlParser: true });


app.get('/stats', (req, res) => res.sendFile(path.join(__dirname, './public/stats.html')));
app.get('/exercise', (req, res) => res.sendFile(path.join(__dirname, './public/exercise.html')));


app.get("/api/workouts", (req, res) => {
  db.workouts.find({ read: true }, (error, found) => {
    if (error) {
      console.log(error);
    } else {
      res.json(found);
    }
  });

})

app.post('/api/workouts/:id', (req, res) => {

});

app.delete('/api/workouts', (req, res) => {

});

app.delete('/api/workouts/range', (req, res) => {

});

app.get('*', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));



app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
