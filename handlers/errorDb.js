"use strict"
module.exports = {
	/**
	 * @method manageError
	 * @return {Object}
	*/
    manageError: function () {
		return {
            code: 500,
            message: 'Ha ocurrido un error en el servidor',
            flag: true
        }
	}
}