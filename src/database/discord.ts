import express from "express";
import db from "./db";

const app = express();

// create database table discord
app.get("/create/table/discord", async (req, res) => {
  try {
    const client = await db.connect();
    await client.query("CREATE SCHEMA IF NOT EXISTS dashbaord");
    await client.query(`
      CREATE TABLE IF NOT EXISTS dashbaord.discord (
        id SERIAL PRIMARY KEY,
        usersMembers INTEGER NOT NULL,
        messageNumbers INTEGER NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `);
  } catch (err) {
    console.log(err);
  }
});
