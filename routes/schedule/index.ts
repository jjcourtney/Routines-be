import express from "express";
import scheduleRoute from "./schedule";

const app = express();

app.use("/", scheduleRoute);

export default app;
