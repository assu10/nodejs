const Sequelize = require('sequelize');

module.exports = class Post extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        content: {
          type: Sequelize.STRING(140),
          allowNull: false,
        },
        img: {
          type: Sequelize.STRING(200),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: false,
        modelName: 'Post',
        tableName: 'posts',
        paranoid: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      },
    );
  }

  static associate(db) {
    // foreign key 를 지정하지 않았으므로 "모델명+기본키" 인 UserId 로 FK 컬럼 생성
    db.Post.belongsTo(db.User);

    db.Post.belongsToMany(db.Hashtag, { through: 'postHashtag' });
  }
};
