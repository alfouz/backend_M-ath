const TaskOption = require('../entities/taskoption');

const daoCommon = require('./daoCommon');

class TaskOptionDao {

    constructor() {
        this.common = new daoCommon();
    }
    
    findById(id) {
        let sqlRequest = "SELECT * FROM opciones WHERE id=$id";
        let sqlParams = {$id: id};
        return this.common.findOne(sqlRequest, sqlParams).then(row =>
            new TaskOption(row.id, row.idlocal, row.idtarea, row.texto, row.correcto, row.ecuacion));
    };

    findByIdLocalAndTask(idlocal, idtarea) {
        let sqlRequest = "SELECT * FROM opciones WHERE idlocal=$idlocal AND idtarea=$idtarea";
        let sqlParams = {$idlocal: idlocal, $idtarea: idtarea};
        return this.common.findOne(sqlRequest, sqlParams).then(row =>
            new TaskOption(row.id, row.idlocal, row.idtarea, row.texto, row.correcto, row.ecuacion));
    };

    findAll() {
        let sqlRequest = "SELECT * FROM opciones";
        return this.common.findAll(sqlRequest).then(rows => {
            let opciones = [];
            for (const row of rows) {
                opciones.push(new TaskOption(row.id, row.idlocal, row.idtarea, row.texto, row.correcto, row.ecuacion));
            }
            return opciones;
        });
    };

    findByTask(idtarea) {
        let sqlRequest = "SELECT * FROM opciones WHERE idtarea=$idtarea";
        let sqlParams = {$idtarea: idtarea};
        return this.common.findAllParams(sqlRequest, sqlParams).then(rows => {
            let tasks = [];
            for (const row of rows) {
                tasks.push(new TaskOption(row.id, row.idlocal, row.idtarea, row.texto, row.correcto, row.ecuacion));
            }
            return tasks;
        });
    };

    countAll() {
        let sqlRequest = "SELECT COUNT(*) AS count FROM opciones";
        return this.common.findOne(sqlRequest);
    };

    update(TaskOption) {
        let sqlRequest = "UPDATE opciones SET " +
            "idtarea=$idtarea, " +
            "idlocal=$idlocal, " +
            "ecuacion=$ecuacion, " +
            "texto=$texto, " +
            "correcto=$correcto " +
            "WHERE id=$id";

        let sqlParams = {
            $id: TaskOption.id,
            $idtarea: TaskOption.idtarea,
            $idlocal: TaskOption.idlocal,
            $ecuacion: TaskOption.ecuacion,
            $correcto: TaskOption.correcto,
            $texto: TaskOption.texto
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    create(TaskOption) {
        let sqlRequest = "INSERT into opciones (idtarea, idlocal, ecuacion, correcto, texto) " +
            "VALUES ($idtarea, $idlocal, $ecuacion, $correcto, $texto)";
        let sqlParams = {
            $idtarea: TaskOption.idtarea,
            $idlocal: TaskOption.idlocal,
            $ecuacion: TaskOption.ecuacion,
            $correcto: TaskOption.correcto,
            $texto: TaskOption.texto
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    deleteById(id) {
        let sqlRequest = "DELETE FROM opciones WHERE id=$id";
        let sqlParams = {$id: id};
        return this.common.run(sqlRequest, sqlParams);
    };

    exists(id) {
        let sqlRequest = "SELECT (count(*) > 0) as found FROM opciones WHERE id=$id";
        let sqlParams = {$id: id};
        return this.common.run(sqlRequest, sqlParams);
    };
}

module.exports = TaskOptionDao;