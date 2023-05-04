const { ObjectID } = require("mongodb");
const moment = require('moment');
const attendancemodel = require("../../models/attendanceModel");

class AttendanceController {
	constructor() { }

	markAttendance(req) {
		let that = this;
		return new Promise(async function (resolve, reject) {
			try {
				let request = req.body;

				// Checking for mandatory fields
				if (!request.date) {
					return resolve({
						success: false,
						error: "Date is Mandatory field!"
					});
				}
				if (!request.time_in) {
					return resolve({
						success: false,
						error: "Time_in is Mandatory field!"
					});
				}
				if (!request.time_out) {
					return resolve({
						success: false,
						error: "Time_out is Mandatory field!"
					});
				}

				// Validating the date time_in & date time_out formats
				let formats = ["YYYY-MM-DD HH:mm:ss", "YYYY-MM-DD HH:mm"];
				if (!moment(`${request.date} ${request.time_in}`, formats, true).isValid() || !moment(`${request.date} ${request.time_out}`, formats, true).isValid()) {
					return resolve({
						success: false,
						error: "Date & Time Format is Invalid. Please follow the Date format as 'YYYY-MM-DD HH:mm:ss'"
					});
				}

				let query = {
					"request.date": request.date
				}
				let result = await attendancemodel.findDate(query);
				if (!result.success) {
					return resolve({
						success: false,
						error: "Unexpected Error",
						response: result
					});
				}

				if (result.success && result.data.length == 0) {
					let hours_spend = '0 Hours 0 Mins';
					let startDate = new Date(`${request.date} ${request.time_in}`);
					let endDate = new Date(`${request.date} ${request.time_out}`);
					let difference = endDate.getTime() - startDate.getTime();
					if (difference > 0) {
						difference = difference / 1000;
						let hourDifference = Math.floor(difference / 3600);
						difference -= hourDifference * 3600;
						let minuteDifference = Math.floor(difference / 60);
						difference -= minuteDifference * 60;
						hours_spend = `${hourDifference} Hours, ${minuteDifference} Mins`;
					}

					// Preparing the logic for calculating the hours
					const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
					const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
					let month = new Date(request.date).getMonth();
					let day = new Date(request.date).getDay();

					// Preparing the insert document
					let payload = {
						user: {
							_id: req.user["_id"],
							emp_id: req.user["emp_id"],
							emp_first_name: req.user["emp_first_name"],
							emp_last_name: req.user["emp_last_name"],
							emp_email: req.user["emp_email"],
							emp_department: req.user["emp_department"],
							emp_designation: req.user["emp_designation"],
							role: req.user["role"]
						},
						request,
						data: {
							date: new Date(request.date),
							year: new Date(request.date).getFullYear(),
							month_in_words: monthNames[month],
							month_in_number: (month + 1 < 10 ? '0' : '') + (month + 1),
							day_in_words: days[day],
							day_in_number: (new Date(request.date).getDate() < 10 ? '0' : '') + new Date(request.date).getDate(),
							time_in: that.formatAMPM(new Date(`${request.date} ${request.time_in}`)),
							time_out: that.formatAMPM(new Date(`${request.date} ${request.time_out}`)),
							hours_spend
						}
					}

					let response = await attendancemodel.saveAttendance(payload);
					resolve(response);
				} else if (result.data.length > 0) {
					let deletedata = {
						"request.date": request.date
					}
					let deletedResult = await attendancemodel.deleteData(deletedata);
					if (!deletedResult.success) {
						return resolve({
							success: false,
							error: "Unexpected Error",
							response: deletedResult
						});
					}

					let hours_spend = '0 Hours 0 Mins';
					let startDate = new Date(`${request.date} ${request.time_in}`);
					let endDate = new Date(`${request.date} ${request.time_out}`);
					let difference = endDate.getTime() - startDate.getTime();
					if (difference > 0) {
						difference = difference / 1000;
						let hourDifference = Math.floor(difference / 3600);
						difference -= hourDifference * 3600;
						let minuteDifference = Math.floor(difference / 60);
						difference -= minuteDifference * 60;
						hours_spend = `${hourDifference} Hours, ${minuteDifference} Mins`;
					}

					// Preparing the logic for calculating the hours
					const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
					const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
					let month = new Date(request.date).getMonth();
					let day = new Date(request.date).getDay();

					// Preparing the insert document
					let payload = {
						user: {
							_id: req.user["_id"],
							emp_id: req.user["emp_id"],
							emp_first_name: req.user["emp_first_name"],
							emp_last_name: req.user["emp_last_name"],
							emp_email: req.user["emp_email"],
							emp_department: req.user["emp_department"],
							emp_designation: req.user["emp_designation"],
							role: req.user["role"]
						},
						request,
						data: {
							date: new Date(request.date),
							year: new Date(request.date).getFullYear(),
							month_in_words: monthNames[month],
							month_in_number: (month + 1 < 10 ? '0' : '') + (month + 1),
							day_in_words: days[day],
							day_in_number: (new Date(request.date).getDate() < 10 ? '0' : '') + new Date(request.date).getDate(),
							time_in: that.formatAMPM(new Date(`${request.date} ${request.time_in}`)),
							time_out: that.formatAMPM(new Date(`${request.date} ${request.time_out}`)),
							hours_spend
						}
					}

					let response = await attendancemodel.saveAttendance(payload);
					resolve(response);
				} else {
					return resolve({
						success: false,
						error: "Unexpected Action",
						response: result
					})
				}
			} catch (error) {
				reject(error);
			}
		})
	}

