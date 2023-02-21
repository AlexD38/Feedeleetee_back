import client from "../database.js";

const auth_model = {
	async getOneClientByItsEmail(email) {
		try {
			const sqlQuery = {
				text: `SELECT * FROM users WHERE mail=($1)`,
				values: [email],
			};
			const response = await client.query(sqlQuery);
			// const response = {
			// 	success: `User with mail : ${email} found in database`,
			// };
			console.log(response.rows[0]);
			return response.rows[0];
		} catch (error) {
			console.log(error);
		}
	},
	async getOneClientByItsPwd(password) {
		try {
			const sqlQuery = {
				text: `SELECT * FROM users WHERE password=($2)`,
				values: [password],
			};
			const response = await client.query(sqlQuery);
			return response.rows[0];
		} catch (error) {
			console.log(error);
		}
	},
};

export default auth_model;
