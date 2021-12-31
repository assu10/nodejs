'use strict';

const Sequelize = require('sequelize');
const User = require('./user');
const Comment = require('./comment');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

// 시퀄라이즈 MySQL 연결 객체 생성
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config,
  );
}

// 연결 객체를 나중에 재사용하기 위함
db.sequelize = sequelize;

// db 객체에 모델을 담아두기 때문에 앞으로 db 객체를 require 해서 User, Comment 모델에 접근 가능
db.User = User;
db.Comment = Comment;

// 각 모델의 static.init 메서드 호출, 이게 실행되어야 테이블에 모델로 연결
User.init(sequelize);
Comment.init(sequelize);

// 다른 테이블과의 관계 연결
User.associate(db);
Comment.associate(db);

module.exports = db;
