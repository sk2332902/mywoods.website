const mongoose = require('mongoose');

const WoodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Wood name is required'],
    trim: true
  },
  typewood: {
    type: String,
    required: [true, 'Wood type is required'],
    trim: true
  },
  origin: {
    type: String,
    required: [true, 'Origin is required'],
    trim: true
  },
  color: {
    type: String,
    required: [true, 'Color is required'],
    trim: true
  },
  density: {
    type: String,
    required: [true, 'Density description is required'],
    trim: true
  },
  pricePerUnit: {
    type: Number,
    required: [true, 'Price per unit is required'],
    min: [0, 'Price must be a positive number']
  },
  moistureContent: {
    type: String,
    trim: true,
    default: '12% (Kiln-Dried)'
  },
  usage: {
    type: String,
    trim: true,
    default: 'General Joinery'
  },
  grade: {
    type: String,
    trim: true,
    default: 'Premium Grade'
  },
  stockQuantity: {
    type: Number,
    min: [0, 'Stock quantity cannot be negative'],
    default: 100
  },
  description: {
    type: String,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Wood', WoodSchema);
