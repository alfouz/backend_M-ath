const LessonDao = require('../daos/lessonDao');

const ControllerCommon = require('./controllerCommon');

const Lesson = require('../entities/lesson');

/**
 * Lesson Controller
 */
class LessonController {

    constructor() {
        this.lessonDao = new LessonDao();
        this.common = new ControllerCommon();
    }

    findById(req, res) {
        let id = req.params.id;

        this.lessonDao.findById(id)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    
    findByCourse(req, res){
        let idcourse = req.params.id;
        this.lessonDao.findByCourse(idcourse)
        .then(this.common.findSuccess(res))
        .catch(this.common.findError(res));
    }

    findByIdLocalAndCourse(req, res){
        let idcourse = req.params.idcourse;
        let idlocal = req.params.idlocal;
        console.log(idlocal, idcourse);
        this.lessonDao.findByIdLocalAndCourse(idlocal, idcourse)
        .then(this.common.findSuccess(res))
        .catch(this.common.findError(res));
    }

    findAll(res) {
        this.lessonDao.findAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    countAll(res) {

        this.lessonDao.countAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.serverError(res));
    };


    update(req, res) {
        let lesson = new Lesson();
        lesson.id = req.body.id;
        lesson.idlocal = req.body.idlocal;
        lesson.idcurso = req.body.idcurso;
        lesson.titulo = req.body.titulo;
        lesson.descripcion = req.body.descripcion;
        lesson.duracion = req.body.duracion;

        return this.lessonDao.update(lesson)
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));
    };

    create(req, res) {
        let lesson = new Lesson();
        lesson.idlocal = req.body.idlocal;
        lesson.idcurso = req.body.idcurso;
        lesson.titulo = req.body.titulo;
        lesson.descripcion = req.body.descripcion;
        lesson.duracion = req.body.duracion;

        return this.lessonDao.create(lesson)
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));

    };

    deleteById(req, res) {
        let id = req.params.id;

        this.lessonDao.deleteById(id)
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));
    };

    exists(req, res) {
        let id = req.params.id;

        this.lessonDao.exists(id)
            .then(this.common.existsSuccess(res))
            .catch(this.common.findError(res));
    };
}

module.exports = LessonController;