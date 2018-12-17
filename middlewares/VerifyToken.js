const jwt = require('jsonwebtoken');
const config = require('../config/config');

function VerifyToken(req, res, next) {
  const token = req.headers['x-access-token'];
  if(! token) return res.status(403).send({ auth: false, errors: 'Token not provided.'});

  jwt.verify(token, config.secret, function(err, decoded) {
    if(err) return res.status(500).send({ auth: false, errors: 'Invalid token.' });

    req.user = {
      id: decoded.id,
      permissions: decoded.permissions
    }
    
    next();
  });
}

module.exports = VerifyToken;