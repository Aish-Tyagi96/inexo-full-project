const fs = require('node:fs');
const path = require('node:path');
const { Sequelize, DataTypes } = require('sequelize');
const dbConfig = require('../config/db.config');
const env = require('../config/env');
const logger = require('../utils/logger');

const sequelize =
  dbConfig.dialect === 'sqlite'
    ? new Sequelize({
        dialect: 'sqlite',
        storage: dbConfig.storage,
        logging: dbConfig.logging,
        define: dbConfig.define,
      })
    : new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Role = require('./auth_users_models/role.model')(sequelize, DataTypes);
db.AuthUser = require('./auth_users_models/auth_user.model')(sequelize, DataTypes);
db.ProductCategory = require('./catalog_models/category.model')(sequelize, DataTypes);
db.ProductSubCategory = require('./catalog_models/sub_category.model')(sequelize, DataTypes);
db.Product = require('./catalog_models/product.model')(sequelize, DataTypes);
db.ProductFeature = require('./catalog_models/product_feature.model')(sequelize, DataTypes);
db.ProductBenefit = require('./catalog_models/product_benefit.model')(sequelize, DataTypes);
db.ProductMedia = require('./catalog_models/product_media.model')(sequelize, DataTypes);
db.NewsEvent = require('./news_events_models/news_event.model')(sequelize, DataTypes);
db.GalleryItem = require('./news_events_models/gallery_item.model')(sequelize, DataTypes);

db.Role.hasMany(db.AuthUser, {
  foreignKey: 'role_id',
  as: 'authUsers',
});

db.AuthUser.belongsTo(db.Role, {
  foreignKey: 'role_id',
  as: 'role',
});

db.ProductCategory.hasMany(db.ProductSubCategory, {
  foreignKey: 'category_id',
  as: 'subCategories',
});

db.ProductSubCategory.belongsTo(db.ProductCategory, {
  foreignKey: 'category_id',
  as: 'category',
});

db.ProductCategory.hasMany(db.Product, {
  foreignKey: 'category_id',
  as: 'products',
});

db.Product.belongsTo(db.ProductCategory, {
  foreignKey: 'category_id',
  as: 'category',
});

db.ProductSubCategory.hasMany(db.Product, {
  foreignKey: 'sub_category_id',
  as: 'products',
});

db.Product.belongsTo(db.ProductSubCategory, {
  foreignKey: 'sub_category_id',
  as: 'subCategory',
});

db.Product.hasMany(db.ProductFeature, {
  foreignKey: 'product_id',
  as: 'productFeatures',
  onDelete: 'CASCADE',
});

db.ProductFeature.belongsTo(db.Product, {
  foreignKey: 'product_id',
  as: 'product',
});

db.Product.hasMany(db.ProductBenefit, {
  foreignKey: 'product_id',
  as: 'productBenefits',
  onDelete: 'CASCADE',
});

db.ProductBenefit.belongsTo(db.Product, {
  foreignKey: 'product_id',
  as: 'product',
});

db.Product.hasMany(db.ProductMedia, {
  foreignKey: 'product_id',
  as: 'productMedia',
  onDelete: 'CASCADE',
});

db.ProductMedia.belongsTo(db.Product, {
  foreignKey: 'product_id',
  as: 'product',
});

async function initializeDatabase() {
  if (env.DB_DIALECT === 'sqlite') {
    fs.mkdirSync(path.dirname(env.DB_STORAGE), { recursive: true });
  }

  await sequelize.authenticate();

  const syncOptions = env.DB_SYNC_FORCE ? { force: true } : env.DB_SYNC_ALTER ? { alter: true } : undefined;
  await sequelize.sync(syncOptions);

  logger.info({ dialect: env.DB_DIALECT }, 'Database initialized');
}

module.exports = {
  ...db,
  initializeDatabase,
};
