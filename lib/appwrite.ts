import { Client, Account, Databases, ID } from "appwrite";

const client = new Client()
    .setEndpoint("https://sgp.cloud.appwrite.io/v1")
    .setProject("6949246e002f720eb299");

const account = new Account(client);
const databases = new Databases(client);

export { client, account, databases, ID };
