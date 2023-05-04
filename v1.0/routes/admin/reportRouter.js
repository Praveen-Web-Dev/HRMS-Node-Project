const express = require('express');
const router = express.Router();
const reportController = require('../../controllers/reportController');

router.get('/attendance-report/:action',customJWTVerifier, async (req, res, next) => {
  try {
      let result = await reportController.attendanceReport(req);
      res.json(result);
  } catch (err) {
      next(err);
  }
});


router.get('/leave-report/:action' ,customJWTVerifier, async (req, res, next) => {
try {
    let result = await reportController.leaveReport(req);
    res.json(result);
} catch (err) {
    next(err);
}
});


router.get('/employee-timesheet/:action',customJWTVerifier, async (req, res, next) => {
try {
    let result = await reportController.employeeTimesheet(req);
    res.json(result);
} catch (err) {
    next(err);
}
});


router.get('/employee-list',customJWTVerifier, async (req, res, next) => {
  try {
      let result = await reportController.employeeList(req);
      res.json(result);
  } catch (err) {
      next(err);
  }
  });


module.exports = router;