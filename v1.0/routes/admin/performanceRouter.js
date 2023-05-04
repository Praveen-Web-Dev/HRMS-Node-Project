const express = require('express');
const router = express.Router();
const performanceController = require('../../controllers/performanceController');

router.post('/top-performers',customJWTVerifier, async (req, res, next) => {
  try {
      let result = await performanceController.performersReport(req);
      res.json(result);
  } catch (err) {
      next(err);
  }
});


router.get('/update-details',customJWTVerifier, async (req, res, next) => {
try {
    let result = await performanceController.updateDetails(req);
    res.json(result);
} catch (err) {
    next(err);
}
});


router.get('/get-companyinfo',customJWTVerifier, async (req, res, next) => {
try {
    let result = await performanceController.companyInfo(req);
    res.json(result);
} catch (err) {
    next(err);
}
});


module.exports = router;