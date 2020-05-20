"use strict"
const config = require('../config'),
	jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
	
    if (req.headers['authorization']) {
		const token = req.headers['authorization'].replace('Bearer ','')
		jwt.verify(token, config.secretToken, (err, decoded) => {      
			if (err) {
				return res.status(401).json(
					{
						message: 'Acceso no autorizado',
						error: true
					}
				);    
			} else {
			req.decoded = decoded 
			next()
			}
      });
    } else {
		res.status(403).send(
			{ 
				message: 'Token no suministrado',
				error: true
			}
		);
    }
};