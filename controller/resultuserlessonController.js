const ResultUserLessonDao = require('../daos/resultuserlessonDao');

const ControllerCommon = require('./controllerCommon');

const ResultUserLesson = require('../entities/resultuserlesson');

/**
 * ResultUserLesson Controller
 */
class ResultUserLessonController {

    constructor() {
        this.resultuserlessonDao = new ResultUserLessonDao();
        this.common = new ControllerCommon();
    }

    findByUser(req, res) {
        let iduser = req.params.iduser;
        
        this.resultuserlessonDao.findByUser(iduser)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    findByLeccion(req, res) {
        let idleccion = req.params.idleccion;
        this.resultuserlessonDao.findByLeccion(idleccion)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    countAll(res) {

        this.resultuserlessonDao.countAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.serverError(res));
    };

    countDiffUsersByCourse(req, res){
        let idcurso = req.params.idcurso;
        this.resultuserlessonDao.countDiffUsersByCourse(idcurso)
        .then(this.common.findSuccess(res))
        .catch(this.common.findError(res));
    }

    create(req, res) {
        let resultuserlesson = new ResultUserLesson();
        resultuserlesson.user = req.body.user;
        resultuserlesson.lesson = req.body.lesson;
        resultuserlesson.timestamp = req.body.timestamp;
        resultuserlesson.percentCorrect = req.body.percentcorrect;

        return this.resultuserlessonDao.create(resultuserlesson)
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));

    };

}

module.exports = ResultUserLessonController;