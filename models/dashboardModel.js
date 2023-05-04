class DashboardModel {
    constructor() { }

    startTimerModel(data) {
        return new Promise(async function (resolve, reject) {
            try {
                global.dbs['hrms'].collection('time_tracker').insertOne(data, (err, result) => {
                    if (err) {
                        return resolve({
                            success: false,
                            error: err.message,
                        });
                    } else {
                        return resolve({
                            success: true,
                            data: {
                                message: "User Session started",
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

    findDate(query) {
        return new Promise(async function (resolve, reject) {
            try {
                global.dbs["hrms"].collection("time_tracker").find(query).project({
                    date: 1,
                    timings: 1
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

    updateTimings(data) {
        return new Promise(async function (resolve, reject) {
            try {
                global.dbs['hrms'].collection('time_tracker')
                    .updateOne(data.query, { $set: data.update }, (err, result) => {
                        if (err) {
                            return resolve({
                                success: false,
                                error: err.message,
                            });
                        } else {
                            return resolve({
                                success: true,
                                data: {
                                    message: "Updated clock_out Successfully",
                                    response: result
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
    holidays(query) {
        return new Promise(async function (resolve, reject) {
            try {
                global.dbs["hrms"].collection("holidays").find(query).project({
                    _id:0
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

module.exports = new DashboardModel();