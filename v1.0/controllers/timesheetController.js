const { ObjectID } = require("mongodb");
const moment = require('moment');
const timesheetmodel = require("../../models/timesheetModel");

class timesheetController {
	constructor() { }

	timesheetEntry(req) {
		return new Promise(async function (resolve, reject) {
			try {
				let request = req.body;
				//Checking Mandatory fields
				if (!request.date) {
					return resolve({
						success: false,
						error: "Date is Mandatory field!"
					});
				} else if (!request.fromTime) {
					return resolve({
						success: false,
						error: "from_Time is Mandatory field!"
					});
				} else if (!request.toTime) {
					return resolve({
						success: false,
						error: "to_Time is Mandatory field!"
					});

				} else if (!request.workDescription) {
					return resolve({
						success: false,
						error: "workDescription is Mandatory field!"
					});
				} else if (!request.remarks) {
					return resolve({
						success: false,
						error: "remarks is Mandatory field!"
					});
				}

				let formats = ["YYYY-MM-DD HH:mm:ss", "YYYY-MM-DD HH:mm"];
				if (!moment(`${request.date} ${request.from_Time}`, formats, true).isValid() || !moment(`${request.date} ${request.to_Time}`, formats, true).isValid()) {
					return resolve({
						success: false,
						error: "Date & Time Format is Invalid. Please follow the Date format as 'YYYY-MM-DD "
					});
				}

				//Preparing the payload to insert 
				let payload = {
					user: {
						_id: req.user["_id"],
						emp_id: req.user["empId"],
						emp_first_name: req.user["empFirstName"],
						emp_last_name: req.user["empLastName"],
						emp_email: req.user["empEmail"],
						emp_department: req.user["empDepartment"],
						emp_designation: req.user["empDesignation"],
						role: req.user["role"]
					},
					sheetEntry: {
						date: request.date,
						fromTime: request.fromTime,
						toTime: request.toTime,
						workDescription: request.workDescription,
						remark: request.remarks,
					},
					my_Timesheet: {
						date: request.date,
						fromTime: request.fromTime,
						toTime: request.toTime,
						workDescription: request.workDescription,
						remark: request.remarks,
						status: request.status
					}
				}
				let response = await timesheetmodel.submitTask(payload);
				resolve(response);
			} catch (error) {
				reject(error);
			}
		})
	}
	getTimesheet(req) {
		let that = this;
		return new Promise(async function (resolve, reject) {
			try {
				let action = req.params.action.toLowerCase();

				if (action == "daily") {
					let query = {
						"myTimesheet.date": new Date().toISOString().slice(0, 10)
					}
					let response = await timesheetmodel.findTask(query)
					resolve(response)
				}
				else if (action == "weekly") {
					let curr = new Date
					let week = []

					for (let i = 1; i <= 7; i++) {
						let first = curr.getDate() - curr.getDay() + i;
						let day = new Date(curr.setDate(first)).toISOString().slice(0, 10);
						week.push(day);
					}

					let query = {
						"myTimesheet.date": {
							$in: week
						}
					}
					let response = await timesheetmodel.findTask(query)
					resolve(response)
				}
				else if (action == "monthly") {
					let currentMonthDates = that.getAllDaysInMonth()

					let query = {
						"myTimesheet.date": {
							$in: currentMonthDates
						}
					}
					let response = await timesheetmodel.findTask(query)
					resolve(response)
				} else if (action == "custom") {
					let customMonthDates = that.getAllDaysInMonth(req.body.startDate, req.body.endDate)

					let query = {
						"myTimesheet.date": {
							$in: customMonthDates
						}
					}
					let response = await timesheetmodel.findTask(query)
					resolve(response)
				}
				else {
					return resolve({
						success: false,
						error: "Invalid Action"
					})
				}

			} catch (error) {
				reject(error);
			}
		})
	}
	getAllDaysInMonth() {
		let dates = [];
		let date = new Date();
		let firstDay = new Date(date.getFullYear(), date.getMonth(), 2);
		let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 1);

		while (firstDay <= lastDay) {
			dates.push(new Date(firstDay).toISOString().slice(0, 10));
			firstDay.setDate(firstDay.getDate() + 1);
		}
		return dates;
	}
	getAllDaysInCustomDates(startDate, endDate) {
		let dates = [];
		let firstDay = new Date(startDate);
		let lastDay = new Date(endDate);

		while (firstDay <= lastDay) {
			dates.push(new Date(firstDay).toISOString().slice(0, 10));
			firstDay.setDate(firstDay.getDate() + 1);
		}
		return dates;
	}

}

module.exports = new timesheetController()
