"use strict"
const config = require("../config"),
	bunyan = require("bunyan"),
	logger = bunyan.createLogger({
		name: config.apiName,
		streams: [{ stream: process.stdout }],
		serializers: bunyan.stdSerializers
	})

module.exports = {
	/**
	 * @method info
	 * @param  {String} logMessage Info message
	 */
	info: function (logMessage) {
		logger.info(logMessage)
	},
	/**
	 * @method log
	 * @param  {[type]} logMessage General message
	 */
	log: function (logMessage) {
		logger.info(logMessage)
	},
	/**
	 * @method error
	 * @param  {String} errorLog Error message
	 */
	error: function (errorLog) {
		logger.error(errorLog)
	},
};
