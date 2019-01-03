/* Load Modules */
const express = require('express');
const router = express.Router();

/* Load controller */
const ResultUserLessonController = require('../controller/resultuserlessonController');
const resultuserlessonController = new ResultUserLessonController();

/**
 * Lesson Entity routes
 */

router.get('/user/:iduser', function(req, res){
    resultuserlessonController.findByUser(req, res);
})

router.get('/lesson/:idleccion', function(req, res){
    resultuserlessonController.findByLeccion(req, res);
})

router.get('/count', function (req, res) {
    resultuserlessonController.countAll(res);
});

router.get('/countDiffUsersByCourse/:idcurso', function(req, res){
    resultuserlessonController.countDiffUsersByCourse(req, res);
})

router.post('/create', function (req, res) {
    resultuserlessonController.create(req, res);
});


module.exports = router;