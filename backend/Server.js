require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express');
const cors = require("cors")
const workoutRoutes = require('./routes/workouts')

// express app
const app = express();

// Middleware
app.use(express.json())

app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})
 
app.use(cors())

//routes
app.use('/api/workouts', workoutRoutes)

// connect to the database 
mongoose.connect(process.env.MONGO_URI)
   .then( () => {
    // listen for request
    app.listen(process.env.PORT, () => {
        console.log('Listening on port ' ,process.env.PORT)
    });
   })
   .catch((error)=>{
    console.log(error)
})



