const { ObjectID } = require("mongodb");
const departmentmodel = require("../../models/departmentModel");

class LeaveController {
	constructor() { }

	addDepartment(req) {
		return new Promise(async function (resolve, reject) {
			try {
				let request = req.body;
				//Checking Mandatory fields
				if (!request.department_Name) {
					return resolve({
						success: false,
						error: "Department_Name is Mandatory field!"
					});
				} else if (!request.department_id) {
					return resolve({
						success: false,
						error: "Department_id is Mandatory field!"
					});
				} else if (!request.head_of_department) {
					return resolve({
						success: false,
						error: "Head_of_the_Department is Mandatory field!"
					});

				}

				//Preparing the payload to insert 
				let payload = {
					departmentData: {
					department_Name: request.department_Name,
					department_id: request.department_id,
					head_of_department: request.head_of_department
					},
					departmentInfo: {
						department_Name: request.department_Name,
						department_id: request.department_id,
						head_of_department: request.head_of_department,
						status: request.status
					}
				}
				let response = await departmentmodel.deptDetails(payload);
				resolve(response);
			}
			catch (error) {
				reject(error);
			}
		})
	}

	departmentDetails(req) {
		return new Promise(async function (resolve, reject) {
			try {
				let query = {
					$or: [
                        {
                            department_id: req.body.department_id
                        },
                        {
                            department_Name: req.body.department_Name,
                        },
                    ],
				}
				let response = await departmentmodel.getDeptdetails(query);
				resolve(response);
			} catch (error) {
				reject(error);
			}
		})
	}
}

  module.exports = new LeaveController();