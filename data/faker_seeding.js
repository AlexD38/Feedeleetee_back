import client from "../app/database.js";
import { faker } from "@faker-js/faker";
// console.log(client.user);

for (let i = 0; i < 10; i++) {
    let firstname = faker.name.firstName();
    let lastname = faker.name.lastName();
    let email = faker.internet.email();
    let tel = faker.phone.number();

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //! seeds client table
    // client.query(
    // 	"INSERT INTO clients (firstname, lastname, mail, tel, offer_is_available) VALUES ($1, $2, $3, $4, $5)",
    // 	[firstname, lastname, email, tel, "false"],
    // 	function (error, results) {
    // 		if (error) throw error;
    // 	}
    // );

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //! seed appointments table
    client.query(
        "INSERT INTO appointments (day, time, client_id) VALUES ($1, $2, $3)",
        [
            faker.date.weekday(),
            faker.random.numeric() + "H",
            faker.random.numeric(),
        ]
    );

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}
