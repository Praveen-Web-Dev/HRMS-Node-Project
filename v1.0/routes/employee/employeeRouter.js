const express = require('express');
const router = express.Router();

router.use('/attendance', require('./attendanceRouter'));
router.use('/dashboard', require('./dashboardRouter'));
router.use('/leave', require('./leaveRouter'));
router.use('/timesheet', require('./timesheetRouter'));

module.exports = router;