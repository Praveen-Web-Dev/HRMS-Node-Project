const express = require('express');
const router = express.Router();
const leaveController = require('../../controllers/leaveController');


router.post('/apply-leave',customJWTVerifier, async (req, res, next) => {
    try {
        let result = await leaveController.leaveApplication(req);
        res.json(result);
    } catch (err) {
        next(err);
    }
});


router.get('/my-leaveList/:action',customJWTVerifier, async (req, res, next) => {
    try {
        let result = await leaveController.leaveList(req);
        res.json(result);
    } catch (err) {
        next(err);
    }
});


router.post('/update-leave',customJWTVerifier, async (req, res, next) => {
    try {
        let result = await leaveController.updateLeave(req);
        res.json(result);
    } catch (err) {
        next(err);
    }
});


router.post('/delete-leave',customJWTVerifier, async (req, res, next) => {
    try {
        let result = await leaveController.deleteLeave(req);
        res.json(result);
    } catch (err) {
        next(err);
    }
});


module.exports = router;