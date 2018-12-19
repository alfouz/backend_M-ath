const Lesson = require('../entities/lesson');

const daoCommon = require('./daoCommon');

class LessonDao {

    constructor() {
        this.common = new daoCommon();
    }

    findById(id) {
        let sqlRequest = "SELECT * FROM lecciones WHERE id=$id";
        let sqlParams = {$id: id};
        return this.common.findOne(sqlRequest, sqlParams).then(row =>
            new Lesson(row.id, row.idlocal, row.idcurso, row.titulo, row.descripcion, row.duracion, null));
    };

    findByIdLocalAndCourse(idlocal, idcurso) {
        let sqlRequest = "SELECT * FROM lecciones WHERE idlocal=$idlocal AND idcurso=$idcurso";
        let sqlParams = {$idlocal: idlocal, $idcurso: idcurso};
        return this.common.findOne(sqlRequest, sqlParams).then(row =>
            new Lesson(row.id, row.idlocal, row.idcurso, row.titulo, row.descripcion, row.duracion, null));
    };

    findAll() {
        let sqlRequest = "SELECT * FROM lecciones";
        return this.common.findAll(sqlRequest).then(rows => {
            let lessons = [];
            for (const row of rows) {
                lessons.push(new Lesson(row.id, row.idlocal, row.idcurso, row.titulo, row.descripcion, row.duracion, null));
            }
            return lessons;
        });
    };

    findByCourse(idcurso) {
        let sqlRequest = "SELECT * FROM lecciones WHERE idcurso=$idcurso";
        let sqlParams = {$idcurso: idcurso};
        return this.common.findAllParams(sqlRequest, sqlParams).then(rows => {
            let lessons = [];
            for (const row of rows) {
                lessons.push(new Lesson(row.id, row.idlocal, row.idcurso, row.titulo, row.descripcion, row.duracion, null));
            }
            return lessons;
        });
    };

    countAll() {
        let sqlRequest = "SELECT COUNT(*) AS count FROM lecciones";
        return this.common.findOne(sqlRequest);
    };

    update(Lesson) {
        let sqlRequest = "UPDATE lecciones SET " +
            "idcurso=$idcurso, " +
            "idlocal=$idlocal, " +
            "titulo=$titulo, " +
            "descripcion=$descripcion, " +
            "duracion=$duracion " +
            "WHERE id=$id";

        let sqlParams = {
            $id: Lesson.id,
            $idcurso: Lesson.idcurso,
            $idlocal: Lesson.idlocal,
            $titulo: Lesson.titulo,
            $descripcion: Lesson.descripcion,
            $duracion: Lesson.duracion
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    create(Lesson) {
        let sqlRequest = "INSERT into lecciones (idcurso, idlocal, titulo, descripcion, duracion) " +
            "VALUES ($idcurso, $idlocal, $titulo, $descripcion, $duracion)";
        let sqlParams = {
            $idcurso: Lesson.idcurso,
            $idlocal: Lesson.idlocal,
            $titulo: Lesson.titulo,
            $descripcion: Lesson.descripcion,
            $duracion: Lesson.duracion
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    deleteById(id) {
        let sqlRequest = "DELETE FROM lecciones WHERE id=$id";
        let sqlParams = {$id: id};
        return this.common.run(sqlRequest, sqlParams);
    };

    exists(id) {
        let sqlRequest = "SELECT (count(*) > 0) as found FROM lecciones WHERE id=$id";
        let sqlParams = {$id: id};
        return this.common.run(sqlRequest, sqlParams);
    };
}

module.exports = LessonDao;