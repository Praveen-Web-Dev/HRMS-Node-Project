const { ObjectID } = require("mongodb");
const { JWT_SECRET } = require('../../config/params');
const usermodel = require("../../models/userModel");

class UserController {
	constructor() { }

	loginUser(req) {
		return new Promise(async function (resolve, reject) {
			try {
				if (!req.body.username || !req.body.password) {
					return resolve({
						success: false,
						error: "Missing Mandatory fields!"
					});
				}

				let query = {
					empEmail: req.body.username,
					emp_password: Buffer.from(req.body.password).toString('base64'),
					status: 1
				};

				let response = await usermodel.getAllUsers(query);
				if (response.data.length == 0) {
					return resolve({
						success: false,
						error: "Invalid Credentials!"
					});
				} else {
					let token = global.jsonWebToken.sign(response.data[0], JWT_SECRET, {
						expiresIn: 60 * 60 * 60 * 60 * 60 * 60 * 60,
					});
					return resolve({
						success: true,
						data: {
							token: token,
							message: 'User successfully logged'
						}
					});
				}
			} catch (error) {
				reject(error);
			}
		})
	}

	createNewAccount(req) {
		return new Promise(async function (resolve, reject) {
			try {
				if (!req.body.empId) {
					return resolve({
						success: false,
						error: "Employee ID is Mandatory"
					});
				}
				if (!req.body.empFirstName || !req.body.empLastName) {
					return resolve({
						success: false,
						error: "Employee Name is Mandatory"
					});
				}
				if (!req.body.empEmail) {
					return resolve({
						success: false,
						error: "Employee Email is Mandatory"
					});
				}
				if (!req.body.role) {
					return resolve({
						success: false,
						error: "Role is Mandatory"
					});
				}
				let requestPayload = req.body;
				requestPayload.status = 1,
				// let performanceReport = {
				//  ratings : {
				// 	performance: requestPayload.performance,
				// 	punctuality: requestPayload.punctuality,
				// 	Discipline: requestPayload.Discipline,
				// 	communicationSkills: requestPayload.communicationSkills,
				// 	coordination: requestPayload.coordination
				// },
				//      review : {
				// 		total_ratings: requestPayload.total_ratings,
				// 		remarks: requestPayload.remarks
				// 	}
				// }
				requestPayload.createdTime = new Date();
				requestPayload.modifiedTime = new Date();
				let response = await usermodel.createNewUser(requestPayload);
				return resolve(response);
			} catch (error) {
				reject(error);
			}
		})
	}

	getUsers(req) {
		return new Promise(async function (resolve, reject) {
			try {
				let query = {};
				if (req.params.id) {
					query = {
						_id: ObjectID(req.params.id)
					}
				} else {
					let action = req.params.action;
					switch (action) {
						case 'all':
							query = {
								status: 1
							};
							break;
						case 'admin':
							query = {
								status: 1,
								role: "admin"
							}
							break;
						case 'employee':
							query = {
								status: 1,
								role: "employee"
							}
							break;
						case 'deleted':
							query = {
								status: 0
							}
							break;
						default:
							return resolve({
								success: false,
								error: "Invalid action!"
							});
					}
				}
				let response = await usermodel.getAllUsers(query);
				return resolve(response);
			} catch (error) {
				reject(error);
			}
		})
	}

	updateUser(req) {
		return new Promise(async function (resolve, reject) {
			try {
				if (!req.body._id) {
					return resolve({
						success: false,
						error: "Missing _id field!"
					});
				}

				let id = req.body._id;
				req.body.modified_time = new Date();
				delete req.body._id;

				let request = {
					set: req.body,
					query: {
						_id: ObjectID(id)
					}
				};
				let response = await usermodel.updateAccount(request);
				return resolve(response);
			} catch (error) {
				reject(error);
			}
		});
	}

	updatePassword(req) {
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
						empPassword: req.body.empPassword
					},
					query: {
						_id: ObjectID(id)
					}
				};
				let response = await usermodel.passwordUpdate(request);
				return resolve(response);
			} catch (error) {
				reject(error);
			}
		});

	}

	deleteUser(req) {
		return new Promise(async function (resolve, reject) {
			try {
				if (!req.params.id) {
					return resolve({
						success: false,
						error: "id is Mandatory."
					});
				}
				let request = {
					set: {
						status: 0
					},
					query: {
						_id: ObjectID(req.params.id)
					}
				};
				let response = await usermodel.updateAccount(request);
				return resolve(response);
			} catch (error) {
				reject(error);
			}
		});
	}
}


module.exports = new UserController();