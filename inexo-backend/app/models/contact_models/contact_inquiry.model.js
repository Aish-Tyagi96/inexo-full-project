module.exports = (sequelize, DataTypes) => {
  const ContactInquiry = sequelize.define(
    'ContactInquiry',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      organizationName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      inquiryType: {
        type: DataTypes.STRING, // "careers" or "sales"
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      subCategory: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      product: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      preferredDate: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      preferredTime: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      mobileNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      tableName: 'contact_inquiries',
      timestamps: true,
    }
  );

  return ContactInquiry;
};
