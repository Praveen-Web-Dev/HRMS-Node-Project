const express = require('express');
const router = express.Router();
const leaveController = require('../../controllers/leaveController');

router.get('/apply-leave',customJWTVerifier, async (req, res, next) => {
    try {
        let result = await leaveController.leaveApplication(req);
        res.json(result);
    } catch (err) {
        next(err);
    }
});


router.get('/approved-applications',customJWTVerifier, async (req, res, next) => {
  try {
      let result = await leaveController.leaveApplication(req);
      res.json(result);
  } catch (err) {
      next(err);
  }
});


router.get('/rejected-applications',customJWTVerifier, async (req, res, next) => {
  try {
      let result = await leaveController.leaveApplication(req);
      res.json(result);
  } catch (err) {
      next(err);
  }
});


router.get('/pending-applications', async (req, res, next) => {
  try {
      let result = await leaveController.leaveApplication(req);
      res.json(result);
  } catch (err) {
      next(err);
  }
});



module.exports = router;