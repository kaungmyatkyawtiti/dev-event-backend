import express from "express";
import { serverPort } from "./utils/config.ts";
import connectDB from "./utils/dbConnect.ts";
import eventRouter from "./routes/event.ts";
import cors from "cors";

const app = express();

// connenct mongodb 
connectDB();

app.use(express.json());
app.use(cors());

// routers
app.use('/api/events', eventRouter);

app.listen(serverPort, () => {
  console.log(`Server running on ${serverPort}`);
})
