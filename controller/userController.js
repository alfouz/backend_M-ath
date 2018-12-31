const UserDao = require('../daos/userDao');

const ControllerCommon = require('./controllerCommon');

const User = require('../entities/user');

/**
 * User Controller
 */
class UserController {

    constructor() {
        this.userDao = new UserDao();
        this.common = new ControllerCommon();
    }

    findById(req, res) {
        let id = req.params.id;

        this.userDao.findById(id)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    
    findByIdGoogle(req, res){
        let idgoogle = req.params.idgoogle;
        this.userDao.findByIdGoogle(idgoogle)
        .then(this.common.findSuccess(res))
        .catch(this.common.findError(res));
    }

    findAll(res) {
        this.userDao.findAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    countAll(res) {

        this.userDao.countAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.serverError(res));
    };


    update(req, res) {
        let user = new User();
        user.id = req.body.id;
        user.idgoogle = req.body.idgoogle;

        return this.userDao.update(user)
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));
    };

    create(req, res) {
        let user = new User();
        user.idgoogle = req.body.idgoogle;
        
        return this.userDao.create(user)
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));

    };

    deleteById(req, res) {
        let id = req.params.id;

        this.userDao.deleteById(id)
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));
    };

    exists(req, res) {
        let id = req.params.id;

        this.userDao.exists(id)
            .then(this.common.existsSuccess(res))
            .catch(this.common.findError(res));
    };
}

module.exports = UserController;