import express, { Response, Request } from "express";
import dotenv from "dotenv";
dotenv.config()
import routes from "./routes/routes";
import { runMigrate } from "./db/db";
import { connectQueue } from "./queue/queue";

const app = express()
app.use(express.json())
app.get("/health", (req: Request, res: Response) => {
    res.status(200).json({ status: "ok" })
})

app.use("/api/v1", routes);

app.listen(8001, async () => {
    try {
        console.log(`Server is running on port 8001`);
        console.log("hello")
        await connectQueue();
        console.log("Connected to RabbitMQ")
        await runMigrate()
        console.log("Migrations completed")
    } catch (error) {
        console.error("Error starting the server:", error);
        process.exit(1);
    }

})