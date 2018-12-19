/* Load Modules */
const express = require('express');
const router = express.Router();

/* Load controller */
const CourseController = require('../controller/courseController');
const courseController = new CourseController();

/**
 * Course Entity routes
 */
router.get('/count', function (req, res) {
    courseController.countAll(res);
});

router.get('/exists/:id', function (req, res) {
    courseController.exists(req, res);
});

router.get('/:id', function (req, res) {
    courseController.findById(req, res);
});

router.get('/', function (req, res) {
    courseController.findAll(res);
});

router.put('/:id', function (req, res) {
    courseController.update(req, res);
});

router.post('/create', function (req, res) {
    courseController.create(req, res);
});

router.post('/createall', function (req, res) {
    courseController.createAll(req, res);
});

router.delete('/:id', function (req, res) {
    courseController.deleteById(req, res);
});

module.exports = router;