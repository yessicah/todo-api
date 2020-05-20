const express = require('express'),
    cors = require('cors'),
    app = express(),
    bodyParser = require('body-parser'),
    helmet = require("helmet"),
    config = require('./config'),
    routes = require('./routes/routes'),
    handlers = require('./handlers')().general,
    helpers = require('./helpers'),
    logger = helpers().logger,
    secureRoutes = helpers().secureRoutes,
    middlewares = require('./middlewares')(),
    notFound = middlewares.notFound,
    verifyToken = middlewares.VerifyToken

app.use(cors())
app.use(helmet())
app.use(secureRoutes.init(verifyToken))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.post(routes.login, handlers.login)
app.get(routes.getTasks, handlers.getTasks);
app.post(routes.create, handlers.createTask);
app.put(routes.update, handlers.updateTask);
app.put(routes.delete, handlers.deleteTask); 
app.use(notFound)

const expressServer = app.listen(config.PORT, () => {
    logger.log(`Api Node ejecutandose en el puerto ${config.PORT}`)
});


module.exports = expressServer;


