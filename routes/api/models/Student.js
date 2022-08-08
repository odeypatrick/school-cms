const mongoose = require('mongoose')

const studentName = mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    class: {
        type: String,
        required: true,
        lowercase: true
    },
    age: {
        type: Number,
        required: true
    },
    state: {
        type: String,
        required: true,
        lowercase: true
    },
    parentPhone: {
        type: String,
        required: true
    },
    parentName: {
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
    schoolId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "School"
    }
})

module.exports = mongoose.model("Student", studentName);