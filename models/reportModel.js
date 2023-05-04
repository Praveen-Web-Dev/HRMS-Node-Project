class reportModel {
	constructor() { }


	attendanceList(query) {
		return new Promise(async function (resolve, reject) {
			try {
				global.dbs["hrms"].collection("attendance").find(query)
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



	leaveList(query) {
		return new Promise(async function (resolve, reject) {
			try {
				global.dbs["hrms"].collection("leaves").find(query).project({
					leavedata: 0
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


	timesheetList(query) {
		return new Promise(async function (resolve, reject) {
			try {
				global.dbs["hrms"].collection("timesheet").find(query).project({
					my_Timesheet: 1
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


	employeeList(query) {
		return new Promise(async function (resolve, reject) {
			try {
				global.dbs["hrms"].collection("users").find(query).project({
					my_Timesheet: 1
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


	findTask(query) {
		return new Promise(async function (resolve, reject) {
			try {
				global.dbs["hrms"].collection("timesheet").find(query).project({
					my_Timesheet: 1
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


}


module.exports = new reportModel()
