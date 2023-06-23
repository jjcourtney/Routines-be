import { Router } from "express";
import { dbFindOne } from "../../database";
import { Collection } from "../../types";

const scheduleRoute = Router();
const collection: Collection = "schedules";

// for testing / developement
const id = 1;

scheduleRoute.get("/", async (req, res) => {
  const response = await dbFindOne({ id }, collection);
  console.log(response);
  response
    ? res.json(response)
    : res.status(404).send(`Schedule with id ${id} Not found`);
});

export default scheduleRoute;
