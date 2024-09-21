const express = require('express')
const Workout = require ('../Models/workout')
const {createWorkout, getAllWorkouts, getWorkout, deleteWorkout, updateWorkout ,

} = require('../Controllers/Workout_Controller')

const router = express.Router()
// this file containes all the routes of workout 

// GET all workouts 
router.get('/', getAllWorkouts)

// GET a single workout
router.get('/:id',getWorkout)

// Post a new workout 
router.post('/', createWorkout)

// Delete a workout
router.delete('/:id',deleteWorkout)

// Update a  workout 
router.patch('/:id', updateWorkout)

// This exports the router object so that it can be used in other files.
// In your main app file (usually app.js or server.js), 
//you can import this router and use it as part of your app.

module.exports = router