
let sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./db/backendtfm.db');

let init = function () {
    
    db.run("CREATE TABLE if not exists cursos (" +
        "titulo      TEXT (200) NOT NULL," +
        "descripcion TEXT (400) NOT NULL," +
        "idlocal     BIGINT     NOT NULL," +
        "iduser      TEXT (200) NOT NULL," +
        "tipo        INTEGER    NOT NULL," +
        "nivel       DECIMAL    NOT NULL," +
        "publico     BOOLEAN    NOT NULL," +
        " id          INTEGER    PRIMARY KEY AUTOINCREMENT NOT NULL" +
        ")");

    db.run("CREATE TABLE if not exists lecciones (" +
        "titulo      TEXT (200) NOT NULL," +
        "descripcion TEXT (400) NOT NULL," +
        "duracion    INTEGER    NOT NULL," +
        "id          INTEGER    PRIMARY KEY AUTOINCREMENT NOT NULL," +
        "idcurso     INTEGER    REFERENCES cursos (id) ON DELETE CASCADE ON UPDATE CASCADE" +
        ")");
        
    db.run("CREATE TABLE if not exists tareas (" +
        "descripcion TEXT (500) NOT NULL," +
        "ecuacion    TEXT (500)," +
        "id          INTEGER    PRIMARY KEY AUTOINCREMENT," +
        "idleccion   INTEGER    REFERENCES lecciones (id) ON DELETE CASCADE ON UPDATE CASCADE" +
        ")");
        
    db.run("CREATE TABLE if not exists opciones (" +
        "texto    TEXT (200) NOT NULL," +
        "correcto BOOLEAN    NOT NULL," +
        "ecuacion BOOLEAN    NOT NULL," +
        "id       INTEGER    PRIMARY KEY AUTOINCREMENT," +
        "idtarea  INTEGER    REFERENCES tareas (id) ON DELETE CASCADE ON UPDATE CASCADE" +
        ")");
};

module.exports = {
    init: init,
    db: db
};