	markAttendanceLeave(user, leaveDates) {
		return new Promise(async function (resolve, reject) {
			try {
				for (let date of leaveDates) {
					let hours_spend = "Leave";
					//	Preparing the logic for no of hours
					const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
					const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
					let month = new Date(request.date).getMonth();
					let day = new Date(request.date).getDay();

					// Preparing the insert document
					let payload = {
						user: {
							_id: req.user["_id"],
							emp_id: req.user["emp_id"],
							emp_first_name: req.user["emp_first_name"],
							emp_last_name: req.user["emp_last_name"],
							emp_email: req.user["emp_email"],
							emp_department: req.user["emp_department"],
							emp_designation: req.user["emp_designation"],
							role: req.user["role"]
						},
						request: {
							date: date,
							time_in: "Leave",
							time_out: "Leave"
						},
						data: {
							date: new Date(date),
							year: new Date(date).getFullYear(),
							month_in_words: monthNames[month],
							month_in_number: (month + 1 < 10 ? '0' : '') + (month + 1),
							day_in_words: days[day],
							day_in_number: (new Date(request.date).getDate() < 10 ? '0' : '') + new Date(request.date).getDate(),
							time_in: "Leave",
							time_out: "Leave",
							hours_spend
						}
					}
					await attendancemodel.saveAttendance(payload)
				}
				resolve({ success: true });
			} catch (error) {
				reject(error)
			}
		}
		)
	}

	formatAMPM(date) {
		let hours = date.getHours();
		let minutes = date.getMinutes();
		let ampm = hours >= 12 ? 'PM' : 'AM';
		hours = hours % 12;
		hours = hours ? hours : 12;
		minutes = minutes < 10 ? '0' + minutes : minutes;
		let strTime = ((hours < 10 ? '0' : '') + hours) + ':' + minutes + ' ' + ampm;
		return strTime;
	}

	fetchHolidays(req) {
		return new Promise(async function (resolve, reject) {
			try {
				let year = req.params.year;
				let query = {
					year: year
				}
				let response = await attendancemodel.holidays(query);
				resolve(response);
			} catch (error) {
				reject(error);
			}
		})
	}

	getattendanceData(req) {
		let that = this;
		return new Promise(async function (resolve, reject) {
			try {
				let action = req.params.action.toLowerCase();

				if (action == "daily") {
					let query = {
						"request.date": new Date().toISOString().slice(0, 10)
					}
					let response = await attendancemodel.getAttendance(query)
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
						"request.date": {
							$in: week
						}
					}
					let response = await attendancemodel.getAttendance(query)
					resolve(response)
				}
				else if (action == "monthly") {
					let currentMonthDates = that.getAllDaysInMonth()

					let query = {
						"request.date": {
							$in: currentMonthDates
						}
					}
					let response = await attendancemodel.getAttendance(query);
					resolve(response);
				} else if (action == "custom") {
					let customMonthDates = that.getAllDaysInMonth(req.body.startDate, req.body.endDate)

					let query = {
						"request.date": {
							$in: customMonthDates
						}
					}
					let response = await attendancemodel.getAttendance(query)
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

module.exports = new AttendanceController();
