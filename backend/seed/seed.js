const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

// Load Models
const User = require('../models/User');
const Organization = require('../models/Organization');
const Chapter = require('../models/Chapter');
const Event = require('../models/Event');
const CollabRequest = require('../models/CollabRequest');
const connectDB = require('../config/db');

dotenv.config();
connectDB();

const importData = async () => {
  try {
    // 1. Clear existing data
    await User.deleteMany();
    await Organization.deleteMany();
    await Chapter.deleteMany();
    await Event.deleteMany();
    await CollabRequest.deleteMany();

    console.log('Data Destroyed...');

    // 2. Create Users
    const salt = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash('123456', salt); // Default password

    const users = await User.insertMany([
      { username: 'admin', passwordHash: hashedPwd, role: 'hq_admin' },
      { username: 'student', passwordHash: hashedPwd, role: 'student' }
    ]);

    // 3. Create Organization
    const sweOrg = await Organization.create({
      name: 'Society of Women Engineers',
      description: 'Global organization empowering women in engineering.'
    });

    // 4. Create Chapters
    // (Based on mockChapters.js)
    const chapters = await Chapter.insertMany([
      {
        organizationId: sweOrg._id,
        schoolName: 'Washington University in St. Louis',
        city: 'St. Louis',
        state: 'MO',
        lat: 38.6488,
        lng: -90.3108,
        history: 'Founded in 2010, this chapter focuses on supporting women in engineering at WashU.'
      },
      {
        organizationId: sweOrg._id,
        schoolName: 'MIT',
        city: 'Cambridge',
        state: 'MA',
        lat: 42.3601,
        lng: -71.0942,
        history: 'One of the oldest SWE chapters, organizing annual hackathons and outreach.'
      },
      {
        organizationId: sweOrg._id,
        schoolName: 'University of Michigan',
        city: 'Ann Arbor',
        state: 'MI',
        lat: 42.2808,
        lng: -83.743,
        history: 'Active in mentorship programs and collaboration with local companies.'
      }
    ]);

    // 5. Create Events
    // (Based on mockEvents.js)
    const washUChapter = chapters[0]; // WashU
    const mitChapter = chapters[1];   // MIT

    const events = await Event.insertMany([
      {
        chapterId: washUChapter._id,
        title: 'Resume Workshop with Industry Mentors',
        description: 'Hands-on resume review and interview tips.',
        dateTime: new Date('2025-11-25T18:00:00'),
        location: 'Jubel Hall 101',
        isOpenForCollab: true
      },
      {
        chapterId: washUChapter._id,
        title: 'SWE x ACM Networking Night',
        description: 'Cross-organization networking and panel.',
        dateTime: new Date('2025-12-01T19:00:00'),
        location: 'Lopata Gallery',
        isOpenForCollab: true
      },
      {
        chapterId: mitChapter._id,
        title: 'Women in Robotics Panel',
        description: 'Talks from alumni working in robotics.',
        dateTime: new Date('2025-11-30T17:00:00'),
        location: 'MIT Building 32-155',
        isOpenForCollab: false
      }
    ]);

    // 6. Create Requests
    // (Based on mockRequests.js)
    await CollabRequest.insertMany([
      {
        eventId: events[0]._id, // Resume Workshop
        fromOrgName: 'Student Outreach',
        fromContactEmail: 'contact@gmail.com',
        message: 'We would like to sponsor this event and send a speaker.',
        status: 'pending',
        createdAt: new Date('2025-11-15T10:00:00')
      },
      {
        eventId: events[1]._id, // Networking Night
        fromOrgName: 'Local Startup Hub',
        fromContactEmail: 'events@startup.org',
        message: 'Interested in co-hosting the networking night.',
        status: 'approved',
        createdAt: new Date('2025-11-10T09:30:00')
      }
    ]);

    console.log('Data Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();