const mongoose = require('mongoose')

const studentName = mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    gender: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        required: true
    },  
    schoolId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "School"
    }
})

module.exports = mongoose.model("Teacher", studentName);