const express = require('express');
const router = express.Router();
const dashboardController = require('../../controllers/dashboardController');

router.post('/start-timer', customJWTVerifier, async (req, res, next) => {
    try {
        let result = await dashboardController.startTimer(req);
        res.json(result);
    } catch (err) {
        next(err);
    }
});

router.post('/stop-timer', customJWTVerifier, async (req, res, next) => {
    try {
        let result = await dashboardController.stopTimer(req);
        res.json(result);
    } catch (err) {
        next(err);
    }
});

module.exports = router;