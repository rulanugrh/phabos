import express, { Express } from "express"
import { Routes } from "./routes"
import dotenv from 'dotenv';

dotenv.config()
const app: Express = express()
const port = process.env.APP_PORT  ?? 3000

async function main() {
    app.use(express.json())

    Routes(app)

    app.listen(port, () => {
        console.log(`Server running at: ${port}`)
    })
}

main()