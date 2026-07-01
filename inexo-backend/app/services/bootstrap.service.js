const bcrypt = require('bcrypt');
const env = require('../config/env');
const db = require('../models');
const { seedCatalogData } = require('./catalog.service');
const logger = require('../utils/logger');

async function seedDefaultRoles() {
  const roleNames = env.DEFAULT_ROLES.split(',').map((value) => value.trim()).filter(Boolean);

  for (const roleName of roleNames) {
    const existingRole = await db.Role.findOne({
      where: { roleName, delete_status: 0 },
    });

    if (!existingRole) {
      await db.Role.create({ roleName });
    }
  }
}

async function seedDefaultAuthData() {
  await seedDefaultRoles();

  if (!env.SEED_DEFAULT_ADMIN) {
    return;
  }

  const adminRole = await db.Role.findOne({
    where: { roleName: 'Admin', delete_status: 0 },
  });

  if (!adminRole) {
    logger.warn('Default Admin role was not found after role seed.');
    return;
  }

  const existingAdmin = await db.AuthUser.unscoped().findOne({
    where: { email: env.DEFAULT_ADMIN_EMAIL, delete_status: 0 },
  });

  if (existingAdmin) {
    return;
  }

  const password = await bcrypt.hash(env.DEFAULT_ADMIN_PASSWORD, 12);

  await db.AuthUser.create({
    name: env.DEFAULT_ADMIN_NAME,
    email: env.DEFAULT_ADMIN_EMAIL,
    phone: env.DEFAULT_ADMIN_PHONE,
    password,
    profileImage: null,
    role_id: adminRole.role_id,
    userRole: adminRole.roleName,
  });

  logger.info({ email: env.DEFAULT_ADMIN_EMAIL }, 'Seeded default Inexo admin');
}

async function seedNewsEventsData() {
  const newsEvents = [
    {
      id: 1,
      title: 'INEXO Showcases Advanced Foundry Solutions at Industry Exhibition',
      slug: 'industry-exhibition',
      description: 'INEXO Cast Metals successfully participated in a major industry exhibition, showcasing its advanced feeding systems and innovative casting solutions.',
      fullDescription: "INEXO proudly showcased its advanced foundry solutions at a leading industry exhibition, highlighting its commitment to precision, quality, and innovation. The event provided an excellent platform to present INEXO's wide range of iron casting capabilities and engineered components, allowing visitors to experience firsthand its expertise in delivering high-performance solutions for diverse industrial applications. The display emphasized INEXO's strength in manufacturing durable, dimensionally accurate, and reliable castings, while also highlighting its advanced production processes and robust quality assurance systems. The team actively engaged with industry professionals, sharing insights into modern foundry practices and customer-focused approaches. The exhibition also enabled INEXO to strengthen relationships with existing clients, connect with new partners, and gain valuable insights into emerging market trends and evolving industry requirements. Through its participation, INEXO reinforced its position as a trusted, innovative, and forward-thinking foundry solutions provider.",
      imagePath: '/uploads/images/Foundry_Solutions.png',
      imageAlt: 'INEXO representatives at an industry exhibition',
      eventDate: '2026-07-02',
      readMoreHref: '#',
      sortOrder: 1,
    },
    {
      id: 2,
      title: 'Supporting Communities Through Social Responsibility',
      slug: 'csr-community',
      description: 'INEXO Cast Metals continues to strengthen its commitment to community development through meaningful CSR initiatives.',
      fullDescription: "INEXO Cast Metals continues to strengthen its commitment to community development through meaningful CSR initiatives. The company actively supports educational programs, healthcare drives, and community upliftment projects in the regions where it operates. By empowering local communities and fostering sustainable growth, INEXO demonstrates that corporate responsibility goes hand-in-hand with business excellence. These efforts reflect the company's core values of integrity, empathy, and social accountability, ensuring a positive impact beyond the factory floor.",
      imagePath: '/uploads/images/Social_Responsibility.png',
      imageAlt: 'INEXO team supporting a community program',
      eventDate: '2026-07-02',
      readMoreHref: '#',
      sortOrder: 2,
    },
    {
      id: 3,
      title: 'Latest Technology Innovations in Foundry Solutions',
      slug: 'tech-innovation',
      description: 'Discover how INEXO continues to push boundaries with cutting-edge technology and innovative solutions for modern foundries.',
      fullDescription: "Discover how INEXO continues to push boundaries with cutting-edge technology and innovative solutions for modern foundries. By integrating advanced simulation software, precision machining tools, and automated quality control systems, INEXO ensures every casting meets the highest standards. The company's investment in research and development has led to breakthroughs in feeding system design, material optimization, and process efficiency. These innovations enable INEXO to deliver superior products with reduced lead times, helping clients stay ahead in competitive markets.",
      imagePath: '/uploads/images/Foundry_Solutions.png',
      imageAlt: 'Innovation lab at INEXO',
      eventDate: '2026-06-28',
      readMoreHref: '#',
      sortOrder: 3,
    },
    {
      id: 4,
      title: 'Strategic Partnership Announcement',
      slug: 'partnership-announcement',
      description: 'INEXO Cast Metals announces a new strategic partnership to expand its reach and deliver enhanced solutions to global markets.',
      fullDescription: "INEXO Cast Metals announces a new strategic partnership to expand its reach and deliver enhanced solutions to global markets. This collaboration brings together complementary strengths in engineering, manufacturing, and distribution, creating new opportunities for growth and innovation. The partnership aims to accelerate product development, improve supply chain efficiency, and open doors to new industry sectors. By joining forces with a trusted global partner, INEXO is poised to enhance its service offerings and deliver even greater value to customers worldwide.",
      imagePath: '/uploads/images/Social_Responsibility.png',
      imageAlt: 'Partnership announcement event',
      eventDate: '2026-06-25',
      readMoreHref: '#',
      sortOrder: 4,
    },
  ];

  await db.sequelize.transaction(async (transaction) => {
    for (const item of newsEvents) {
      const existing = await db.NewsEvent.findByPk(item.id, { transaction });
      if (existing) {
        await existing.update(item, { transaction });
      } else {
        await db.NewsEvent.create(item, { transaction });
      }
    }
  });

  logger.info({ count: newsEvents.length }, 'Seeded default news events');
}

