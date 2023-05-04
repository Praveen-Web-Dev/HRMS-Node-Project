const { request } = require("express");
const { ObjectID } = require("mongodb");
const organisationmodel = require("../../models/organisationModel");

class OrganisationController {
	constructor() { }

	companyDetails(req) {
		return new Promise(async function (resolve, reject) {
			try {
				let request = req.body;
				//Checking Mandatory fields
				if (!request.company_Name) {
					return resolve({
						success: false,
						error: "Company_Name is Mandatory field!"
					});
				} else if (!request.company_CR_Number) {
					return resolve({
						success: false,
						error: "company_CR_Number is Mandatory field!"
					});
				} else if (!request.VAT_register_Number) {
					return resolve({
						success: false,
						error: "VAT_register_Number is Mandatory field"
					});

				} else if (!request.description) {
					return resolve({
						success: false,
						error: "Description is Mandatory field!"
					});
				} else if (!request.administrator) {
					return resolve({
						success: false,
						error: "administrator is Mandatory field!"
					});
				} else if (!request.email_address) {
					return resolve({
						success: false,
						error: "email_address is Mandatory field!"
					});
				} else if (!request.contact_Number) {
					return resolve({
						success: false,
						error: "contact_Number is Mandatory field!"
					});
				} else if (!request.alternate_Contact_Number) {
					return resolve({
						success: false,
						error: "alternate_Contact_Number is Mandatory field!"
					});
				} else if (!request.company_Website) {
					return resolve({
						success: false,
						error: "company_Website is Mandatory field!"
					});
				} else if (!request.address) {
					return resolve({
						success: false,
						error: "address is Mandatory field!"
					});
				}

				//Preparing the payload to insert 
				let payload = {
					company_Information: {
						company_Name: request.company_Name,
						company_CR_Number: request.company_CR_Number,
						VAT_register_Number: request.VAT_register_Number,
						description: request.description,
						category: request.category,
						administrator: request.administrator
					},
					contact_Details: {
						email_address: request.email_address,
						contact_Number: request.contact_Number,
						alternate_Contact_Number: request.alternate_Contact_Number,
						company_Website: request.company_Website,
						address: request.address
					}
				}
				let response = await organisationmodel.submitCompanyInfo(payload);
				resolve(response);
			} catch (error) {
				reject(error);
			}
		})
	}


	updateDetails(req) {
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
		});
	}


	companyInfo(req) {
		return new Promise(async function (resolve, reject) {
			try {
				let company_details = req.params.company_Name
				let query = {
					"companyInformation.company_Name": company_details
				}
				let response = await organisationmodel.companydDetails(query);
				resolve(response);
			} catch (error) {
				reject(error);
			}
		})
	}

}




module.exports = new OrganisationController()