const Sequelize = require('sequelize');

module.exports = class Comment extends Sequelize.Model {
  // 테이블에 대한 설정
  static init(sequelize) {
    // 테이블 컬럼에 대한 설정
    return super.init(
      {
        comment: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: true,
          defaultValue: Sequelize.NOW,
        },
      },
      // 테이블 자체에 대한 설정
      {
        sequelize,
        timestamps: false,
        modelName: 'Comment',
        tableName: 'comments',
        paranoid: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      },
    );
  }
  // 다른 모델과의 관계, commenter 라는 FK 컬럼 생성
  // foreignKey 를 설정하지 않으면 UserId (모델명+기본키) 로 FK 컬럼 생성
  static associate(db) {
    db.Comment.belongsTo(db.User, { foreignKey: 'commenter', targetKey: 'id' });
  }
};