async function seedGalleryItemsData() {
  const galleryItems = [
    { id: 1, imagePath: '/uploads/images/Foundry_Solutions.png', altText: 'INEXO representatives at exhibition stand', sortOrder: 1 },
    { id: 2, imagePath: '/uploads/images/who-we-are-facility.png', altText: 'INEXO state-of-the-art facility', sortOrder: 2 },
    { id: 3, imagePath: '/uploads/images/certificateImage.png', altText: 'INEXO quality standards & certifications', sortOrder: 3 },
    { id: 4, imagePath: '/uploads/images/old_man.png', altText: 'Customer discussion at exhibition stand', sortOrder: 4 },
    { id: 5, imagePath: '/uploads/images/INNER HUB.png', altText: 'Inner Hub display casting', sortOrder: 5 },
    { id: 6, imagePath: '/uploads/images/Social_Responsibility.png', altText: 'INEXO supporting communities', sortOrder: 6 },
    { id: 7, imagePath: '/uploads/images/ADAPTOR.png', altText: 'Adaptor product casting', sortOrder: 7 },
    { id: 8, imagePath: '/uploads/images/BRACKET.png', altText: 'Bracket product casting', sortOrder: 8 },
    { id: 9, imagePath: '/uploads/images/YOKE.png', altText: 'Yoke product casting', sortOrder: 9 },
    { id: 10, imagePath: '/uploads/images/SWIVELLING LEVER.png', altText: 'Swivelling Lever product casting', sortOrder: 10 },
    { id: 11, imagePath: '/uploads/images/PORT BLOCK.png', altText: 'Port Block product casting', sortOrder: 11 },
    { id: 12, imagePath: '/uploads/images/Foundry_Solutions.png', altText: 'INEXO casting demonstration', sortOrder: 12 },
  ];

  await db.sequelize.transaction(async (transaction) => {
    for (const item of galleryItems) {
      const existing = await db.GalleryItem.findByPk(item.id, { transaction });
      if (existing) {
        await existing.update(item, { transaction });
      } else {
        await db.GalleryItem.create(item, { transaction });
      }
    }
  });

  logger.info({ count: galleryItems.length }, 'Seeded default gallery items');
}

async function seedJobOpeningsData() {
  const jobs = [
    {
      id: 1,
      title: 'Production Supervisor – Chennai (Plant)',
      description: 'Oversee production processes, maintain quality standards, and manage a skilled team of operators.',
      link: 'https://www.linkedin.com',
      sortOrder: 1,
    },
    {
      id: 2,
      title: 'Sales & Marketing Executive – South India Region',
      description: 'Develop and manage client relationships, support product promotion and technical sales.',
      link: 'https://www.linkedin.com',
      sortOrder: 2,
    },
  ];

  await db.sequelize.transaction(async (transaction) => {
    for (const item of jobs) {
      const existing = await db.JobOpening.findByPk(item.id, { transaction });
      if (existing) {
        await existing.update(item, { transaction });
      } else {
        await db.JobOpening.create(item, { transaction });
      }
    }
  });

  logger.info({ count: jobs.length }, 'Seeded default job openings');
}

module.exports = {
  seedCatalogData,
  seedDefaultAuthData,
  seedNewsEventsData,
  seedGalleryItemsData,
  seedJobOpeningsData,
};
