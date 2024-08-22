const Workout = require('../models/WorkoutModel')
const mongoose = require('mongoose')

// Get all
const getWorkout = async(req, res) =>{
    const workouts = await Workout.find({}).sort({createdAt: -1})
    res.status(200).json(workouts)
}
// Get Single
const getWorkoutById = async(req, res) =>{
    const { id } = req.params
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: 'Invalid ID' })
    }

    const workout = await Workout.findById(id)
    if(!workout){
        return res.status(404).json({error: 'Workout not found'})
        }
    
    res.status(200).json(workout)
}
// Create
const createWorkout = async(req, res) => {
    const {title, reps, load} = req.body
    try {
        const workout = await Workout.create({title, reps, load})
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// Delete
const deleteWorkout = async(req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: 'Invalid ID' })
        }
        
        const workout = await Workout.findByIdAndDelete({_id: id})
        if(!workout){
            return res.status(404).json({error: 'Workout not found'})
            }
        res.status(200).json(workout)
    }

// Update
const updateWorkout = async(req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: 'Invalid ID' })
        }
    
    const workout = await Workout.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!workout){
        return res.status(404).json({error: 'Workout not found'})
        }
    res.status(200).json(workout)
}


module.exports = {
    createWorkout, getWorkout, getWorkoutById, deleteWorkout, updateWorkout
}