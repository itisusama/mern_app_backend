const express = require('express')
const {
    createWorkout,
    getWorkout, 
    getWorkoutById,
    deleteWorkout,
    updateWorkout
} = require("../controllers/WorkoutController")

const router = express.Router()

// Get All Work Outs
router.get('/', getWorkout)

// Get Single Workout
router.get("/:id", getWorkoutById)

// Add Work Out
router.post("/", createWorkout)

// DELETE
router.delete('/:id', deleteWorkout)

// Patch
router.patch('/:id', updateWorkout)

module.exports = router
