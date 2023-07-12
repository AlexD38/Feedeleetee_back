import client from "../database.js";

const auth_model = {
	async getOneClientByItsEmail(mail) {
		try {
			const sqlQuery = {
				text: `SELECT * FROM users WHERE mail=($1)`,
				values: [mail],
			};
			const response = await client.query(sqlQuery);
			// const response = {
			// 	success: `User with mail : ${email} found in database`,
			// };
			// console.log(response.rows[0]);
			return response.rows[0];
		} catch (error) {
			console.log(error);
		}
	},
	async getOneClientByItsPwd(password, mailFound) {
		try {
			const sqlQuery = {
				text: `SELECT * FROM users WHERE mail=($1) AND password=($2)`,
				values: [mailFound, password],
			};
			const response = await client.query(sqlQuery);
			// console.log(response.rows[0]);
			return response.rows[0];
		} catch (error) {
			console.log(error);
		}
	},
};

export default auth_model;
