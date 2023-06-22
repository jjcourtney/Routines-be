import { Router } from "express";

const routineRoute = Router();

routineRoute.get("/", async (req, res) => {
  res.send("Routine");
});

export default routineRoute;
