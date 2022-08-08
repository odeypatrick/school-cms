const router = require('express').Router()
const { signup, login, getUserData, isAuthenticated } = require('./controller/auth');
const { addStudent, getSchoolStudent, getSingleStudent, searchStudents, updateStudent, deleteStudent } = require('./controller/student');
const { addTeacher, getSchoolTeacher, getSingleTeacher, updateTeacher, deleteTeacher } = require('./controller/Teacher');

// auth
router.post('/signup', signup)
router.post('/login', login)
router.get('/user', isAuthenticated, getUserData)

//student
router.post('/student', addStudent)
router.get('/students/:schoolid', getSchoolStudent)
router.get('/student/:id', getSingleStudent)
router.get('/search/:searchParam', searchStudents)
router.put('/student/:id', updateStudent)
router.delete('/student/:id', deleteStudent)

//Teacher
router.post('/teacher', addTeacher)
router.get('/teachers/:schoolid', getSchoolTeacher)
router.get('/teacher/:id', getSingleTeacher)
router.put('/teacher/:id', updateTeacher)
router.delete('/teacher/:id', deleteTeacher)

module.exports = router;