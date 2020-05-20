"use strict"
const fs = require("fs")
const path = require("path")

module.exports = function() {
	
    let middlewares = {};
    const loadMiddleware = (modulePath) => {
        const stat = fs.lstatSync(modulePath)
        if (stat.isDirectory()) {
            const files = fs.readdirSync(modulePath)
            const fileListLen = files.length
            for (let i = 0; i < fileListLen; i++) {
                const file = path.join(modulePath, files[i])
                loadMiddleware(file);
            }

        } else {

            if ((modulePath.indexOf(".") !== 0) && (modulePath.indexOf("index.js") < 0)) {
                const middleware = require(modulePath)
                let modelName = path.basename(modulePath)
                modelName = modelName.replace(".js", "")
                middlewares[modelName] = middleware
            }
        }
    };

    loadMiddleware(__dirname)
    return middlewares
};