const { ObjectID } = require("mongodb");
const reportmodel = require("../../models/reportModel");
const attendanceController = require("./attendanceController");
const leaveController = require("./leaveController")
const timesheetController = require("./timesheetController")
const userController = require('./userController')

class reportController {
	constructor() { }

	attendanceReport(req) {
		return new Promise(async function (resolve, reject) {
			try {
				let query = {
					$and: [
						{
							$or: [
								{
									emp_id: req.body.emp_id
								},
								{
									emp_department: req.body.emp_department,
								},
								{
									emp_first_name: req.body.emp_first_name,
								}
							]
						},
						await attendanceController.getattendanceData(req)
					]
				}
				let response = await reportmodel.attendanceList(query);
				resolve(response);
			} catch (error) {
				reject(error);
			}
		})
	}

	leaveReport(req) {
		return new Promise(async function (resolve, reject) {
			try {
				let query = {
					$and: [
						{
							$or: [
								{
									emp_id: req.body.emp_id
								},
								{
									emp_department: req.body.emp_department,
								},
								{
									emp_first_name: req.body.emp_first_name,
								}
							]
						},
						await leaveController.leaveList(req)
					]
				}
				let response = await reportmodel.leaveList(query);
				resolve(response);
			} catch (error) {
				reject(error);
			}
		})
	}

	employeeTimesheet(req) {
		return new Promise(async function (resolve, reject) {
			try {
				let query = {
					$or: [
						{
							emp_id: req.body.emp_id
						},
						{
							emp_department: req.body.emp_department,
						},
						{
							emp_first_name: req.body.emp_first_name,
						},
						await timesheetController.getTimesheet(req)
					],
				}
				let response = await reportmodel.timesheetList(query);
				resolve(response);
			} catch (error) {
				reject(error);
			}
		})
	}

	employeedata(req) {
		return new Promise(async function (resolve, reject) {
			try {
				let query = {
					$or: [
						{
							emp_id: req.body.emp_id
						},
						{
							emp_department: req.body.emp_department,
						},
						{
							emp_first_name: req.body.emp_first_name,
						},
						await userController.getUsers(req)
					],
				}
				let response = await reportmodel.employeeList(query);
				resolve(response);
			} catch (error) {
				reject(error);
			}
		})
	}


}

module.exports = new reportController()