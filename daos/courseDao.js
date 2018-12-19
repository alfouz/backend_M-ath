const Course = require('../entities/course');
const Leccion = require('../entities/lesson');
const Task = require('../entities/task');
const TaskOption = require('../entities/taskoption');

const daoCommon = require('./daoCommon');
const DaoError = require('./daoError');
const database = require('../dbconfig');

class CourseDao {

    constructor() {
        this.common = new daoCommon();
    }

    findById(id) {
        let sqlRequest = "SELECT * FROM cursos WHERE id=$id";
        let sqlParams = {$id: id};
        return this.common.findOne(sqlRequest, sqlParams).then(row =>
            new Course(row.id, row.idlocal, row.iduser, row.titulo, row.descripcion, row.tipo, row.nivel, row.publico, null));
    };

    findByIdLocalAndUser(idlocal, iduser) {
        let sqlRequest = "SELECT * FROM cursos WHERE idlocal=$idlocal AND iduser=$iduser";
        let sqlParams = {$idlocal: idlocal, $iduser: iduser};
        return this.common.findOne(sqlRequest, sqlParams).then(row =>
            new Course(row.id, row.idlocal, row.iduser, row.titulo, row.descripcion, row.tipo, row.nivel, row.publico, null));
    };

    findAll() {
        let sqlRequest = "SELECT * FROM cursos";
        return this.common.findAll(sqlRequest).then(rows => {
            let courses = [];
            for (const row of rows) {
                courses.push(new Course(row.id, row.idlocal, row.iduser, row.titulo, row.descripcion, row.tipo, row.nivel, row.publico, null));
            }
            return courses;
        });
    };

    
    countAll() {
        let sqlRequest = "SELECT COUNT(*) AS count FROM cursos";
        return this.common.findOne(sqlRequest);
    };

    update(Course) {
        let sqlRequest = "UPDATE cursos SET " +
            "idlocal=$idlocal, " +
            "iduser=$iduser, " +
            "titulo=$titulo, " +
            "descripcion=$descripcion, " +
            "tipo=$tipo, " +
            "nivel=$nivel, " +
            "publico=$publico " +
            "WHERE id=$id";

        let sqlParams = {
            $id: Course.id,
            $idlocal: Course.idlocal,
            $iduser: Course.iduser,
            $titulo: Course.titulo,
            $descripcion: Course.descripcion,
            $tipo: Course.tipo,
            $nivel: Course.nivel,
            $publico: Course.publico
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    create(Course) {
        let sqlRequest = "INSERT into cursos (idlocal, iduser, titulo, descripcion, tipo, nivel, publico)" +
            "VALUES ($idlocal, $iduser, $titulo, $descripcion, $tipo, $nivel, $publico)";
        let sqlParams = {
            $idlocal: Course.idlocal,
            $iduser: Course.iduser,
            $titulo: Course.titulo,
            $descripcion: Course.descripcion,
            $tipo: Course.tipo,
            $nivel: Course.nivel,
            $publico: Course.publico
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    deleteById(id) {
        let sqlRequest = "DELETE FROM cursos WHERE id=$id";
        let sqlParams = {$id: id};
        return this.common.run(sqlRequest, sqlParams);
    };

    exists(id) {
        let sqlRequest = "SELECT (count(*) > 0) as found FROM cursos WHERE id=$id";
        let sqlParams = {$id: id};
        return this.common.run(sqlRequest, sqlParams);
    };
}

module.exports = CourseDao;