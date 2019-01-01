const ResultUserLesson = require('../entities/resultuserlesson');

const daoCommon = require('./daoCommon');

class ResultUserLessonDao {

    constructor() {
        this.common = new daoCommon();
    }

    findByUser(usuario) {
        let sqlRequest = "SELECT * FROM resultados WHERE usuario=$usuario";
        let sqlParams = {$usuario: usuario};
        return this.common.findAllParams(sqlRequest, sqlParams).then(rows => {
            let results = [];
            for (const row of rows) {
                results.push(new ResultUserLesson(row.usuario, row.idleccion, row.timestamp, row.percentcorrect));
            }
            return results;
        });
    };

    findByLeccion(idleccion) {
        let sqlRequest = "SELECT * FROM resultados WHERE idleccion=$idleccion";
        let sqlParams = {$idleccion: idleccion};
        return this.common.findAllParams(sqlRequest, sqlParams).then(rows => {
            let results = [];
            for (const row of rows) {
                results.push(new ResultUserLesson(row.usuario, row.idleccion, row.timestamp, row.percentcorrect));
            }
            return results;
        });
    };

    countAll() {
        let sqlRequest = "SELECT COUNT(*) AS count FROM resultados";
        return this.common.findOne(sqlRequest);
    };

    
    create(ResultUserLesson) {
        let sqlRequest = "INSERT into resultados (usuario, idleccion, timestamp, percentcorrect) " +
            "VALUES ($usuario, $idleccion, $timestamp, $percentcorrect)";
        let sqlParams = {
            $usuario: ResultUserLesson.user,
            $idleccion: ResultUserLesson.lesson,
            $timestamp: ResultUserLesson.timestamp,
            $percentcorrect: ResultUserLesson.percentCorrect
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /*deleteById(id) {
        let sqlRequest = "DELETE FROM resultados WHERE id=$id";
        let sqlParams = {$id: id};
        return this.common.run(sqlRequest, sqlParams);
    };*/

    /*exists(id) {
        let sqlRequest = "SELECT (count(*) > 0) as found FROM lecciones WHERE id=$id";
        let sqlParams = {$id: id};
        return this.common.run(sqlRequest, sqlParams);
    };*/
}

module.exports = ResultUserLessonDao;