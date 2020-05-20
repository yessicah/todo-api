"use strict"
module.exports = {
	/**
	 * @method init
	 * @param  {Function}
	*/
    init: function (fn) {
        return function(req, res, next) {
            if (req.path === '/login' && req.method === 'POST') {
                next();
            } else {
                fn(req, res, next)
            }
        }
    }

 

}