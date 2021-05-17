const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const exerciseSchema = new Schema(
    {
        type: {
            type: String
        },
        name: {
            type: String
        },
        duration: {
            type: Number
        },
        weight: {
            type: Number
        },
        reps: {
            type: Number
        },
        sets: {
            type: Number
        },
        distance: {
            type: Number
        },
    },
);

const WorkoutSchema = new Schema(
    {
        day: {
            type: Date,
            default: Date.now
        },

        exercises: [
            exerciseSchema
        ],
    }
);



const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;

