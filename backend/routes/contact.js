const express = require('express');
const router = express.Router();
const ContactMessage = require('../models/ContactMessage');

// POST submit contact message
router.post('/', async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    const errors = {};
    if (!name || name.trim() === '') errors.name = 'Name is required';
    if (!email || email.trim() === '') {
      errors.email = 'Email is required';
    } else if (!/.+\@.+\..+/.test(email)) {
      errors.email = 'Please provide a valid email address';
    }
    if (!subject || subject.trim() === '') errors.subject = 'Subject is required';
    if (!message || message.trim() === '') errors.message = 'Message is required';

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    }

    const newMessage = new ContactMessage({
      name,
      email,
      subject,
      message
    });

    const savedMessage = await newMessage.save();
    res.status(201).json({ message: 'Contact message submitted successfully', data: savedMessage });
  } catch (err) {
    next(err);
  }
});

// GET all contact messages (optional, to view messages in CMS or terminal)
router.get('/', async (req, res, next) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
