import { MongoClient } from 'mongodb';

async function connect() {
    const url = `mongodb+srv://root:${process.env.RIDERS_API_DB_PWD}@riders.hd4vtve.mongodb.net/admin?authSource=admin&replicaSet=atlas-7ub5o0-shard-0&w=majority&readPreference=primary&appname=riders&retryWrites=true&ssl=true`;
    const client = new MongoClient(url);
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(process.env.RIDERS_API_DATABASE);
    return db;
}

async function connectRest() {
    const url = `mongodb+srv://root:${process.env.RIDERS_API_DB_PWD}@riders.hd4vtve.mongodb.net/admin?authSource=admin&replicaSet=atlas-7ub5o0-shard-0&w=majority&readPreference=primary&appname=riders&retryWrites=true&ssl=true`;
    const client = new MongoClient(url);
    await client.connect();
    console.log('Connected successfully to common server');
    const db1 = client.db("expen");
    const db2 = client.db("greyt");
    return [db1, db2];
}

export default { connect, connectRest };