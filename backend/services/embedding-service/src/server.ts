import { runMigrate } from "./db/db";
import { connectQueue } from "./queue/queue";
import { startFileConsumer } from "./services/file-consumer.service";

const startServer = async () => {
    await runMigrate();
    await connectQueue();
    await startFileConsumer();
    console.log("DEBUG: Server started")
}

startServer().catch((err) => {
    console.error("Error: Error starting server:", err);
    process.exit(1);
});