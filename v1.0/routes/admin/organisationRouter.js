const express = require('express');
const router = express.Router();
const organisationController = require('../../controllers/organisationController');

router.post('/company-details',customJWTVerifier, async (req, res, next) => {
    try {
        let result = await organisationController.companyDetails(req);
        res.json(result);
    } catch (err) {
        next(err);
    }
});


router.post('/update-details',customJWTVerifier, async (req, res, next) => {
  try {
      let result = await organisationController.updateDetails(req);
      res.json(result);
  } catch (err) {
      next(err);
  }
});


router.get('/get-companyinfo',customJWTVerifier, async (req, res, next) => {
  try {
      let result = await organisationController.companyInfo(req);
      res.json(result);
  } catch (err) {
      next(err);
  }
});


module.exports = router;