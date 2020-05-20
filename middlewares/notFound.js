"use strict"

module.exports = (req, res, next) => {
    return res.status(404).send(
        {
            message : 'Not found',
            error : true
        }
    );
};