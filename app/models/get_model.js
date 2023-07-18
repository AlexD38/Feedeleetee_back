import pool from "../database.js";

const get_model = {
	async getOneUser(userId) {
		try {
			const sqlQuery = {
				text: `SELECT * FROM users WHERE id=$1;`,
				values: [userId],
			};
			const response = await pool.query(sqlQuery);
			return response.rows[0];
		} catch (error) {
			console.log(error);
		}
	},
	async getAllInfosForMyEnterprise(userId, enterprise_id) {
		try {
			const sqlQuery = {
				text: `SELECT * FROM get_quick_view1($1, $2)
			  `,
				values: [userId, enterprise_id],
			};
			const response = await pool.query(sqlQuery);
			// console.log(response.rows[0]);
			return response.rows[0];
		} catch (error) {
			// res.status(500);
			console.log(error);
		}
	},
	async getOnepool(poolId) {
		try {
			const sqlQuery = {
				text: `
            SELECT firstname, pools.id, lastname, array_agg(appointments.day) as rdv FROM pools LEFT JOIN appointments ON pool_id = $1 where pools.id = ($1) GROUP BY firstname, pools.id, lastname;`,
				values: [poolId],
			};
			const response = await pool.query(sqlQuery);
			let data = response.rows;
			return data;
		} catch (err) {
			console.error(err);
		}
	},
	async getOnepoolAppointments(poolId) {
		try {
			const sqlQuery = {
				text: `
				SELECT json_build_object('appointments', json_agg(json_build_object('day', day, 'time', time_of_day, 'length', length_of_appointment)), 'firstname', firstname, 'lastname', lastname) AS pool_appointments
				FROM pools 
				JOIN appointments ON pool_id = pools.id 
				WHERE pools.id = $1 
				GROUP BY pools.id, firstname, lastname;`,
				values: [poolId],
			};
			const response = await pool.query(sqlQuery);
			let data = response.rows;
			return data;
		} catch (err) {
			console.error(err);
		}
	},
	async getpoolsFromEnterprise(enterpriseId) {
		try {
			const sqlQuery = {
				text: `
				SELECT DISTINCT pools.id, firstname, lastname, mail, tel 
				FROM enterprises_got_pools 
				JOIN pools ON pools_id = pools.id 
				WHERE enterprises_id = ($1);`,
				values: [enterpriseId],
			};
			const response = await pool.query(sqlQuery);
			let data = response.rows;
			return data;
		} catch (err) {
			console.error(err);
		}
	},
	async getEnterprises() {
		try {
			const sqlQuery = {
				text: `SELECT * from enterprises;`,
			};
			const response = await pool.query(sqlQuery);
			let data = response.rows;
			for (const enterprise of data) {
				// console.log(enterprise.logo);
				if (enterprise.logo) {
					const newImage = enterprise.logo
						.toString("base64")
						.toString("utf8");
					enterprise.logo = newImage;
				}
				console.log(enterprise);
			}
			// console.log(data);
			return data;
		} catch (error) {
			console.error(error);
		}
	},
	async getOneEnterprise(enterpriseId) {
		try {
			const sqlQuery = {
				text: `SELECT * FROM enterprises WHERE id = ($1);`,
				values: [enterpriseId],
			};
			const response = await pool.query(sqlQuery);
			console.log(response.rows);
			let data = response.rows;
			if (!response.rows[0]?.logo) {
				return data;
			} else {
				const newImage = response.rows[0].logo
					.toString("base64")
					.toString("utf8");
				response.rows[0].logo = newImage;
			}
			console.log(data);
			return data;
		} catch (error) {
			console.error(error);
		}
	},
	async getAppointmentsFromEnterprise(enterpriseId) {
		try {
			const sqlQuery = {
				text: `SELECT appointments.id,  day, time_of_day, pool_id, firstname, lastname, mail, tel FROM appointments   left JOIN pools ON pool_id = pools.id WHERE appointments.enterprise_id = ($1);
	   `,
				values: [enterpriseId],
			};
			const response = await pool.query(sqlQuery);
			let data = response.rows;
			// console.log(response.rows);
			return data;
		} catch (error) {
			console.error(error);
		}
	},
	async getAppointmentsAvailableFromEnterprise(enterpriseId) {
		try {
			const sqlQuery = {
				text: `SELECT * from appointments  where appointments.enterprise_id = $1 AND pool_id is null;
	   `,
				values: [enterpriseId],
			};
			const response = await pool.query(sqlQuery);
			let data = response.rows;
			console.log(response.rows);
			return data;
			s;
		} catch (error) {
			console.error(error);
		}
	},
	async getOffersFromEnterprises(enterpriseId) {
		try {
			const sqlQuery = {
				text: `SELECT * FROM offers WHERE enterprise_id = ($1);
		   `,
				values: [enterpriseId],
			};
			const response = await pool.query(sqlQuery);
			let data = response.rows;
			return data;
		} catch (error) {
			console.error(error);
		}
	},
	async getServicesFromEnterprise(enterpriseId) {
		try {
			const sqlQuery = {
				text: `SELECT * FROM services WHERE enterprise_id = ($1);`,
				values: [enterpriseId],
			};
			const response = await pool.query(sqlQuery);
			let data = response.rows;
			// console.log(data);
			return data;
		} catch (error) {
			console.error(error);
		}
	},
	async getNextAppointments(enterpriseId) {
		try {
			const sqlQuery = {
				text: `SELECT * FROM get_next_3_appointments($1);`,
				values: [enterpriseId],
			};
			const response = await pool.query(sqlQuery);
			let data = response.rows;
			// console.log(response);
			return data;
		} catch (error) {
			console.error(error);
		}
	},
};

export default get_model;
