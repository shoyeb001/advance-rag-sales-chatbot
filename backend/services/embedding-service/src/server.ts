import { runMigrate } from "./db/db";
import { connectQueue } from "./queue/queue";
import { startFileConsumer } from "./services/file-consumer.service";

const startServer = async () => {
    await runMigrate();
    await connectQueue();
    await startFileConsumer();
    console.log("server started")
}

startServer().catch((err) => {
    console.error("Error starting server:", err);
    process.exit(1);
});