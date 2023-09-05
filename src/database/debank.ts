import express from "express";
import db from "./db";

const app = express();

// create database table debank
app.get("/create/table/debank", async (req, res) => {
  try {
    const client = await db.connect();
    await client.query("CREATE SCHEMA IF NOT EXISTS dashbaord");
    await client.query(`
      CREATE TABLE IF NOT EXISTS dashbaord.debank (
        id SERIAL PRIMARY KEY,
        followMembers INTEGER NOT NULL,
        postNumbers INTEGER NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `);
  } catch (err) {
    console.log(err);
  }
});
