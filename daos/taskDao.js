const Task = require('../entities/task');

const daoCommon = require('./daoCommon');

class TaskDao {

    constructor() {
        this.common = new daoCommon();
    }
    
    findById(id) {
        let sqlRequest = "SELECT * FROM tareas WHERE id=$id";
        let sqlParams = {$id: id};
        return this.common.findOne(sqlRequest, sqlParams).then(row =>
            new Task(row.id, row.idlocal, row.idleccion, row.ecuacion, row.descripcion));
    };

    findByIdLocalAndLesson(idlocal, idleccion) {
        let sqlRequest = "SELECT * FROM tareas WHERE idlocal=$idlocal AND idleccion=$idleccion";
        let sqlParams = {$idlocal: idlocal, $idleccion: idleccion};
        return this.common.findOne(sqlRequest, sqlParams).then(row =>
            new Task(row.id, row.idlocal, row.idleccion, row.ecuacion, row.descripcion));
    };

    findAll() {
        let sqlRequest = "SELECT * FROM tareas";
        return this.common.findAll(sqlRequest).then(rows => {
            let tareas = [];
            for (const row of rows) {
                tareas.push(new Task(row.id, row.idlocal, row.idleccion, row.ecuacion, row.descripcion));
            }
            return tareas;
        });
    };

    findByLesson(idleccion) {
        let sqlRequest = "SELECT * FROM tareas WHERE idleccion=$idleccion";
        let sqlParams = {$idleccion: idleccion};
        return this.common.findAllParams(sqlRequest, sqlParams).then(rows => {
            let tasks = [];
            for (const row of rows) {
                tasks.push(new Task(row.id, row.idlocal, row.idleccion, row.ecuacion, row.descripcion));
            }
            return tasks;
        });
    };
    
    countAll() {
        let sqlRequest = "SELECT COUNT(*) AS count FROM tareas";
        return this.common.findOne(sqlRequest);
    };

    update(Task) {
        let sqlRequest = "UPDATE tareas SET " +
            "idleccion=$idleccion, " +
            "idlocal=$idlocal, " +
            "ecuacion=$ecuacion, " +
            "descripcion=$descripcion " +
            "WHERE id=$id";

        let sqlParams = {
            $id: Task.id,
            $idleccion: Task.idleccion,
            $idlocal: Task.idlocal,
            $ecuacion: Task.ecuacion,
            $descripcion: Task.descripcion
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    create(Task) {
        let sqlRequest = "INSERT into tareas (idleccion, idlocal, ecuacion, descripcion) " +
            "VALUES ($idleccion, $idlocal, $ecuacion, $descripcion)";
        let sqlParams = {
            $idleccion: Task.idleccion,
            $idlocal: Task.idlocal,
            $ecuacion: Task.ecuacion,
            $descripcion: Task.descripcion
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    deleteById(id) {
        let sqlRequest = "DELETE FROM tareas WHERE id=$id";
        let sqlParams = {$id: id};
        return this.common.run(sqlRequest, sqlParams);
    };

    exists(id) {
        let sqlRequest = "SELECT (count(*) > 0) as found FROM tareas WHERE id=$id";
        let sqlParams = {$id: id};
        return this.common.run(sqlRequest, sqlParams);
    };
}

module.exports = TaskDao;