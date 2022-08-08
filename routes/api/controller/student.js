const mongoose = require('mongoose')
const Student = require('../models/Student')

// ADD student
exports.addStudent = (req, res) => {
    Student.create(req.body)
    .then(student => {
        res.status(201).json({ data: student, msg: "Student added successfully", code: "200" })
    })
    .catch(err => res.status(500).json(err));
}

// GET students that belong to a school
exports.getSchoolStudent = (req, res) => {
    Student.find({ schoolId: req.params.schoolid }).exec((err, students) => {
        if(err) return res.status(500).json({ error: err, msg: "Could not fetch students" })
        // If all is good
        return res.status(200).json(students)
    })
}

// GET single student by Id
exports.getSingleStudent = (req, res) => {
    Student.findById(req.params.id).populate('schoolId').exec((err, student) => {
        if(err) return res.status(500).json({ error: err, msg: "Could fetch student" })
        // If all is good
        return res.status(200).json(student)
    })
}

// SEARCH students
exports.searchStudents = (req, res) => {
    const query = req.params.searchParam;
    const searchQuery = query.toLowerCase()

    Student.find({ 
        $or: [{ fullname: { $regex: new RegExp(searchQuery) }}]
    })
    .then(students => res.status(200).json(students))
    .catch(err => res.status(500).json({ error: err, msg: "Could not fetch students" }))
}

// UPDATE Student
exports.updateStudent = (req, res) => {
    Student.findOneAndUpdate({ _id: req.params.id }, { $set: req.body })
    .then(student => {
        res.status(201).json({ student, msg: "student updated successfully" })
    })
    .catch(err => res.status(500).json({ error: err, msg: "Something went wrong" }))
}

// DELETE student
exports.deleteStudent = (req, res) => {
    Student.findByIdAndDelete(req.params.id).exec()
    .then(res => res.json({ msg: "student deleted successfully" }))
    .catch(err => res.status(500).json({ error: `Could not delete student - ${err}` }))
}