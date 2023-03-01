const db = require("../config/connection");
const { Client, Salesperson } = require("../models");

db.once("open", async () => {
    await Salesperson.deleteMany({});
    await Client.deleteMany({});

    // Create some salespeople
    const alice = new Salesperson({
        first_name: "Alice",
        last_name: "Smith",
        phone_number: "555-1234",
        email: "alice@example.com",
        password: "password",
    });

    const bob = new Salesperson({
        first_name: "Bob",
        last_name: "Jones",
        phone_number: "555-5678",
        email: "bob@example.com",
        password: "password",
    });

    await alice.save();
    await bob.save();

    console.log("Salespeople seeded!");

    // Create some clients
    const c1 = new Client({
        first_name: "John",
        last_name: "Brown",
        phone_number: "555-1111",
        email: "john@example.com",
        sales_person: alice._id,
        status: "active",
    });

    const c2 = new Client({
        first_name: "Christopher",
        last_name: "Ingham",
        phone_number: "813-495-0244",
        email: "chris@example.com",
        sales_person: alice._id,
        status: "active",
    });

    const c3 = new Client({
        first_name: "Anna",
        last_name: "Green",
        phone_number: "555-2222",
        email: "anna@example.com",
        sales_person: bob._id,
        status: "active",
    });

    const c4 = new Client({
        first_name: "Diana",
        last_name: "Bowles",
        phone_number: "555-2222",
        email: "diana@example.com",
        sales_person: bob._id,
        status: "active",
    });

    await c1.save();
    await c2.save();
    await c3.save();
    await c4.save();

    console.log("Clients seeded!");
    process.exit(0);
});
