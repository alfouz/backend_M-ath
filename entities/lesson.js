class Lesson{
    constructor(id, idlocal, idcurso, titulo, descripcion, duracion, tareas) {
        this.id = id;
        this.idcurso = idcurso;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.duracion = duracion;
        this.idlocal = idlocal;
        this.tareas = tareas;
    }
}

module.exports = Lesson;