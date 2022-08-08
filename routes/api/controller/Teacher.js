const mongoose = require('mongoose')
const Teacher = require('../models/Teacher')

// Add teacher
exports.addTeacher = (req, res) => {
    Teacher.create(req.body)
    .then(teacher => {
        res.status(201).json({ data: teacher, msg: "Teacher added successfully", code: "200" })
    })
    .catch(err => res.status(500).json(err));
}

// get teachers that belong to a school
exports.getSchoolTeacher = (req, res) => {
    Teacher.find({ schoolId: req.params.schoolid }).exec((err, teachers) => {
        if(err) return res.status(500).json({ error: err, msg: "Could not fetch teachers" })
        // If all is good
        return res.status(200).json(teachers)
    })
}

// get single teacher by Id
exports.getSingleTeacher = (req, res) => {
    Teacher.findById(req.params.id).populate('schoolId').exec((err, student) => {
        if(err) return res.status(500).json({ error: err, msg: "Could fetch teacher" })
        // If all is good
        return res.status(200).json(student)
    })
}

// UPDATE Teacher
exports.updateTeacher = (req, res) => {
    Teacher.findOneAndUpdate({ _id: req.params.id }, { $set: req.body })
    .then(product => {
        res.status(201).json({ product, msg: "teacher updated successfully" })
    })
    .catch(err => res.status(500).json({ error: err, msg: "Something went wrong" }))
}

// DELETE Teacher
exports.deleteTeacher = (req, res) => {
    Teacher.findByIdAndDelete(req.params.id).exec()
    .then(res => res.json({ msg: "student deleted successfully" }))
    .catch(err => res.status(500).json({ error: `Could not delete student - ${err}` }))
}