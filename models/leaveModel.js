class LeaveModel {
	constructor() { }

	leaveApply(data) {
		return new Promise(async function (resolve, reject) {
			try {
				global.dbs['hrms'].collection('leaves').insertOne(data, (err, result) => {
					if (err) {
						return resolve({
							success: false,
							error: err.message,
						});
					} else {
						return resolve({
							success: true,
							data: {
								message: "Leave_Application has been submitted",
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

	findLeaves(query) {
		return new Promise(async function (resolve, reject) {
			try {
				global.dbs["hrms"].collection("leaves").find(query).project({
				    leaveInfo: 1
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
	leaveUpdate(data) {
		return new Promise(async function (resolve, reject) {
			try {
				global.dbs['hrms'].collection('leaves')
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
									message: "Updated Leave-data Successfully",
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
	
	leaveDelete(data) {
        return new Promise(async function (resolve, reject) {
            try {
                global.dbs['hrms'].collection('leaves').deleteMany(data, (err, result) => {
                    if (err) {
                        return resolve({
                            success: false,
                            error: err.message,
                        });
                    } else {
                        return resolve({
                            success: true,
                            data: {
                                message: "Deleted leave Successfully",
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

module.exports = new LeaveModel();