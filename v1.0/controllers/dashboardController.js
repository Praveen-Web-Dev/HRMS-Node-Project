const { ObjectID } = require("mongodb");
const moment = require('moment');
const dashboardModel = require("../../models/dashboardModel");


class DashboardController {
    constructor() { }

    startTimer(req) {
        return new Promise(async function (resolve, reject) {
            try {
                let request = req.body;
                if (!request.date) {
                    return resolve({
                        success: false,
                        error: "Date is Mandatory field!"
                    });
                } else if (!request.clock_in) {
                    return resolve({
                        success: false,
                        error: "clock_in is Mandatory field!"
                    });
                }

                // Validating the date clock_in formats
                let formats = ["YYYY-MM-DD HH:mm:ss", "YYYY-MM-DD HH:mm"];
                if (!moment(`${request.date} ${request.clock_in}`, formats, true).isValid()) {
                    return resolve({
                        success: false,
                        error: "Date & Time Format is Invalid. Please follow the Date format as 'YYYY-MM-DD HH:mm:ss'"
                    });
                }

                let query = {
                    date: request.date
                }
                let response = await dashboardModel.findDate(query);
                // if response is an error
                if (!response.success) {
                    return resolve({
                        success: false,
                        error: "No active Session Identified",
                        response: response
                    });
                }

                // if response is having no records with the date passed
                if (response.success && response.data.length == 0) {
                    let payload = {
                        user: {
                            _id: req.user["_id"],
                            emp_id: req.user["emp_id"],
                            emp_first_name: req.user["emp_first_name"],
                            emp_last_name: req.user["emp_last_name"],
                            emp_email: req.user["emp_email"],
                            emp_department: req.user["emp_department"],
                            emp_designation: req.user["emp_designation"],
                            role: req.user["role"]
                        },
                        request,
                        date: req.body.date,
                        timings: [
                            {
                                clock_in_time: request.clock_in,
                                clock_out_time: '---'
                            }
                        ]
                    }

                    let result = await dashboardModel.startTimerModel(payload);
                    resolve(result);
                }

                // if response is having multiple records with same date passed
                if (response.data.length > 1) {
                    return resolve({
                        success: false,
                        error: `Identified multiple active Sessions with the date passed '${request.date}'`,
                        response
                    });
                }

                let record = response.data[0];
                record.timings.push({
                    clock_in_time: request.clock_in,
                    clock_out_time: '---'
                });

                let updateData = {
                    query: {
                        _id: ObjectID(record['_id'])
                    },
                    update: {
                        timings: record['timings']
                    }
                }
                let result = await dashboardModel.updateTimings(updateData);
                resolve(result);
            } catch (error) {
                reject(error);
            }
        })
    }

    stopTimer(req) {
        return new Promise(async function (resolve, reject) {
            try {
                let request = req.body;
                if (!request.date) {
                    return resolve({
                        success: false,
                        error: "Date is Mandatory field!"
                    });
                } else if (!request.clock_out) {
                    return resolve({
                        success: false,
                        error: "clock_out is Mandatory field!"
                    });
                }

                // Validating the date clock_out formats
                let formats = ["YYYY-MM-DD HH:mm:ss", "YYYY-MM-DD HH:mm"];
                if (!moment(`${request.date} ${request.clock_out}`, formats, true).isValid()) {
                    return resolve({
                        success: false,
                        error: "Date & Time Format is Invalid. Please follow the Date format as 'YYYY-MM-DD HH:mm:ss'"
                    });
                }

                let query = {
                    date: request.date
                }
                let response = await dashboardModel.findDate(query);
                // if response is an error
                if (!response.success) {
                    return resolve({
                        success: false,
                        error: "No active Session Identified",
                        response: response
                    });
                }
                // if response is having no records with the date passed
                if (response.success && response.data.length == 0) {
                    return resolve({
                        success: false,
                        error: `No active Session Identified with the date passed '${request.date}'`
                    });
                }
                // if response is having multiple records with same date passed
                if (response.data.length > 1) {
                    return resolve({
                        success: false,
                        error: `Identified multiple active Sessions with the date passed '${request.date}'`,
                        response
                    });
                }

                let record = response.data[0];
                for (let tt in record['timings']) {
                    if (record['timings'][tt]['clock_out_time'] === '---') {
                        record['timings'][tt]['clock_out_time'] = request.clock_out;
                    }
                }

                let updateData = {
                    query: {
                        _id: ObjectID(record['_id'])
                    },
                    update: {
                        timings: record['timings']
                    }
                }
                let result = await dashboardModel.updateTimings(updateData);
                resolve(result);
            } catch (error) {
                reject(error);
            }
        })
    }

    findHolidays(req) {
        return new Promise(async function (resolve, reject) {
            try {
                let year = req.params.year;
                let query = {
                    year: year
                }
                let response = await dashboardModel.holidays(query);
                resolve(response);
            } catch (error) {
                reject(error);
            }
        })
    }

    updateHolidays(req){
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

				let payload = {
					set: req.body,
					query: {
						_id: ObjectID(id)
					}
				};
				let response = await organisationmodel.detailsUpdate(payload);
				return resolve(response);
             
            } catch (error) {
                reject(error);
            }
        })
    }

}

module.exports = new DashboardController();