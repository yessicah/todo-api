"use strict"
const jwt = require('jsonwebtoken'),
    config = require('../config'),
    Tasks = require('../controllers')().TaskController

/**
 * @method getTasks
 * @param {Object} req
 * @param {Object} res
 * @return {Object}
*/
const getTasks = (req, res) => {

    Tasks.TaskList().then(response => {
        res.status(200).send(response);
    }).catch((err) => {
        return res.status(err.code).send({
            message: err.message,
            error: err.flag
        })
    })
}

/**
 * @method createTask
 * @param {Object} req
 * @param {Object} res
 * @return {Object}
*/
const createTask = (req, res) => {

    if(!req.body.name) {
        return res.status(500).send({
            message: "Nombre de la tarea no suministrada",
            error: true
        });
    }

    const data = {
        name : req.body.name
    }

    Tasks.createTask(data).then(response => {
        let msg = {
            message : response
        }
        res.status(200).send(msg);
    }).catch((err) => {
        return res.status(err.code).send({
            message: err.message,
            error: err.flag
        })
    })

}

/**
 * @method updateTask
 * @param {Object} req
 * @param {Object} res
 * @return {Object}
*/
const updateTask = (req, res) => {

    if(!req.body.done) {
        return res.status(500).send({
            message: "Nuevo status no suministrado",
            error: true
        });
    }
 
    const data = {
        id : req.params.id,
        done : req.body.done
    }
 
    Tasks.updateTask(data).then(response => {
        let msg = {
            message : response.message
        }
        res.status(response.code).send(msg)
    }).catch((err) => {
        return res.status(err.code).send({
            message: err.message,
            error: err.flag
        })
    })

}

/**
 * @method deleteTask
 * @param {Object} req
 * @param {Object} res
 * @return {Object}
*/
const deleteTask = (req, res) => {

    if(!req.params.id) {
        return res.status(500).send({
            error: "Tarea a eliminar no suministrada"
        });
    }

    const data = {
        id : req.params.id,
        deleted : true
    }

    Tasks.deleteTask(data).then(response => {
        let msg = {
            message : response.message
        }
        res.status(200).send(msg)
    }).catch((err) => {
        return res.status(400).send({
            error: err
        })
    })
}

/**
 * @method login
 * @param {Object} req
 * @param {Object} res
 * @return {Object}
*/
const login = (req, res) => {

    if(!req.body.user || !req.body.password) {
        return res.status(500).send({
            message: "Usuario o contraseña no suministrados",
            error: true
        });
    }

    if(req.body.user === config.defaultUser && req.body.password === config.defaultPassword) {
        const payload = {
            check:  true
        };
        const token = jwt.sign(payload, config.secretToken, {
            expiresIn: config.tokenExpire,
            algorithm: 'HS512'
        });
        res.status(200).json({
            message: `Bienvenido ${config.user}`,
            user : {name : config.user},
            token: token
        });
    } else {
        res.status(401).json({ 
            message: "Usuario o contraseña inválidos",
            error: true

        })
    }
}

module.exports = {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
    login
}