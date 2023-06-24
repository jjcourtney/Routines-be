import { Router, json } from "express";
import { dbFindOne, getLowestAvailableId, insertOne } from "../../database";
import { Collection } from "../../types";
import { get } from "http";

const scheduleRoute = Router();
const collection: Collection = "schedules";

// for testing / developement
// const id = 1;

scheduleRoute.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  const response = await dbFindOne({ id }, collection);
  console.log(response);
  response
    ? res.json(response)
    : res.status(404).send(`Schedule with id ${id} Not found`);
});

scheduleRoute.post("/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  const response = await dbFindOne({ id }, collection);
  console.log(response);
  response
    ? res.json(response)
    : res.status(404).send(`Schedule with id ${id} Not found`);
});

scheduleRoute.post("/", json(), async (req, res) => {
  const id = await getLowestAvailableId();
  console.log(`adding ${id} to database`);
  console.log(req.body);
  const { name } = req.body;
  const response = await insertOne({ id, name }, collection);
  console.log(response);
  response
    ? res.json(`${response}`)
    : res.status(404).send(`Failed to write ${name} to database`);
});

export default scheduleRoute;
