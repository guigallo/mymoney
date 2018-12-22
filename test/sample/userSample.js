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
    const users = [
      userFactory(permission, 'create'),
      userFactory(permission, 'read'),
      userFactory(permission, 'update'),
      userFactory(permission, 'delete'),
      userFactory(permission, 'none'),
    ];

    return new Promise((resolve, reject) => {
      User.insertMany(users, (err, saved) => {
        if(err) reject(err);
        resolve(saved);
      });
    });
  },

  async getTokens(permission) {
    let levels = ['create', 'read', 'update', 'delete', 'none'];
    let tokens = {
      create: '',
      read:'', 
      update: '',
      delete: '',
      none: ''
    };

    return new Promise(resolve => {
      levels.forEach(async (level, index) => {
        tokens[level] = await this.getToken(permission, level);
        
        if(index === levels.length -1)
          resolve(tokens);
      });
    })
  },

  getToken(permission, level) {
    return new Promise((resolve, reject) =>
      generateToken(permission, level)
        .then(token => resolve(token))
        .catch(err => reject(err))
    );
  },

  deleteUsers() {
    return new Promise(resolve => 
      User.deleteMany({}, () => resolve())
    );
  }
}