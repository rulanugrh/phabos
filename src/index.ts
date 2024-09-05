import express, { Express, Request, Response } from "express"
import { Routes } from "./routes"
import dotenv from 'dotenv';
import cors from "cors";

dotenv.config()
const app: Express = express()
const port = process.env.APP_PORT as unknown as number ?? 3000
const host = process.env.APP_HOST ?? '0.0.0.0'

const options: cors.CorsOptions = {
    origin: "*",
    methods: ["PUT", "POST", "GET", "DELETE", "OPTIONS"],
    optionsSuccessStatus: 200,
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Accept",
        "Accept-Encoding",
        "Origin"
    ]
}
async function main() {
    app.use(cors(options))
    app.use(express.json())
    app.options("*", cors(options))
    
    app.get('/', async (req: Request, res: Response): Promise<Response> => {
        try {
            return res.send("API Succesfully Running")
        } catch (error) {
            return res.send(String(error))
        }
    })

    Routes(app)

    app.listen(port, host)
    console.log(`Server running at: ${host}:${port}`)
}

main()