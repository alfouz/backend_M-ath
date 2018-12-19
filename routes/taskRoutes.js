/* Load Modules */
const express = require('express');
const router = express.Router();

/* Load controller */
const TaskController = require('../controller/taskController');
const taskController = new TaskController();

/**
 * Task Entity routes
 */
router.get('/lesson/:id', function(req, res){
    taskController.findByLesson(req, res);
})

router.get('/count', function (req, res) {
    taskController.countAll(res);
});

router.get('/exists/:id', function (req, res) {
    taskController.exists(req, res);
});

router.get('/:id', function (req, res) {
    taskController.findById(req, res);
});

router.get('/', function (req, res) {
    taskController.findAll(res);
});

router.put('/:id', function (req, res) {
    taskController.update(req, res);
});

router.post('/create', function (req, res) {
    taskController.create(req, res);
});

router.delete('/:id', function (req, res) {
    taskController.deleteById(req, res);
});

module.exports = router;