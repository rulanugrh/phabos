import express, { Express, Request, Response } from "express"
import { Routes } from "./routes"
import dotenv from 'dotenv';

dotenv.config()
const app: Express = express()
const port = process.env.APP_PORT  ?? 3000

async function main() {
    app.use(express.json())
    
    app.get('/', async (req: Request, res: Response): Promise<Response> => {
        try {
            return res.send("API Succesfully Running")
        } catch (error) {
            return res.send(String(error))
        }
    })

    Routes(app)

    app.listen(port, () => {
        console.log(`Server running at: ${port}`)
    })
}

main()