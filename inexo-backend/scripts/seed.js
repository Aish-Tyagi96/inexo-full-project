const { initializeDatabase } = require('../app/models');
const { seedCatalogData, seedDefaultAuthData, seedNewsEventsData, seedGalleryItemsData } = require('../app/services/bootstrap.service');
const logger = require('../app/utils/logger');

async function runSeed() {
  try {
    logger.info('Starting manual database seeding...');
    await initializeDatabase();
    
    logger.info('Seeding default authentication data (roles and admin user)...');
    await seedDefaultAuthData();
    
    logger.info('Seeding product catalog data...');
    await seedCatalogData();

    logger.info('Seeding news events data...');
    await seedNewsEventsData();

    logger.info('Seeding gallery items data...');
    await seedGalleryItemsData();
    
    logger.info('Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    logger.error({ error }, 'Database seeding failed');
    process.exit(1);
  }
}

runSeed();
