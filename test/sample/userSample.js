const User = require('../../models/User');
const passwordsUtil = require('../../utils/PasswordsUtil');
const getToken = require('../helper/getToken');

function userFactory(permission, level) {
  return new User({
    name: `${permission} ${level}`,
    email: `${level}@${permission}.com`,
    password: passwordsUtil.hashed(`${permission}_${level}`),
    permissions: [`${permission}:${level}`]
  });
}

function generateToken(permission, level) {
  return new Promise((resolve, reject) => {
    getToken({
      email: `${level}@${permission}.com`,
      password: `${permission}_${level}`
    }).then(token => resolve(token));
  })
}

module.exports = {
  createUsers(permission) {
    return new Promise((resolve, reject) => {
      User.insertMany([
        userFactory(permission, 'create'),
        userFactory(permission, 'read'),
        userFactory(permission, 'update'),
        userFactory(permission, 'delete'),
        userFactory(permission, 'none'),
      ], (err, saved) => {
        if(err) reject(err);
        resolve(saved);
      });
    });
  },

  getToken(permission, level) {
    return new Promise((resolve, reject) =>
      generateToken(permission, level)
        .then(token => resolve(token))
        .catch(err => reject(err))
    );
  }
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