import { Collection, Db, MongoClient } from "mongodb";
import clientPromise from "./mongodb";
import { periodType } from "../types/types";

let client: MongoClient;
let db: Db;
let periods: Collection<periodType>;

async function init() {
  if (db) return;
  try {
    client = await clientPromise;
    db = client.db();
    periods = db.collection("period");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to establish connection to database");
  }
}

(async () => {
  await init();
})();

export const createPeriod = async (periodData: periodType) => {
  try {
    if (!periods) await init();

    const result = await periods.insertOne(periodData);
    if (result.insertedId) {
      const insertedPeriod = await periods.findOne({
        _id: result.insertedId,
      });
      if (insertedPeriod) {
        return { period: insertedPeriod };
      } else {
        return { error: "Failed to retrieve the created period" };
      }
    } else {
      return { error: "Failed to create period" };
    }
  } catch (error) {
    console.error(error);
    return { error: "Failed to create period" };
  }
};

export const getPeriods = async () => {
  try {
    if (!periods) await init();
    const result = await periods.find({}).toArray();
    return { periods: result };
  } catch (error) {
    return { error: "Failed to fetch periods" };
  }
};

export const getCurrentPeriods = async () => {
  try {
    if (!periods) await init();

    const currentDate = new Date().toISOString();

    const filter = {
      $or: [
        {
          // Check if current ISO date string is within the preparation period
          "preparationPeriod.start": { $lte: currentDate },
          "preparationPeriod.end": { $gte: currentDate },
        },
        {
          // Check if current ISO date string is within the application period
          "applicationPeriod.start": { $lte: currentDate },
          "applicationPeriod.end": { $gte: currentDate },
        },
        {
          // Check if current ISO date string is within the interview period
          "interviewPeriod.start": { $lte: currentDate },
          "interviewPeriod.end": { $gte: currentDate },
        },
      ],
    };

    const result = await periods.find(filter).toArray();

    return { result: result };
  } catch (error) {
    console.error(error);
    return { error: "Failed to fetch periods" };
  }
};
