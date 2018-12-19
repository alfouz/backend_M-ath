class TaskOption{
    constructor(id, idlocal, idtarea, texto, correcto, ecuacion) {
        this.id = id;
        this.idlocal = idlocal;
        this.idtarea = idtarea;
        this.ecuacion = ecuacion;
        this.texto = texto;
        this.correcto = correcto;
    }
}

module.exports = TaskOption;