const express = require('express');
const router = express.Router();
const timesheetController = require('../../controllers/timesheetController');


router.post('/timesheet-entry',customJWTVerifier, async (req, res, next) => {
  try {
    let result = await timesheetController.timesheetEntry(req);
    res.json(result);
  } catch (err) {
      next(err);
  }
});


router.get('/my-timesheet/:action',customJWTVerifier, async (req, res, next) => {
  try {
    let result = await timesheetController.getTimesheet(req);
    res.json(result);
  } catch (err) {
      next(err);
  }
});


module.exports = router;