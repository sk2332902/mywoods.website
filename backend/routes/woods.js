const express = require('express');
const router = express.Router();
const Wood = require('../models/Wood');

// GET all woods
router.get('/', async (req, res, next) => {
  try {
    const woods = await Wood.find().sort({ createdAt: -1 });
    res.json(woods);
  } catch (err) {
    next(err);
  }
});

// GET wood by ID
router.get('/:id', async (req, res, next) => {
  try {
    const wood = await Wood.findById(req.params.id);
    if (!wood) {
      return res.status(404).json({ error: 'Wood entry not found' });
    }
    res.json(wood);
  } catch (err) {
    // If it's a CastError (invalid ObjectId), return 404 rather than 500
    if (err.name === 'CastError') {
      return res.status(404).json({ error: 'Wood entry not found' });
    }
    next(err);
  }
});

// POST create wood
router.post('/', async (req, res, next) => {
  try {
    const { name, typewood, origin, color, density, pricePerUnit, description, completed, moistureContent, usage, grade, stockQuantity } = req.body;

    // Manual Validation
    const errors = {};
    if (!name || name.trim() === '') errors.name = 'Name is required';
    if (!typewood || typewood.trim() === '') errors.typewood = 'Typewood is required';
    if (!origin || origin.trim() === '') errors.origin = 'Origin is required';
    if (!color || color.trim() === '') errors.color = 'Color is required';
    if (!density || density.trim() === '') errors.density = 'Density is required';
    
    if (pricePerUnit === undefined || pricePerUnit === null || pricePerUnit === '') {
      errors.pricePerUnit = 'Price per unit is required';
    } else if (isNaN(Number(pricePerUnit)) || Number(pricePerUnit) < 0) {
      errors.pricePerUnit = 'Price per unit must be a non-negative number';
    }

    if (stockQuantity !== undefined && stockQuantity !== null && stockQuantity !== '') {
      if (isNaN(Number(stockQuantity)) || Number(stockQuantity) < 0) {
        errors.stockQuantity = 'Stock quantity must be a non-negative number';
      }
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    }

    const newWood = new Wood({
      name,
      typewood,
      origin,
      color,
      density,
      pricePerUnit: Number(pricePerUnit),
      moistureContent: moistureContent || undefined,
      usage: usage || undefined,
      grade: grade || undefined,
      stockQuantity: stockQuantity !== undefined && stockQuantity !== '' ? Number(stockQuantity) : undefined,
      description,
      completed: completed === true || completed === 'true'
    });

    const savedWood = await newWood.save();
    res.status(201).json(savedWood);
  } catch (err) {
    next(err);
  }
});

// PUT update wood
router.put('/:id', async (req, res, next) => {
  try {
    const { name, typewood, origin, color, density, pricePerUnit, description, completed, moistureContent, usage, grade, stockQuantity } = req.body;

    // Manual Validation
    const errors = {};
    if (!name || name.trim() === '') errors.name = 'Name is required';
    if (!typewood || typewood.trim() === '') errors.typewood = 'Typewood is required';
    if (!origin || origin.trim() === '') errors.origin = 'Origin is required';
    if (!color || color.trim() === '') errors.color = 'Color is required';
    if (!density || density.trim() === '') errors.density = 'Density is required';
    
    if (pricePerUnit === undefined || pricePerUnit === null || pricePerUnit === '') {
      errors.pricePerUnit = 'Price per unit is required';
    } else if (isNaN(Number(pricePerUnit)) || Number(pricePerUnit) < 0) {
      errors.pricePerUnit = 'Price per unit must be a non-negative number';
    }

    if (stockQuantity !== undefined && stockQuantity !== null && stockQuantity !== '') {
      if (isNaN(Number(stockQuantity)) || Number(stockQuantity) < 0) {
        errors.stockQuantity = 'Stock quantity must be a non-negative number';
      }
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    }

    const wood = await Wood.findById(req.params.id);
    if (!wood) {
      return res.status(404).json({ error: 'Wood entry not found' });
    }

    wood.name = name;
    wood.typewood = typewood;
    wood.origin = origin;
    wood.color = color;
    wood.density = density;
    wood.pricePerUnit = Number(pricePerUnit);
    wood.moistureContent = moistureContent || wood.moistureContent;
    wood.usage = usage || wood.usage;
    wood.grade = grade || wood.grade;
    wood.stockQuantity = stockQuantity !== undefined && stockQuantity !== '' ? Number(stockQuantity) : wood.stockQuantity;
    wood.description = description;
    wood.completed = completed === true || completed === 'true';

    const updatedWood = await wood.save();
    res.json(updatedWood);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(404).json({ error: 'Wood entry not found' });
    }
    next(err);
  }
});

// DELETE wood
router.delete('/:id', async (req, res, next) => {
  try {
    const result = await Wood.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ error: 'Wood entry not found' });
    }
    res.json({ message: 'Wood entry deleted successfully' });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(404).json({ error: 'Wood entry not found' });
    }
    next(err);
  }
});

module.exports = router;
