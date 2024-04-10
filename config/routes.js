const express = require('express');
const router = express.Router();
const employeesController = require('../controller/employeesController');

router.get('/employees', employeesController.getAllEmployees);
router.get('/employees/oldest', employeesController.getOldest);
router.post('/employees', employeesController.doList);
router.get('/employees/:name', employeesController.getName);

module.exports = router;