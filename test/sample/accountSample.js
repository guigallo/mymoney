const User = require('../../models/User');
const passwordsUtil = require('../../utils/PasswordsUtil');
const getToken = require('../helper/getToken');

function createUser(permission, level) {
  return new User({
    name: `${permission} ${level}`,
    email: `${level}@${permission}.com`,
    password: passwordsUtil.hashed(`${permission}_${level}`),
    permissions: [`${permission}:${level}`]
  });
}

module.exports = {
  createUsers() {
    return new Promise((resolve, reject) => {
      User.insertMany([
        createUser('account', 'create'),
        createUser('account', 'read'),
        createUser('account', 'update'),
        createUser('account', 'delete'),
        createUser('account', 'none'),
      ], (err, saved) => {
        if(err) reject(err);
        resolve(saved);
      });
    });
  },

  getToken(level) {
    return new Promise((resolve, reject) => {
      generateToken('account', level)
        .then(token => resolve(token))
        .catch(err => reject(err));
    });
  }
}

function generateToken(permission, level) {
  return new Promise((resolve, reject) => {
    getToken({
      email: `${level}@${permission}.com`,
      password: `${permission}_${level}`
    }).then(token => resolve(token));
  })
}

/*
const permissionLevels = [
  { permission: 'account', level: 'create' },
  { permission: 'account', level: 'read' },
  { permission: 'account', level: 'update' },
  { permission: 'account', level: 'delete' },
  { permission: 'account', level: 'none' },
]
*/