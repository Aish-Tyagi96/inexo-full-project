const db = require('../models');
const asyncHandler = require('../utils/asyncHandler');
const fs = require('node:fs');
const path = require('node:path');

exports.getDashboardStats = asyncHandler(async (req, res) => {
  const productsCount = await db.Product.count({ where: { delete_status: 0 } });
  const usersCount = await db.AuthUser.count({ where: { delete_status: 0 } });
  const categoriesCount = await db.ProductCategory.count({ where: { delete_status: 0 } });
  
  // Count files in uploads/images directory or default to db.ProductMedia count
  let mediaCount = await db.ProductMedia.count();
  try {
    const uploadsDir = path.resolve(process.cwd(), 'uploads/images');
    if (fs.existsSync(uploadsDir)) {
      const files = fs.readdirSync(uploadsDir);
      mediaCount = files.length;
    }
  } catch (err) {
    // Fallback to DB count
  }

  res.status(200).json({
    success: true,
    data: {
      products: productsCount,
      solutions: 8, // static default
      media: mediaCount,
      users: usersCount,
      news: 16, // static default
      categories: categoriesCount,
    }
  });
});
