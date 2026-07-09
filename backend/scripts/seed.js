const mongoose = require('mongoose');
const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');
const Wood = require('../models/Wood');
require('dotenv').config();

const seedWoods = [
  {
    name: 'Burmese Teak',
    typewood: 'Hardwood',
    origin: 'Myanmar (Burma)',
    color: 'Golden Brown',
    density: '680 kg/m³',
    pricePerUnit: 35000,
    moistureContent: '10% (Kiln-Dried)',
    usage: 'Shipbuilding, Luxury Outdoor Furniture, Decks',
    grade: 'FEQ (First European Quality)',
    stockQuantity: 450,
    description: 'Renowned for its exceptional durability, weather resistance, and high natural oil content. Ideal for outdoor furniture and boat decks.',
    completed: true
  },
  {
    name: 'Honduran Mahogany',
    typewood: 'Hardwood',
    origin: 'Central America',
    color: 'Reddish Brown',
    density: '590 kg/m³',
    pricePerUnit: 28000,
    moistureContent: '12% (Kiln-Dried)',
    usage: 'Musical Instruments, High-End Cabinetry, Veneer',
    grade: 'FAS (First and Seconds)',
    stockQuantity: 320,
    description: 'Highly prized for its fine, even grain, beautiful lustre, and excellent stability. Commonly used in musical instruments and premium cabinetry.',
    completed: true
  },
  {
    name: 'American White Oak',
    typewood: 'Hardwood',
    origin: 'North America',
    color: 'Light Tan to Pale Yellow',
    density: '750 kg/m³',
    pricePerUnit: 18000,
    moistureContent: '11% (Kiln-Dried)',
    usage: 'Flooring, Cooperage (Barrels), Furniture, Joinery',
    grade: 'FAS (First and Seconds)',
    stockQuantity: 850,
    description: 'Strong, durable, and highly rot-resistant. Features a distinctive grain pattern. Widely used for flooring, barrels, and interior joinery.',
    completed: false
  },
  {
    name: 'Indian Rosewood (Sisu)',
    typewood: 'Hardwood',
    origin: 'India',
    color: 'Dark Golden Brown to Deep Purple',
    density: '850 kg/m³',
    pricePerUnit: 48000,
    moistureContent: '13% (Kiln-Dried)',
    usage: 'Guitars, Luxury Carvings, Premium Veneers',
    grade: 'A Grade',
    stockQuantity: 150,
    description: 'Extremely dense, heavy, and hard wood with a rich grain pattern. Extensively used for musical instruments (guitars) and luxury furniture.',
    completed: true
  },
  {
    name: 'Douglas Fir',
    typewood: 'Softwood',
    origin: 'North America',
    color: 'Light Brown with Red/Yellow hints',
    density: '530 kg/m³',
    pricePerUnit: 8500,
    moistureContent: '15% (Air-Dried)',
    usage: 'Heavy Construction, Structural Beams, Plywood',
    grade: '#1 Structural',
    stockQuantity: 1200,
    description: 'One of the strongest softwoods available. Features good workability and straight grain. Primary use is structural framing, beams, and veneers.',
    completed: false
  }
];

const seedDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mywoods';
    console.log('Connecting to MongoDB for seeding...', mongoUri);
    await mongoose.connect(mongoUri);

    console.log('Clearing existing wood data...');
    await Wood.deleteMany({});

    console.log('Inserting seed wood records...');
    await Wood.insertMany(seedWoods);

    console.log('Database successfully seeded!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('DB connection closed.');
  }
};

// Check if run directly from CLI
if (require.main === module) {
  seedDB().then(() => process.exit(0)).catch(() => process.exit(1));
}

module.exports = { seedWoods, seedDB };
