const TaskDao = require('../daos/taskDao');

const ControllerCommon = require('./controllerCommon');

const Task = require('../entities/task');

/**
 * Task Controller
 */
class TaskController {

    constructor() {
        this.taskDao = new TaskDao();
        this.common = new ControllerCommon();
    }

    findById(req, res) {
        let id = req.params.id;

        this.taskDao.findById(id)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    findAll(res) {
        this.taskDao.findAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    findByLesson(req, res){
        let idlesson = req.params.id;
        this.taskDao.findByLesson(idlesson)
        .then(this.common.findSuccess(res))
        .catch(this.common.findError(res));
    }

    countAll(res) {

        this.taskDao.countAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.serverError(res));
    };

    update(req, res) {
        let task = new Task();
        task.id = req.body.id;
        task.idlocal = req.body.idlocal;
        task.idleccion = req.body.idleccion;
        task.ecuacion = req.body.ecuacion;
        task.descripcion = req.body.descripcion;

        return this.taskDao.update(task)
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));
    };

    create(req, res) {
        let task = new Task();
        task.idlocal = req.body.idlocal;
        task.idleccion = req.body.idleccion;
        task.ecuacion = req.body.ecuacion;
        task.descripcion = req.body.descripcion;

        return this.taskDao.create(task)
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));

    };

    deleteById(req, res) {
        let id = req.params.id;

        this.taskDao.deleteById(id)
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));
    };

    exists(req, res) {
        let id = req.params.id;

        this.taskDao.exists(id)
            .then(this.common.existsSuccess(res))
            .catch(this.common.findError(res));
    };
}

module.exports = TaskController;