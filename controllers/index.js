"use strict"
const fs = require("fs")
const path = require("path")

module.exports = function() {
	
    let controllers = {};
    const loadController = (modulePath) => {
        const stat = fs.lstatSync(modulePath)
        if (stat.isDirectory()) {
            const files = fs.readdirSync(modulePath)
            const fileListLen = files.length
            for (let i = 0; i < fileListLen; i++) {
                const file = path.join(modulePath, files[i])
                loadController(file);
            }

        } else {

            if ((modulePath.indexOf(".") !== 0) && (modulePath.indexOf("index.js") < 0)) {
                const controller = require(modulePath)
                let modelName = path.basename(modulePath)
                modelName = modelName.replace(".js", "")
                controllers[modelName] = controller
            }
        }
    };

    loadController(__dirname)
    return controllers
};