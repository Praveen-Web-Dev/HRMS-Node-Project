const express = require('express');
const router = express.Router();
const attendanceController = require('../../controllers/attendanceController');

router.post('/mark-attendance', customJWTVerifier, async (req, res, next) => {
    try {
        let result = await attendanceController.markAttendance(req);
        res.json(result);
    } catch (err) {
        next(err);
    }
});

router.get('/holidays/:year', customJWTVerifier, async (req, res, next) => {
    try {
        let result = await attendanceController.fetchHolidays(req);
        res.json(result);
    } catch (err) {
        next(err);
    }
});

router.get('/get-attendance/:action',customJWTVerifier, async (req, res, next) => {
    try {
        let result = await attendanceController.getattendanceData(req);
        res.json(result);
    } catch (err) {
        next(err);
    }
});


module.exports = router;