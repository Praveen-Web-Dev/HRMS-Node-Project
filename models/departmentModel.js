class LeaveModel {
	constructor() { }

	deptDetails(data) {
		return new Promise(async function (resolve, reject) {
			try {
				global.dbs['hrms'].collection('department').insertOne(data, (err, result) => {
					if (err) {
						return resolve({
							success: false,
							error: err.message,
						});
					} else {
						return resolve({
							success: true,
							data: {
								message: "Department_info has been submitted",
								response: result,
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
	
	getDeptdetails(query) {
		return new Promise(async function (resolve, reject) {
			try {
				global.dbs['hrms'].collection('department').find(query)
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


}

module.exports = new LeaveModel();