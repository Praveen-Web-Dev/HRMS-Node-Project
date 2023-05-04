class UserRoleModel {
	constructor() { }

	newRole(data) {
		return new Promise(async function (resolve, reject) {
			try {
				global.dbs['hrms'].collection('userRole').insertOne(data, (err, result) => {
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
								message: "User Role Created Successfully",
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

	userChange(data) {
		return new Promise(async function (resolve, reject) {
			try {
				global.dbs['hrms'].collection('userRole').updateOne(data.query, { $set: data.set }, (err, result) => {
					if (err) {
						return resolve({
							success: false,
							error: err.message,
						});
					} else {
						return resolve({
							success: true,
							data: {
								message: "User Role changes Created Successfully",
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

	
	privilegesAssign(data) {
		return new Promise(async function (resolve, reject) {
			try {
				global.dbs['hrms'].collection('userRole').insertOne(data, (err, result) => {
					if (err) {
						return resolve({
							success: false,
							error: err.message,
						});
					} else {
						return resolve({
							success: true,
							data: {
								message: "Privileges Created Successfully",
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

	privilegesEdit(data){
		return new Promise(async function (resolve, reject) {
			try {
				global.dbs['hrms'].collection('userRole').updateOne(data.query, { $set: data.set }, (err, result) => {
					if (err) {
						return resolve({
							success: false,
							error: err.message,
						});
					} else {
						return resolve({
							success: true,
							data: {
								message: "Privilege changes Created Successfully",
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



}


module.exports = new UserRoleModel();