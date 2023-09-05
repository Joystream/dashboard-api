import express from "express";
import db from "./db";

const app = express();

app.get("/create/table/twitter", async (req, res) => {
  try {
    const client = await db.connect();
    await client.query("CREATE SCHEMA IF NOT EXISTS dashbaord");
    await client.query(`
        CREATE TABLE IF NOT EXISTS dashbaord.twitter (
          id SERIAL PRIMARY KEY,
          followMembers INTEGER NOT NULL,
          collageMembers INTEGER NOT NULL,
          created_at TIMESTAMP NOT NULL DEFAULT NOW()
        )
      `);
  } catch (err) {
    console.log(err);
  }
});
