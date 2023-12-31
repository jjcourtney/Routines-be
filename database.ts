import { MongoClient } from "mongodb";

import * as dotenv from "dotenv";
import { Collection, RoutineQuery } from "./types";

dotenv.config();

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

const uri = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.nwry9.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

// use dbFind(query).catch(console.dir); to run the query
export async function dbFind(query: RoutineQuery, collection: Collection) {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    const db = client.db("routines");
    const routine = db.collection(collection);
    const result = await routine.find(query).toArray();

    return result;
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

// use dbFindOne(query).catch(console.dir); to run the query
export async function dbFindOne(query: RoutineQuery, collection: Collection) {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    const db = client.db("routines");
    const routine = db.collection(collection);
    const result = await routine.findOne(query);
    return result;
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

export async function getLowestAvailableId(): Promise<number> {
  const allSchedules = await dbFind({}, "schedules");

  if (!allSchedules) return 1;
  const allIds = allSchedules.map((schedule) => schedule.id);

  return findSmallestPositiveInteger(allIds) || 9999;
}

export async function insertOne(query: RoutineQuery, collection: Collection) {
  await client.connect();
  const db = client.db("routines");
  const routine = db.collection(collection);
  const { acknowledged } = await routine.insertOne(query);
  await client.close();

  return acknowledged;
}

function findSmallestPositiveInteger(ids: number[]) {
  const lookup = new Set(ids);
  let i = 1;
  while (lookup.has(i)) {
    i++;
  }
  return i;
}
