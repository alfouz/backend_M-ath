/**
 * Express Router configuration
 */
const express = require('express');
const router = express.Router();

/* API routes */
router.use('/course', require('./courseRoutes'));
router.use('/lesson', require('./lessonRoutes'));
router.use('/task', require('./taskRoutes'));
router.use('/taskoption', require('./taskOptionRoutes'));
router.use('/user', require('./userRoutes'));
router.use('/result', require('./resultuserlessonRoutes'));

module.exports = router;