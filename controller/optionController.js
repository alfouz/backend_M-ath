const TaskOptionDao = require('../daos/taskOptionDao');

const ControllerCommon = require('./controllerCommon');

const TaskOption = require('../entities/taskoption');

/**
 * TaskOption Controller
 */
class TaskOptionController {

    constructor() {
        this.taskOptionDao = new TaskOptionDao();
        this.common = new ControllerCommon();
    }

    findById(req, res) {
        let id = req.params.id;

        this.taskOptionDao.findById(id)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    findAll(res) {
        this.taskOptionDao.findAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    findByTask(req, res){
        let idtask = req.params.id;
        this.taskOptionDao.findByTask(idtask)
        .then(this.common.findSuccess(res))
        .catch(this.common.findError(res));
    }

    countAll(res) {

        this.taskOptionDao.countAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.serverError(res));
    };

    update(req, res) {
        let taskOption = new TaskOption();
        taskOption.id = req.body.id;
        taskOption.idlocal = req.body.idlocal;
        taskOption.idtarea = req.body.idtarea;
        taskOption.ecuacion = req.body.ecuacion;
        taskOption.texto = req.body.texto;
        taskOption.correcto = req.body.correcto;

        return this.taskOptionDao.update(taskOption)
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));
    };

    create(req, res) {
        let taskOption = new TaskOption();
        taskOption.idlocal = req.body.idlocal;
        taskOption.idtarea = req.body.idtarea;
        taskOption.ecuacion = req.body.ecuacion;
        taskOption.texto = req.body.texto;
        taskOption.correcto = req.body.correcto;

        return this.taskOptionDao.create(taskOption)
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));

    };

    deleteById(req, res) {
        let id = req.params.id;

        this.taskOptionDao.deleteById(id)
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));
    };

    exists(req, res) {
        let id = req.params.id;

        this.taskOptionDao.exists(id)
            .then(this.common.existsSuccess(res))
            .catch(this.common.findError(res));
    };
}

module.exports = TaskOptionController;