/* Load Modules */
const express = require('express');
const router = express.Router();

/* Load controller */
const LessonController = require('../controller/lessonController');
const lessonController = new LessonController();

/**
 * Lesson Entity routes
 */

router.get('/course/:id', function(req, res){
    lessonController.findByCourse(req, res);
})

router.get('/count', function (req, res) {
    lessonController.countAll(res);
});

router.get('/exists/:id', function (req, res) {
    lessonController.exists(req, res);
});

router.get('/courseid/:idcourse/:idlocal', function(req,res){
    lessonController.findByIdLocalAndCourse(req,res);
})

router.get('/:id', function (req, res) {
    lessonController.findById(req, res);
});

router.get('/', function (req, res) {
    lessonController.findAll(res);
});

router.put('/:id', function (req, res) {
    lessonController.update(req, res);
});

router.post('/create', function (req, res) {
    lessonController.create(req, res);
});

router.delete('/:id', function (req, res) {
    lessonController.deleteById(req, res);
});

module.exports = router;