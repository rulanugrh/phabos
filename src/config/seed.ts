import { firestore } from "./firebase"
import dotenv from "dotenv"
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
dotenv.config()

async function main () {
    const hashPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD as string, 14)
    const data = {
        name: "Administrator",
        email: process.env.ADMIN_EMAIL,
        password: hashPassword,
        amount: 0,
        _id: uuid()
    }

    const insert = await firestore.collection("users").doc(process.env.ADMIN_EMAIL as string).set(data)
    if (!insert) {
        console.log("Error inserting admin user")
    }

    console.log("Success seeder for admin user")
}

main()
    .catch(async (e) => {
        console.log(e)
        process.exit(1);
    })
    .finally(async () => {
        console.log("Seeder complete")
    })