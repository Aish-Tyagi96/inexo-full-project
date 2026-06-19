module.exports = (sequelize, DataTypes) => {
  const ProductCategory = sequelize.define(
    'catalog_categories',
    {
      category_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING(191),
        allowNull: false,
        unique: true,
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
      imagePath: {
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
          name: 'idx_catalog_categories_slug',
          fields: ['slug'],
        },
      ],
    },
  );

  return ProductCategory;
};