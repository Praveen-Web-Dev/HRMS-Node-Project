class AttendanceModel {
    constructor() { }

    saveAttendance(data) {
        return new Promise(async function (resolve, reject) {
            try {
                global.dbs['hrms'].collection('attendance').insertOne(data, (err, result) => {
                    if (err) {
                        return resolve({
                            success: false,
                            error: err.message,
                        });
                    } else {
                        return resolve({
                            success: true,
                            data: {
                                message: "Attendance has been saved",
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

    holidays(query){
        return new Promise(async function (resolve, reject) {
            try {
                global.dbs["hrms"].collection("holidays").find(query).project({
                    "_id":0,
                    "data.holidays":1
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


    getAttendance(query) {
        return new Promise(async function (resolve, reject) {
            try {
                global.dbs["hrms"].collection("attendance").find(query).project({
                    data: 1
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

    findDate(query) {
        return new Promise(async function (resolve, reject) {
            try {
                global.dbs["hrms"].collection("attendance").find(query).project({
                    "request.date": 1
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

    deleteData(data) {
        return new Promise(async function (resolve, reject) {
            try {
                global.dbs['hrms'].collection('attendance').deleteMany(data, (err, result) => {
                    if (err) {
                        return resolve({
                            success: false,
                            error: err.message,
                        });
                    } else {
                        return resolve({
                            success: true,
                            data: {
                                message: "Deleted attendance Successfully!",
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

module.exports = new AttendanceModel();