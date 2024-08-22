require('dotenv').config()
const express = require("express")
const cors = require('cors');
const mongoose = require('mongoose')
const workoutRoutes = require("./routes/workouts")
const app = express()

// Enable CORS for all routes
app.use(cors());

// middleware
app.use(express.json())
app.use((req, res, next) =>{
    console.log(req.path, req.method)
    next()
})
// Request Handeling
app.use('/api/workout', workoutRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`The app listening on port ${process.env.PORT}`)
    })
}).catch((error) => {console.error(error)})