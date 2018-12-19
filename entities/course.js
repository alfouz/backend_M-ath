class Course{
    constructor(id, idlocal, iduser, titulo, descripcion, tipo, nivel, publico, lecciones) {
        this.id = id;
        this.idlocal = idlocal;
        this.iduser = iduser;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.tipo = tipo;
        this.nivel = nivel;
        this.publico = publico;
        this.lecciones = lecciones;
    }
}

module.exports = Course;