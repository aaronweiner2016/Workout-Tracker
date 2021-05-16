const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const resistanceSchema = new Schema(
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
    },
);

const cardioSchema = new Schema(
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
        distance: {
            type: Number
        },
    },
);

const WorkoutSchema = new Schema(
    {
        day: {
            type: String,
        },

        resistance: [
            resistanceSchema
        ],

        cardio: [
            cardioSchema
        ],

    }
);



const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;

