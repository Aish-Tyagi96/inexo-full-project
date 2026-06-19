module.exports = (sequelize, DataTypes) => {
  const ProductMedia = sequelize.define(
    'catalog_product_media',
    {
      media_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'catalog_products',
          key: 'product_id',
        },
      },
      mediaType: {
        type: DataTypes.ENUM('image', 'video', 'audio', 'pdf'),
        allowNull: false,
        defaultValue: 'image',
      },
      filePath: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      altText: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      sortOrder: {
        type: DataTypes.INTEGER,
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
    },
    {
      timestamps: true,
      indexes: [
        {
          name: 'idx_catalog_product_media_product_id',
          fields: ['product_id'],
        },
      ],
    },
  );

  return ProductMedia;
};