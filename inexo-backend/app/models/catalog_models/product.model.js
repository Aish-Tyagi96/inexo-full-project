module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'catalog_products',
    {
      product_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'catalog_categories',
          key: 'category_id',
        },
      },
      sub_category_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'catalog_sub_categories',
          key: 'sub_category_id',
        },
      },
      name: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING(191),
        allowNull: false,
        unique: true,
      },
      shortDescription: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: '',
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: '',
      },
      cardTitle: {
        type: DataTypes.STRING(191),
        allowNull: false,
        defaultValue: '',
      },
      cardDescription: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: '',
      },
      thumbnailPath: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      carouselImagePath: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      carouselText: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: '',
      },
      specifications: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: {},
      },
      relatedProductIds: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: [],
      },
      sortOrder: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      delete_status: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },
    },
    {
      timestamps: true,
      indexes: [
        {
          name: 'idx_catalog_products_slug',
          fields: ['slug'],
        },
        {
          name: 'idx_catalog_products_category_id',
          fields: ['category_id'],
        },
        {
          name: 'idx_catalog_products_sub_category_id',
          fields: ['sub_category_id'],
        },
      ],
    },
  );

  return Product;
};