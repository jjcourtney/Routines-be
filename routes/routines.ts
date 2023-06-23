import { Router } from "express";
import scheduleRoute from "./schedule";

const routineRoute = Router();

routineRoute.use("/schedule", scheduleRoute);

routineRoute.get("/", async (req, res) => {
  res.send("Routine");
});

export default routineRoute;
