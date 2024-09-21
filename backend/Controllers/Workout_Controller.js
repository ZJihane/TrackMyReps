const Workout = require ('../Models/workout')
const mongoose = require("mongoose")
// create functions that we can reference inside the router file 
// instead of hard codeing these functions in the routing file 
//The functions are marked as async because it 
//deals with asynchronous operations, specifically interacting with the database 

// get all workouts 

const getAllWorkouts = async (req,res) => {
    const workouts = await Workout.find({})
    //.find({reps : 20})
    //.sort({createdAt : -1})
    res.status(200).json(workouts);
}

// get a single workout 
const getWorkout = async (req,res) => {
     // the id should be in a valid format of an id
     const {id} = req.params ;
     if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(400).json({error : "wrong format of ID"})
     const workout = await  Workout.findById(id) ;
     if(!workout){
     return res.status(404).json({ error: "NO such a workout" })
     }
     res.status(200).json(workout)
}

// create a new workout
const createWorkout = async (req, res) => {
    const { title, load, reps } = req.body;

    // the array would contain all of the missing fields in the form 

    let EmptyFields = []

    if (!title) {
         EmptyFields.push('title')
    }
    if (!load){
        EmptyFields.push('load')
    }
    if (!reps){
        EmptyFields.push('reps')
    }
    // if the length of the array is > 0 , means that one of the fields is missing
    if (EmptyFields.length > 0) {
        return res.status(400).json({error : 'Please fill in all the fields ', EmptyFields})
    }

    try {
        // Use 'await' to ensure we wait for the workout to be created before sending the response
        const workout = await Workout.create({ title, load, reps });
        // Send the created workout as a response
        res.status(200).json(workout)
    } catch (error) {
        // Catch any errors and send a 400 response with the error message
        res.status(400).json({ error: error.message })
    }
}

// update a workout 
const updateWorkout = async (req,res) => {
    const {id} = req.params 
     if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(400).json({error : "wrong format of ID"})
     const workout = await Workout.findOneAndUpdate({_id: id},{
        ...req.body
       })
     if(!workout){
        res.status(404).json({ error: "NO such a workout" })
    }
     res.status(200).json(workout)
    }

// delete a workout 
const deleteWorkout = async (req , res) => {
    const {id} = req.params 
     if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(400).json({error : "wrong format of ID"})
    const workout = await Workout.findOneAndDelete({_id: id} )
    if(!workout){
        res.status(404).json({ error: "NO such a workout" })
    }
     res.status(200).json(workout)

}

module.exports = {
    createWorkout , getAllWorkouts , getWorkout , deleteWorkout , updateWorkout
}