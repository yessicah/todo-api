"use strict"
const db = require('../models')
const handler = require('../handlers/errorDb')

/**
 * Get all Tasks
 * @return {Object}
*/
const TaskList = () => {

    const operation = () => {
        return new Promise((resolve, reject) => {
            db.Task.findAll({ where: { deleted: false } }).then(function (tasks) {
                resolve(tasks);
            })
            .catch(function (error) {
                reject(handler.manageError())
            })
        });
    }
    
    const getTasks = async () => await operation();
    return getTasks(); 
};

/**
 * Create new task
 * @param {Object}
 * @return {Object}
*/
const createTask = (data) => {

    const operationCreate = (data) => {
        return new Promise((resolve, reject) => {
            db.Task.create(data).then(function (newTask) {
                resolve(newTask);
            })
            .catch(function (error) {
                reject(handler.manageError())
            })
        });
    }
    
    const create = async () => await operationCreate(data);
    return create(); 
};

/**
 * Update task
 * @param {Object} data
 * @return {Object}
*/
const updateTask = (data) => {

    const query = {done: data.done}
    return operationDb(query, data.id, 'update')
};


 /**
 * Delete task
 * @param {Object} data
 * @return {Object}
*/
const deleteTask = (data) => {

    const query = { deleted: true }
    return operationDb(query, data.id, 'delete')
};

/**
 * Update task
 * @param {Object} query
 * @param {Number} id
 * @param {String} type
 * @return {String}
*/
const operationDb = (query, id, type) => {

    const action = async () => await operationUpdate(query, id);
    const operationUpdate = (query, id) => {
        return  new Promise((resolve, reject) => {
            db.Task.update(
                query,
                { where: {id}}
            )
            .then(function(rowsUpdate) {
                let response;
                if(rowsUpdate[0] > 0)
                    response = {
                        message: type === 'update' ? 'Tarea actualizada' : 'Tarea eliminada',
                        code: 200     
                    }
                   
                else
                    response = {
                        message: 'Tarea no encontrada en la base de datos',
                        code: 404     
                    };
                
                resolve(response);
            }).catch(function (error) {
                reject(handler.manageError())
            })
        });
    }

    return action();
}


module.exports = {
    TaskList,
    createTask,
    updateTask,
    deleteTask

}