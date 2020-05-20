'use strict'

const request = require('supertest')
const should = require('should')
const server = require('../index')
const config = require('../config')
var token = null
var id = null

describe('POST /login', function() {
    it('Responds with json - Request without credentials', function(done) {
        request(server)
        .post('/login')
        .expect('Content-Type', /json/)
        .expect(500)
        .end(function(err, res) {
            if(res){
                res.body.should.have.property('error');
                res.body.should.have.property('message');
                done();
            }else{
                done(err)
            }
        });
    });
});

describe('POST /login', function() {
    const credentials = {user: config.defaultUser, password: config.defaultPassword}
    it('Responds with json - Request with correct credentials', function(done) {
        request(server)
        .post('/login')
        .send(credentials)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
            token = res.body.token
            if(res){
                res.body.should.have.property('token');
                res.body.should.have.property('user');
                res.body.should.have.property('message');
                done();
            }else{
                done(err)
            }
        });
    });
});

describe('POST /login', function() {
    const credentials = {user: 'ddfsdf', password: 'wetrery'}
    it('Responds with json - Request with wrong credentials', function(done) {
        request(server)
        .post('/login')
        .send(credentials)
        .expect('Content-Type', /json/)
        .expect(401)
        .end(function(err, res) {
            if(res){
                res.body.should.have.property('error');
                res.body.should.have.property('message');
                done();
            }else{
                done(err)
            }
        });
    });
});

describe('POST /tasks', function() {
    it('Responds with json', function(done) {
        request(server)
        .get('/tasks')
        .set('Authorization', 'Bearer ' + token)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
            if(res){
                should(res.body).be.a.Array()
                done();
            }else{
                done(err)
            }
        });
    });
});

describe('POST /create', function() {
    const newTask = { name : 'Nueva Tarea'}
    it('Responds with json - Request with correct properties', function(done) {
        request(server)
        .post('/create')
        .set('Authorization', 'Bearer ' + token)
        .send(newTask)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
            id = res.body.message.id
            if(res){
                res.body.should.have.property('message');
                done();
            }else{
                done(err)
            }
        });
    });
});

describe('POST /create', function() {
    it('Responds with json - Request without name property', function(done) {
        request(server)
        .post('/create')
        .set('Authorization', 'Bearer ' + token)
        .expect('Content-Type', /json/)
        .expect(500)
        .end(function(err, res) {
            if(res){
                res.body.should.have.property('error');
                res.body.should.have.property('message');
                done();
            }else{
                done(err)
            }
        });
    });
});

describe('POST /update', function() {
    const newStatus = { done : true}
    it('Responds with json - Request correct properties', function(done) {
        request(server)
        .put('/update/'+id)
        .send(newStatus)
        .set('Authorization', 'Bearer ' + token)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
            if(res){
                res.body.should.have.property('message');
                done();
            }else{
                done(err)
            }
        });
    });
});


describe('POST /update', function() {
    it('Responds with json - Request without done property', function(done) {
        request(server)
        .put('/update/'+id)
        .set('Authorization', 'Bearer ' + token)
        .expect('Content-Type', /json/)
        .expect(404)
        .end(function(err, res) {
            if(res){
                res.body.should.have.property('error');
                res.body.should.have.property('message');
                done();
            }else{
                done(err)
            }
        });
    });
});

describe('POST /delete', function() {
    it('Responds with json', function(done) {
        request(server)
        .put('/delete/'+id)
        .set('Authorization', 'Bearer ' + token)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
            if (err) return done(err)
            done();
        });
    });
});