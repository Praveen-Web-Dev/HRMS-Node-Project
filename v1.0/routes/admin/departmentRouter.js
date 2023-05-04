const express = require('express');
const router = express.Router();
const departmentController = require('../../controllers/departmentController');


router.post('/add-department',customJWTVerifier, async (req, res, next) => {
  try {
      let result = await departmentController.addDepartment(req);
      res.json(result);
  } catch (err) {
      next(err);
  }
});


router.get('/get-details',customJWTVerifier, async (req, res, next) => {
try {
    let result = await departmentController.departmentDetails(req);
    res.json(result);
} catch (err) {
    next(err);
}
});


module.exports = router;