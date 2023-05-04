const express = require('express');
const router = express.Router();

router.use('/admin', require('./admin/adminRouter'));
router.use('/employee', require('./employee/employeeRouter'));

module.exports = router;