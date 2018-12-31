const CourseDao = require('../daos/courseDao');
const LessonDao = require('../daos/lessonDao');
const TaskDao = require('../daos/taskDao');
const TaskOptionDao = require('../daos/taskOptionDao');

const ControllerCommon = require('./controllerCommon');

const Course = require('../entities/course');
const Lesson = require('../entities/lesson');
const Task = require('../entities/task');
const TaskOption = require('../entities/taskoption');

/**
 * Course Controller
 */
class CourseController {

    constructor() {
        this.courseDao = new CourseDao();
        this.lessonDao = new LessonDao();
        this.taskDao = new TaskDao();
        this.taskOptionDao = new TaskOptionDao();
        this.common = new ControllerCommon();
    }

    findById(req, res) {
        let id = req.params.id;

        this.courseDao.findById(id)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    findAll(res) {
        this.courseDao.findAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    countAll(res) {

        this.courseDao.countAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.serverError(res));
    };

    update(req, res) {
        let course = new Course();
        course.id = req.body.id;
        course.idlocal = req.body.idlocal;
        course.iduser = req.body.iduser;
        course.titulo = req.body.titulo;
        course.descripcion = req.body.descripcion;
        course.tipo = req.body.tipo;
        course.nivel = req.body.nivel;
        course.publico = req.body.publico!=0;

        return this.courseDao.update(course)
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));
    };

    create(req, res) {
        let course = new Course();
        course.idlocal = req.body.idlocal;
        course.iduser = req.body.iduser;
        course.titulo = req.body.titulo;
        course.descripcion = req.body.descripcion;
        course.tipo = req.body.tipo;
        course.nivel = req.body.nivel;
        course.publico = req.body.publico!=0;

        let context = this;
        let test = this.courseDao.findByIdLocalAndUser(course.idlocal, course.iduser)
            .then(function(result){
                
                result.titulo = course.titulo;
                result.descripcion = course.descripcion;
                result.tipo = course.tipo;
                result.nivel = course.nivel;
                result.publico = result.publico;
                return context.courseDao.update(result)
                    .then(context.common.editSuccess(res))
                    .catch(context.common.serverError(res));
            })
            .catch(function(error){
                console.log("Creando curso " + course.titulo)
                return context.courseDao.create(course)
                .then(context.common.editSuccess(res))
                .catch(context.common.serverError(res));
            })

    };

    createOptions(optionsJSON, idtask){
        let context = this;
        //Buscamos las tareas actuales y comprobamos si todas siguen existiendo, si no, se borran
        context.taskOptionDao.findByTask(idtask)
        .then(function(resultOptionTasks){
            for(let iOptionTask = 0; iOptionTask<resultOptionTasks.length; iOptionTask++){
                let existOptionTask = false;
                for(let iTaskOptionNew = 0; iTaskOptionNew<optionsJSON.length; iTaskOptionNew++){
                    if(optionsJSON[iTaskOptionNew].id==resultOptionTasks[iTask].idlocal){
                        existOptionTask=true;
                    }
                }
                if(!existOptionTask){
                    context.taskOptionDao.deleteById(resultOptionTasks[iOptionTask].id)
                    .then(function(result){
                        console.log("Borrada la opcion" + resultOptionTasks[iOptionTask].id)
                    })
                    .catch(function(error){
                        console.log("No se pudo borrar la opcion " + resultOptionTasks[iOptionTask].id)
                    })
                }
            }
            //Insertamos o modificamos el resto
            for(let iTaskOptionNew = 0; iTaskOptionNew<optionsJSON.length; iTaskOptionNew++){
                let taskOptionJSON = optionsJSON[iTaskOptionNew];
                context.taskOptionDao.findByIdLocalAndTask(taskOptionJSON.id, idtask)
                .then(function(resultOptionTask){
                    resultOptionTask.ecuacion = taskOptionJSON.isEcuation;
                    resultOptionTask.texto = taskOptionJSON.text;
                    resultOptionTask.correcto = taskOptionJSON.correct;
                    context.taskOptionDao.update(resultOptionTask)
                    .then(function(resultUpdateOptionTask){
                        console.log("Actualizada tarea " + resultOptionTask.id)
                    })
                    .catch(function(errorUpdateOptionTask){
                        console.log("Error al actualizar tarea " + resultOptionTask.id);
                    })
                })
                .catch(function(errorTask){
                    let taskOption = new TaskOption();
                    taskOption.idlocal = taskOptionJSON.id;
                    taskOption.idtarea = idtask;
                    taskOption.texto = taskOptionJSON.text;
                    taskOption.ecuacion = taskOptionJSON.isEcuation;
                    taskOption.correcto = taskOptionJSON.correct;
                    context.taskOptionDao.create(taskOption)
                    .then(function(resultCreateOptionTask){
                        console.log("Creada opcion " + resultCreateOptionTask);
                    })
                    .catch(function(errorCreateOption){
                        console.log("Error creando opcion");
                    })
                })
            }
        })
        .catch(function(errorOptionTasks){
           //Insertamos o modificamos el resto
           for(let iTaskOptionNew = 0; iTaskOptionNew<optionsJSON.length; iTaskOptionNew++){
            let taskOptionJSON = optionsJSON[iTaskOptionNew];
            context.taskOptionDao.findByIdLocalAndTask(taskOptionJSON.id, idtask)
            .then(function(resultOptionTask){
                resultOptionTask.ecuacion = taskOptionJSON.isEcuation;
                resultOptionTask.texto = taskOptionJSON.text;
                resultOptionTask.correcto = taskOptionJSON.correct;
                context.taskOptionDao.update(resultOptionTask)
                .then(function(resultUpdateOptionTask){
                    console.log("Actualizada tarea " + resultOptionTask.id)
                })
                .catch(function(errorUpdateOptionTask){
                    console.log("Error al actualizar tarea " + resultOptionTask.id);
                })
            })
            .catch(function(errorTask){
                let taskOption = new TaskOption();
                taskOption.idlocal = taskOptionJSON.id;
                taskOption.idtarea = idtask;
                taskOption.texto = taskOptionJSON.text;
                taskOption.ecuacion = taskOptionJSON.isEcuation;
                taskOption.correcto = taskOptionJSON.correct
                context.taskOptionDao.create(taskOption)
                .then(function(resultCreateOptionTask){
                    console.log("Creada opcion " + resultCreateOptionTask);
                })
                .catch(function(errorCreateOption){
                    console.log("Error creando opcion");
                })
            })
        }
        });
    }

    //CREAR TAREAS ------------------------
    createTasks(tasksJSON, idlesson){
        let context = this;
        //Buscamos las tareas actuales y comprobamos si todas siguen existiendo, si no, se borran
        context.taskDao.findByLesson(idlesson)
        .then(function(resultTasks){
            for(let iTask = 0; iTask<resultTasks.length; iTask++){
                let existTask = false;
                for(let iTaskNew = 0; iTaskNew<tasksJSON.length; iTaskNew++){
                    if(tasksJSON[iTaskNew].id==resultTasks[iTask].idlocal){
                        existTask=true;
                    }
                }
                if(!existTask){
                    context.taskDao.deleteById(resultTasks[iTask].id)
                    .then(function(result){
                        console.log("Borrada la tarea" + resultTasks[iTask].id)
                    })
                    .catch(function(error){
                        console.log("No se pudo borrar la tarea " + resultTasks[iTask].id)
                    })
                }
            }
            //Insertamos o modificamos el resto
            for(let iTaskNew = 0; iTaskNew<tasksJSON.length; iTaskNew++){
                let taskJSON = tasksJSON[iTaskNew];
                context.taskDao.findByIdLocalAndLesson(taskJSON.id, idlesson)
                .then(function(resultTask){
                    resultTask.ecuacion = taskJSON.ecuation;
                    resultTask.descripcion = taskJSON.description;
                    context.taskDao.update(resultTask)
                    .then(function(resultUpdateTask){
                        console.log("Actualizada tarea " + resultTask.id)
                        context.createOptions(taskJSON.answers, resultTask.id)
                    })
                    .catch(function(errorUpdateTask){
                        console.log("Error al actualizar tarea " + resultTask.id);
                    })
                })
                .catch(function(errorTask){
                    let task = new Task();
                    task.idlocal = taskJSON.id;
                    task.idleccion = idlesson;
                    task.descripcion = taskJSON.description;
                    task.ecuacion = taskJSON.ecuation;
                    context.taskDao.create(task)
                    .then(function(resultCreateTask){
                        console.log("Creada tarea " + resultCreateTask);
                        context.createOptions(taskJSON.answers, resultCreateTask)
                    })
                    .catch(function(errorCreateTask){
                        console.log("Error creando tarea");
                    })
                })
            }
        })
        .catch(function(errorTasks){
            //Insertamos o modificamos las tareas
            for(let iTaskNew = 0; iTaskNew<tasksJSON.length; iTaskNew++){
                let taskJSON = tasksJSON[iTaskNew];
                context.taskDao.findByIdLocalAndLesson(taskJSON.id, idlesson)
                .then(function(resultTask){
                    resultTask.ecuacion = taskJSON.ecuation;
                    resultTask.descripcion = taskJSON.description;
                    context.taskDao.update(resultTask)
                    .then(function(resultUpdateTask){
                        console.log("Actualizada tarea " + resultTask.id)
                        context.createOptions(taskJSON.answers, resultTask.id)
                    })
                    .catch(function(errorUpdateTask){
                        console.log("Error al actualizar tarea " + resultTask.id);
                    })
                })
                .catch(function(errorTask){
                    let task = new Task();
                    task.idlocal = taskJSON.id;
                    task.idleccion = idlesson;
                    task.descripcion = taskJSON.description;
                    task.ecuacion = taskJSON.ecuation;
                    context.taskDao.create(task)
                    .then(function(resultCreateTask){
                        console.log("Creada tarea " + resultCreateTask);
                        context.createOptions(taskJSON.answers, resultCreateTask)
                    })
                    .catch(function(errorCreateTask){
                        console.log("Error creando tarea");
                    })
                })
            }
        });
    }

    createLessons(lessonsJSON, idcourse){
        let context = this;
        //Buscamos las LECCIONES actuales y miramos una a una si existen
        context.lessonDao.findByCourse(idcourse)
        .then(function(resultLessons){
            //Comprobar si todas existen, si no, borrarlas TODO necesario comprobar si funciona #######################
            for(let iLessons = 0; iLessons<resultLessons.length; iLessons++){
                let existsLesson = false;
                for(let iLessonsNew = 0; iLessonsNew<lessonsJSON.length; iLessonsNew++){
                    if(lessonsJSON[iLessonsNew].id==resultLessons[iLessons].idlocal){
                        existsLesson = true;
                    }
                }
                if(!existsLesson){
                    context.lessonDao.deleteById(resultLessons[iLessons].id)
                    .then(function(result){
                        console.log("Borrada lección " + resultLessons[iLessons].titulo)

                    })
                    .catch(function(error){
                        console.log("No se pudo borrar leccion " + resultLessons[iLessons].titulo)
                    })
                }
            }
            //Insertar o modificar lecciones nuevas del curso
            for(let iLessonsNew = 0; iLessonsNew<lessonsJSON.length; iLessonsNew++){
                let lessonJSON = lessonsJSON[iLessonsNew];
                context.lessonDao.findByIdLocalAndCourse(lessonJSON.id, idcourse)
                .then(function(resultLesson){
                    //Ya existe, por lo tanto hay que modificarla
                    resultLesson.titulo = lessonJSON.title;
                    resultLesson.descripcion = lessonJSON.description;
                    resultLesson.duracion = lessonJSON.duration;
                    context.lessonDao.update(resultLesson)
                    .then(function(resultUpdateLesson){
                        console.log("Actualizada lección " + resultLesson.titulo)
                        context.createTasks(lessonJSON.tasks, resultLesson.id);
                    })
                    .catch(function(errorUpdateLesson){
                        console.log("Error al actualizar leccion " + resultLesson.titulo)
                    })
                })
                .catch(function(errorLesson){
                    //Necesario crear leccion
                    let lesson = new Lesson();
                    lesson.idlocal = lessonJSON.id;
                    lesson.idcurso = idcourse;
                    lesson.titulo = lessonJSON.title;
                    lesson.descripcion = lessonJSON.descripcion;
                    lesson.duracion = lessonJSON.duracion;
                    context.lessonDao.create(lesson)
                    .then(function(resultCreatedLesson){
                        console.log("Creada lección " + lesson.titulo)
                        context.createTasks(lessonJSON.tasks, resultCreatedLesson);
                    })
                    .catch(function(errorCreatedLesson){
                        console.log("Error al crear leccion " + lesson.titulo)
                    })
                })
            }
        })
        .catch(function(errorLessons){
            //Insertar o modificar lecciones nuevas del curso
            for(let iLessonsNew = 0; iLessonsNew<lessonsJSON.length; iLessonsNew++){
                let lessonJSON = lessonsJSON[iLessonsNew];
                context.lessonDao.findByIdLocalAndCourse(lessonJSON.id, lessonJSON.course)
                .then(function(resultLesson){
                    //Ya existe, por lo tanto hay que modificarla
                    resultLesson.titulo = lessonJSON.title;
                    resultLesson.descripcion = lessonJSON.description;
                    resultLesson.duracion = lessonJSON.duration;
                    context.lessonDao.update(resultLesson)
                    .then(function(resultUpdateLesson){
                        console.log("Actualizada lección " + resultLesson.titulo)
                        context.createTasks(lessonJSON.tasks, resultUpdateLesson);
                    })
                    .catch(function(errorUpdateLesson){
                        console.log("Error al actualizar leccion " + resultLesson.titulo)
                    })
                })
                .catch(function(errorLesson){
                    //Necesario crear leccion
                    let lesson = new Lesson();
                    lesson.idlocal = lessonJSON.id;
                    lesson.idcurso = idcourse;
                    lesson.titulo = lessonJSON.title;
                    lesson.descripcion = lessonJSON.description;
                    lesson.duracion = lessonJSON.duration;
                    context.lessonDao.create(lesson)
                    .then(function(resultCreatedLesson){
                        console.log("Creada lección " + lesson.titulo);
                        context.createTasks(lessonJSON.tasks, resultCreatedLesson);
                    })
                    .catch(function(errorCreatedLesson){
                        console.log("Error al crear leccion " + lesson.titulo)
                    })
                })

            }
        })
    }

    createAll(req, res){
        let course = new Course();
        let courseJSON = req.body.courseJSON;


        course.idlocal = courseJSON.id;
        course.iduser = courseJSON.creator;
        course.titulo = courseJSON.title;
        course.descripcion = courseJSON.description;
        course.tipo = courseJSON.type;
        course.nivel = courseJSON.level;
        course.publico = courseJSON.public;

        let context = this;
        //Buscamos si el curso existe ----
        this.courseDao.findByIdLocalAndUser(course.idlocal, course.iduser)
            .then(function(result){
                //Si existe, lo MODIFICAMOS
                result.titulo = course.titulo;
                result.descripcion = course.descripcion;
                result.tipo = course.tipo;
                result.nivel = course.nivel;
                result.publico = result.publico;
                return context.courseDao.update(result)
                    .then(function(resultUpdate){
                        console.log("Actualizando curso " + result.titulo);
                        context.createLessons(courseJSON.lessons, result.id);
                        context.common.editSuccess(res)(resultUpdate);
                    })
                    .catch(context.common.serverError(res));

                
            })
            .catch(function(error){
                return context.courseDao.create(course)
                .then(function(resultCreate){
                    console.log("Creando curso " + course.titulo)
                    context.createLessons(courseJSON.lessons, resultCreate)
                    context.common.editSuccess(res)(resultCreate);
                })
                .catch(function(errorCreatedCourse){
                    console.log(errorCreatedCourse);
                    context.common.serverError(res)(errorCreatedCourse)
                });
            })

    }

    deleteById(req, res) {
        let id = req.params.id;

        this.courseDao.deleteById(id)
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));
    };

    exists(req, res) {
        let id = req.params.id;

        this.courseDao.exists(id)
            .then(this.common.existsSuccess(res))
            .catch(this.common.findError(res));
    };
}

module.exports = CourseController;