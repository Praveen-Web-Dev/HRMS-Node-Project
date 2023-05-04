const { ObjectID } = require("mongodb");
const moment = require('moment');
const leavemodel = require("../../models/leaveModel");
const attendanceController = require("./attendanceController")

class LeaveController {
	constructor() { }

	leaveApplication(req) {
		let that = this;
		return new Promise(async function (resolve, reject) {
			try {
				let request = req.body;
				//Checking Mandatory fields
				if (!request.leave_type) {
					return resolve({
						success: false,
						error: "leave_type is Mandatory field!"
					});
				} else if (!request.leave_from) {
					return resolve({
						success: false,
						error: "leave_from is Mandatory field!"
					});
				} else if (!request.leave_to) {
					return resolve({
						success: false,
						error: "leave_To is Mandatory field!"
					});

				} else if (!new Date(request.leave_to) > new Date(request.leave_from)) {
					return resolve({
						success: false,
						error: "from_date should be prior to To_date "
					})
				}
				else if (!request.time_Range) {
					return resolve({
						success: false,
						error: "Time_Range is Mandatory field!"
					});
				} else if (!request.reason) {
					return resolve({
						success: false,
						error: "Reason is Mandatory field!"
					});
				}

				let formats = ["YYYY-MM-DD", "YYYY-MM-DD HH:mm"];
				if (!moment(`${request.leave_from}`, formats, true).isValid() && (!moment(` ${request.leave_to}`, formats, true).isValid() && (!moment(`${request_Payload.Applied_on}`, formats, true).isValid()))) {
					return resolve({
						success: false,
						error: "Date Format is Invalid. Please follow the Date format as 'YYYY-MM-DD'"
					});
				}

				let allLeaves = that.getAllDaysInCustomDates(request.leave_from, request.leave_to)
				await attendanceController.markAttendance(req.user, allLeaves)

				//Preparing the payload to insert 
				let payload = {
					user: {
						emp_id: req.user["emp_id"],
						emp_first_name: req.user["emp_first_name"],
						emp_department: req.user["emp_department"],
					},
					leavedata: {
						leave_type: request.leave_type,
						leave_from: request.leave_from,
						leave_to: request.leave_to,
						time_Range: request.time_Range,
						reason: request.reason
					},
					leaveInfo: {
						applied_On: request.applied_On,
						leave_type: request.leave_type,
						leave_from: request.leave_from,
						leave_to: request.leave_to,
						number_of_days: request.number_of_days,
						status: request.status,
					}
				}
				let response = await leavemodel.leaveApply(payload);
				resolve(response);
			}
			catch (error) {
				reject(error);
			}
		})
	}
	leaveList(req) {
		let that = this;
		return new Promise(async function (resolve, reject) {
			try {
				let action = req.params.action.toLowerCase();

				if (action == "daily") {
					let query = {
						"leaveInfo.applied_On": new Date().toISOString().slice(0, 10)
					}
					let response = await leavemodel.findLeaves(query)
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
						"leaveInfo.applied_On": {
							$in: week
						}
					}
					let response = await leavemodel.findLeaves(query)
					resolve(response)
				}
				else if (action == "monthly") {
					let currentMonthDates = that.getAllDaysInMonth()

					let query = {
						"leaveInfo.applied_On": {
							$in: currentMonthDates
						}
					}
					let response = await leavemodel.findLeaves(query)
					resolve(response);
				} else if (action == "custom") {
					let customMonthDates = that.getAllDaysInMonth(req.body.startDate, req.body.endDate)

					let query = {
						"leaveInfo.applied_On": {
							$in: customMonthDates
						}
					}
					let response = await leavemodel.findLeaves(query)
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

	updateLeave(req) {
		return new Promise(async function (resolve, reject) {
			try {
				let request = req.body;
				if (!request._id) {
					return resolve({
						success: false,
						error: "Missing _id field!"
					});
				}
				let id = request._id;
				delete request._id;

				let payload = {
					set: {
						leavedata: {
							leave_type: request.leave_type,
							leave_from: request.leave_from,
							leave_to: request.leave_to,
							time_Range: request.time_Range,
							reason: request.reason
						},
						leaveInfo: {
							applied_On: request.applied_On,
							leave_type: request.leave_type,
							leave_from: request.leave_from,
							leave_to: request.leave_to,
							number_of_days: request.number_of_days,
							status: request.status,
						}
					},
					query: {
						_id: ObjectID(id)
					}
				};
				let response = await leavemodel.leaveUpdate(payload);
				return resolve(response);
			} catch (error) {
				reject(error);
			}
		})
	}

	deleteLeave(req) {
		return new Promise(async function (resolve, reject) {
			try {
				if (!req.body._id) {
					return resolve({
						success: false,
						error: "id is Mandatory."
					});
				}
				let deletedata = {
					"_id": ObjectID(req.body._id)
				}
				let response = await leavemodel.leaveDelete(deletedata);
				resolve(response);
			} catch (error) {
				reject(error);
			}
		});
	}
}

module.exports = new LeaveController();