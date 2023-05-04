const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');

router.post('/login', async (req, res, next) => {
    try {
        let result = await userController.loginUser(req);
        res.json(result);
    } catch (err) {
        next(err);
    }
});

router.post('/create-user', async (req, res, next) => {
    try {
        let result = await userController.createNewAccount(req);
        res.json(result);
    } catch (err) {
        next(err);
    }
});

router.post('/update-user', async (req, res, next) => {
    try {
        let result = await userController.updateUser(req);
        res.json(result);
    } catch (err) {
        next(err);
    }
});

router.get('/delete-user/:id', async (req, res, next) => {
    try {
        let result = await userController.deleteUser(req);
        res.json(result);
    } catch (err) {
        next(err);
    }
});

router.get('/get-user/:id', async (req, res, next) => {
    try {
        let result = await userController.getUsers(req);
        res.json(result);
    } catch (err) {
        next(err);
    }
});

router.get('/get-users/:action', async (req, res, next) => {
    try {
        let result = await userController.getUsers(req);
        res.json(result);
    } catch (err) {
        next(err);
    }
});

 router.post('/update-password', async (req, res, next) => {
        try {
            let result = await userController.updatePassword(req);
            res.json(result);
        } catch (err) {
            next(err);
        }
    });
    

module.exports = router;