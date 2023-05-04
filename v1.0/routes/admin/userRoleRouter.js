const express = require('express');
const router = express.Router();
const userRoleController = require('../../controllers/userRoleController');

router.post('/create-role', async (req, res, next) => {
    try {
        let result = await userRoleController.createRole(req);
        res.json(result);
    } catch (err) {
        next(err);
    }
});

router.post('/edit-user', async (req, res, next) => {
    try {
        let result = await userRoleController.editRole(req);
        res.json(result);
    } catch (err) {
        next(err);
    }
});

router.post('/assign-privileges', async (req, res, next) => {
    try {
        let result = await userRoleController.assignPrivileges(req);
        res.json(result);
    } catch (err) {
        next(err);
    }
});

router.post('/edit-privileges', async (req, res, next) => {
    try {
        let result = await userRoleController.editedPrivileges(req);
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

 

module.exports = router;