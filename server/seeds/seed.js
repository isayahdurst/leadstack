const db = require("../config/connection");
const { Client, Salesperson } = require("../models");

db.once("open", async () => {
    await Salesperson.deleteMany({});
    await Client.deleteMany({});

    // Create some salespeople
    const emily = new Salesperson({
        first_name: "Emily",
        last_name: "Langworth",
        phone_number: "2765985134",
        email: "e24murph@gmail.com",
        password: "Testing123,"
    });

    const alice = new Salesperson({
        first_name: "Alice",
        last_name: "Smith",
        phone_number: "2765985134",
        email: "alice@example.com",
        password: "password",
    });

    const bob = new Salesperson({
        first_name: "Bob",
        last_name: "Jones",
        phone_number: "2765985134",
        email: "bob@example.com",
        password: "password",
    });

    await alice.save();
    await bob.save();
    await emily.save;

    console.log("Salespeople seeded!");

    // Create some clients
    const c1 = new Client({
        first_name: "John",
        last_name: "Brown",
        phone_number: "5083950012",
        email: "john@example.com",
        sales_person: alice._id,
        status: "Active",
    });

    const c2 = new Client({
        first_name: "Christopher",
        last_name: "Ingham",
        phone_number: "5083950012",
        email: "chris@example.com",
        sales_person: alice._id,
        status: "Active",
    });

    const c3 = new Client({
        first_name: "Anna",
        last_name: "Green",
        phone_number: "5083950012",
        email: "anna@example.com",
        sales_person: bob._id,
        status: "Active",
    });

    const c4 = new Client({
        first_name: "Diana",
        last_name: "Bowles",
        phone_number: "5083950012",
        email: "diana@example.com",
        sales_person: bob._id,
        status: "Inactive",
    });

    const c5 = new Client({
        first_name: "Bobby",
        last_name: "Lee",
        phone_number: "5083950012",
        email: "bobbylee@example.com",
        sales_person: bob._id,
        status: "Inactive",
    });

    const c6 = new Client({
        first_name: "Samantha",
        last_name: "Morris",
        phone_number: "5083950012",
        email: "samanthamorris@example.com",
        sales_person: bob._id,
        status: "Active",
    });

    const c7 = new Client({
        first_name: "Wayne",
        last_name: "Bryant",
        phone_number: "5083950012",
        email: "wayneb@example.com",
        sales_person: alice._id,
        status: "Active",
    });

    const c8 = new Client({
        first_name: "Marrisa",
        last_name: "Kent",
        phone_number: "5083950012",
        email: "marrisakent@example.com",
        sales_person: alice._id,
        status: "Active",
    });

    const c9 = new Client({
        first_name: "Thomas",
        last_name: "Shelby",
        phone_number: "5083950012",
        email: "shelby@example.com",
        sales_person: bob._id,
        status: "Active",
    });

    const c10 = new Client({
        first_name: "Karla",
        last_name: "Webber",
        phone_number: "5083950012",
        email: "karlawebb@example.com",
        sales_person: bob._id,
        status: "Active",
    });

    const c11 = new Client({
        first_name: "Harry",
        last_name: "Smith",
        phone_number: "5083950012",
        email: "hsmith@example.com",
        sales_person: alice._id,
        status: "Active",
    });

    const c12 = new Client({
        first_name: "Mary",
        last_name: "Shultz",
        phone_number: "5083950012",
        email: "hsmith@example.com",
        sales_person: alice._id,
        status: "Active",
    });



    await c1.save();
    await c2.save();
    await c3.save();
    await c4.save();
    await c5.save();
    await c6.save();
    await c7.save();
    await c8.save();
    await c9.save();
    await c10.save();
    await c11.save();
    await c12.save();

    console.log("Clients seeded!");

    process.exit(0);
});
