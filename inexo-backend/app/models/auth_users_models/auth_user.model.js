module.exports = (sequelize, DataTypes) => {
  const AuthUser = sequelize.define(
    'auth_users',
    {
      user_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING(150),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      email: {
        type: DataTypes.STRING(191),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
          notEmpty: true,
        },
      },
      phone: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      profileImage: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'roles',
          key: 'role_id',
        },
      },
      userRole: {
        type: DataTypes.STRING(100),
        allowNull: false,
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
          name: 'idx_auth_users_email',
          fields: ['email'],
        },
        {
          name: 'idx_auth_users_phone',
          fields: ['phone'],
        },
        {
          name: 'idx_auth_users_role_id',
          fields: ['role_id'],
        },
      ],
      defaultScope: {
        attributes: { exclude: ['password'] },
      },
      scopes: {
        withPassword: {
          attributes: { include: ['password'] },
        },
      },
    },
  );

  return AuthUser;
};
