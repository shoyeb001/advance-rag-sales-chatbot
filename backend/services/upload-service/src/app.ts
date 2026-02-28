import express, { Response, Request } from "express";
import dotenv from "dotenv";
dotenv.config()
import routes from "./routes/routes";
import { runMigrate } from "./db/db";

const app = express()
app.use(express.json())
app.get("/health", (req: Request, res: Response) => {
    res.status(200).json({ status: "ok" })
})

app.use("/api/v1", routes);

app.listen(8001, async () => {
    console.log(`Server is running on port 8001`);
    await runMigrate()
    console.log("Migrations completed")
});