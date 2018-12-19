/* Load Modules */
const express = require('express');
const router = express.Router();

/* Load controller */
const TaskOptionController = require('../controller/optionController');
const taskOptionController = new TaskOptionController();

/**
 * Task Option Entity routes
 */
router.get('/task/:id', function(req, res){
    taskOptionController.findByTask(req, res);
})

router.get('/count', function (req, res) {
    taskOptionController.countAll(res);
});

router.get('/exists/:id', function (req, res) {
    taskOptionController.exists(req, res);
});

router.get('/:id', function (req, res) {
    taskOptionController.findById(req, res);
});

router.get('/', function (req, res) {
    taskOptionController.findAll(res);
});

router.put('/:id', function (req, res) {
    taskOptionController.update(req, res);
});

router.post('/create', function (req, res) {
    taskOptionController.create(req, res);
});

router.delete('/:id', function (req, res) {
    taskOptionController.deleteById(req, res);
});

module.exports = router;