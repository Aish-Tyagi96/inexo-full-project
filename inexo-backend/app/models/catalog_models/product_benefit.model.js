module.exports = (sequelize, DataTypes) => {
  const ProductBenefit = sequelize.define(
    'catalog_product_benefits',
    {
      benefit_id: {
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
      benefit: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING(191),
        allowNull: true,
        defaultValue: null,
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
          name: 'idx_catalog_product_benefits_product_id',
          fields: ['product_id'],
        },
      ],
    },
  );

  return ProductBenefit;
};