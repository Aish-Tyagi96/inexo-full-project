module.exports = (sequelize, DataTypes) => {
  const NewsEvent = sequelize.define(
    'news_events',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: '',
      },
      fullDescription: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: '',
      },
      imagePath: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      imageAlt: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: '',
      },
      eventDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      readMoreHref: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: '#',
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
          name: 'idx_news_events_slug',
          fields: ['slug'],
        },
      ],
    }
  );

  return NewsEvent;
};
