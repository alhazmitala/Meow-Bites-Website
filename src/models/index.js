const User     = require('./user');
const Product  = require('./product');
const Feedback = require('./feedback');
const Support  = require('./support');

// ---------- Associations -----------------
User.hasMany(Feedback,  { foreignKey: 'userId',   onDelete: 'CASCADE' });
Feedback.belongsTo(User, { foreignKey: 'userId'   });

Product.hasMany(Feedback, { foreignKey: 'productId', onDelete: 'CASCADE' });
Feedback.belongsTo(Product,{ foreignKey: 'productId'});

User.hasMany(Support,  { foreignKey: 'userId', onDelete: 'CASCADE' });
Support.belongsTo(User,{ foreignKey: 'userId' });

// Export everything from one place
module.exports = {
  User,
  Product,
  Feedback,
  Support,
};
