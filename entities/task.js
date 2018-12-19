class Task{
    constructor(id, idlocal, idleccion, ecuacion, descripcion, options) {
        this.id = id;
        this.idleccion = idleccion;
        this.ecuacion = ecuacion;
        this.descripcion = descripcion;
        this.options = options;
        this.idlocal = idlocal;
    }
}

module.exports = Task;