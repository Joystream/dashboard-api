import express from "express";
import db from "./db";

const app = express();

// create database table github
app.get("/create/table/github", async (req, res) => {
  try {
    const client = await db.connect();
    await client.query("CREATE SCHEMA IF NOT EXISTS dashbaord");
    await client.query(`
      CREATE TABLE IF NOT EXISTS dashbaord.github (
        id SERIAL PRIMARY KEY,
        contributorsNumber INTEGER NOT NULL,
        commitNumbers INTEGER NOT NULL,
        releaseNumbers INTEGER NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `);
  } catch (err) {
    console.log(err);
  }
});
