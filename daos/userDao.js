const User = require('../entities/user');

const daoCommon = require('./daoCommon');

class UserDao {

    constructor() {
        this.common = new daoCommon();
    }

    findById(id) {
        let sqlRequest = "SELECT * FROM usuarios WHERE id=$id";
        let sqlParams = {$id: id};
        return this.common.findOne(sqlRequest, sqlParams).then(row =>
            new User(row.id, row.idgoogle));
    };

    findByIdGoogle(idgoogle) {
        let sqlRequest = "SELECT * FROM usuarios WHERE idgoogle=$idgoogle";
        let sqlParams = {$idgoogle: idgoogle};
        return this.common.findOne(sqlRequest, sqlParams).then(row =>
            new User(row.id, row.idgoogle));
    };

    findAll() {
        let sqlRequest = "SELECT * FROM usuarios";
        return this.common.findAll(sqlRequest).then(rows => {
            let users = [];
            for (const row of rows) {
                users.push(new User(row.id, row.idgoogle));
            }
            return users;
        });
    };

    countAll() {
        let sqlRequest = "SELECT COUNT(*) AS count FROM usuarios";
        return this.common.findOne(sqlRequest);
    };

    update(User) {
        let sqlRequest = "UPDATE usuarios SET " +
            "idgoogle=$idgoogle " +
            "WHERE id=$id";

        let sqlParams = {
            $id: User.id,
            $idcurso: User.idgoogle
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    create(User) {
        let sqlRequest = "INSERT into usuarios (idgoogle) " +
            "VALUES ($idgoogle)";
        let sqlParams = {
            $idgoogle: User.idgoogle
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    deleteById(id) {
        let sqlRequest = "DELETE FROM usuarios WHERE id=$id";
        let sqlParams = {$id: id};
        return this.common.run(sqlRequest, sqlParams);
    };

    exists(id) {
        let sqlRequest = "SELECT (count(*) > 0) as found FROM usuarios WHERE id=$id";
        let sqlParams = {$id: id};
        return this.common.run(sqlRequest, sqlParams);
    };
}

module.exports = UserDao;