//const { updateUser } = require("../v1.0/controllers/userController");

class UserModel {
	constructor() { }

	createNewUser(data) {
		return new Promise(async function (resolve, reject) {
			try {
				global.dbs['hrms'].collection('users').insertOne(data, (err, result) => {
					if (err) {
						return resolve({
							success: false,
							error: err.message,
						});
					} else {
						delete data.emp_password;
						return resolve({
							success: true,
							data: {
								message: "User Account Created Successfully",
								meta: data
							}
						});
					}
				});
			} catch (error) {
				reject(error);
			}
		})
	}

	getAllUsers(query) {
		return new Promise(async function (resolve, reject) {
			try {
				global.dbs['hrms'].collection('users').find(query, { projection: { emp_password: 0, status: 0 } })
					.sort({ _id: -1 })
					.toArray((err, result) => {
						if (err) {
							return resolve({
								success: false,
								error: err.message,
							});
						} else {
							return resolve({
								success: true,
								data: result,
							});
						}
					});
			} catch (error) {
				reject(error);
			}
		})
	}

	updateAccount(data) {
		return new Promise(async function (resolve, reject) {
			try {
				global.dbs['hrms'].collection('users')
					.updateOne(data.query, { $set: data.set }, (err, result) => {
						if (err) {
							return resolve({
								success: false,
								error: err.message,
							});
						} else {
							return resolve({
								success: true,
								data: {
									message: "Updated User Account Data Successfully",
									meta: result
								}
							});
						}
					});
			} catch (error) {
				console.log(error);
				reject(error);
			}
		});
	}
	
	passwordUpdate(data) {
		return new Promise(async function (resolve, reject) {
			try {
				global.dbs['hrms'].collection('users')
					.updateOne(data.query, { $set: data.set }, (err, result) => {
						if (err) {
							return resolve({
								success: false,
								error: err.message,
							});
						} else {
							return resolve({
								success: true,
								data: {
									message: "Updated Password Successfully",
									meta: result
								}
							});
						}
					});
			} catch (error) {
				console.log(error);
				reject(error);
			}
		});
	}

}



module.exports = new UserModel();