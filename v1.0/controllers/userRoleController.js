const { ObjectID } = require("mongodb");
const userRolemodel = require("../../models/userRoleModel");

class UserController {
	constructor() { }

	createRole(req) {
		return new Promise(async function (resolve, reject) {
			try {
				let request = req.body;

				//Checking Mandatory fields
				if (!request.department) {
					return resolve({
						success: false,
						error: "Department is Mandatory field!"
					});
				} else if (!request.empID) {
					return resolve({
						success: false,
						error: "Employee_ID is Mandatory field!"
					});
				} else if (!request.empName) {
					return resolve({
						success: false,
						error: "empName is Mandatory field!"
					});
				} else if (!request.designation) {
					return resolve({
						success: false,
						error: "Designation is Mandatory field!"
					});
				} else if (!request.userRole) {
					return resolve({
						success: false,
						error: "UserRole is Mandatory field!"
					});
				}
				let payload = {
					department: request.department,
					empID: request.empID,
					empName: request.empName,
					designation: request.designation,
					userRole: request.userRole
				}
				let response = await userRolemodel.newRole(payload);
				resolve(response);
			} catch (error) {
				reject(error);
			}
		})
	}

	editRole(req) {
		return new Promise(async function (resolve, reject) {
			try {
				if (!req.body._id) {
					return resolve({
						success: false,
						error: "Missing _id field!"
					});
				}
				let id = req.body._id;
				delete req.body._id;

				let request = {
					set: {
						department: req.body.department,
						empID: req.body.empID,
						empName: req.body.empName,
						designation: req.body.designation,
						userRole: req.body.userRole
					},
					query: {
						_id: ObjectID(id)
					}
				};
				let response = await userRolemodel.userChange(request);
				resolve(response);
			} catch (error) {
				reject(error);
			}
		})
	}

	assignPrivileges(req) {
		return new Promise(async function (resolve, reject) {
			try {
				let request = req.body;

				let payload = {
					privileges: {
						userRole: request.userRole,
						dashboardManagement: request.dashboardManagement,
						organisationManagement: request.organisationManagement,
						attendanceManagement: request.attendanceManagement,
						leaveManagement: request.leaveManagement,
						timesheetManagement: request.timesheetManagement,
						performanceManagement: request.performanceManagement,
						employeeManagement: request.employeeManagement,
						userManagement: request.userManagement,
						reportManagement: request.reportManagement
					}
				}
				let response = await userRolemodel.privilegesAssign(payload);
				resolve(response);
			} catch (error) {
				reject(error);
			}
		})
	}

	editedPrivileges(req) {
		return new Promise(async function (resolve, reject) {
			try {
				let request = req.body;

				if (!request._id) {
					return resolve({
						success: false,
						error: "Missing _id field!"
					});
				}

				let payload = {

					set: {
						userRole: request.userRole,
						dashboardManagement: request.dashboardManagement,
						organisationManagement: request.organisationManagement,
						attendanceManagement: request.attendanceManagement,
						leaveManagement: request.leaveManagement,
						timesheetManagement: request.timesheetManagement,
						performanceManagement: request.performanceManagement,
						employeeManagement: request.employeeManagement,
						userManagement: request.userManagement,
						reportManagement: request.reportManagement
					},

					query: {
						_id: ObjectID(id)
					},
				}
				let response = await userRolemodel.privilegesEdit(payload);
				resolve(response);
			} catch (error) {
				reject(error);
			}
		})
	}
}

module.exports = new UserController();