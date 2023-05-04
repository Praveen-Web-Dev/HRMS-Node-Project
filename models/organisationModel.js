class OrganisationModel {
	constructor() { }


	companydDetails(query) {
		return new Promise(async function (resolve, reject) {
			try {
				global.dbs["hrms"].collection("organisation").find(query).project({
					_id: 0
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

	detailsUpdate(data) {
		return new Promise(async function (resolve, reject) {
			try {
				global.dbs['hrms'].collection('organisation')
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
									message: "Updated Company_Details Successfully",
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


	submitCompanyInfo(data) {
		return new Promise(async function (resolve, reject) {
			try {
				global.dbs['hrms'].collection('organisation').insertOne(data, (err, result) => {
					if (err) {
						return resolve({
							success: false,
							error: err.message,
						});
					} else {
						return resolve({
							success: true,
							data: {
								message: "Company_information has been submitted",
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

module.exports = new OrganisationModel()