const express = require('express');
const router = express.Router();
const dashboardController = require('../../controllers/dashboardController');

router.get('/find-holidays/:year', customJWTVerifier, async (req, res, next) => {
  try {
      let result = await dashboardController.findHolidays(req);
      res.json(result);
  } catch (err) {
      next(err);
  }
});

router.post('/update-holidays', customJWTVerifier, async (req, res, next) => {
  try {
      let result = await dashboardController.updateHolidays(req);
      res.json(result);
  } catch (err) {
      next(err);
  }
});


module.exports = router;