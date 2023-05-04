class timesheetModel {
	constructor() { }


	findTask(query) {
		return new Promise(async function (resolve, reject) {
			try {
				global.dbs["hrms"].collection("timesheet").find(query).project({
					my_Timesheet:1
				}).toArray((err, result) => {
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



	submitTask(data) {
		return new Promise(async function (resolve, reject) {
			try {
				global.dbs['hrms'].collection('timesheet').insertOne(data, (err, result) => {
					if (err) {
						return resolve({
							success: false,
							error: err.message,
						});
					} else {
						return resolve({
							success: true,
							data: {
								message: "Timesheeet has been submitted",
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
	
}

module.exports = new timesheetModel()