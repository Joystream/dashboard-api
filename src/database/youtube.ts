import express from "express";
import db from "./db";

const app = express();

// create database table youtube
app.get("/create/table/youtube", async (req, res) => {
  try {
    const client = await db.connect();
    await client.query("CREATE SCHEMA IF NOT EXISTS dashbaord");
    await client.query(`
      CREATE TABLE IF NOT EXISTS dashbaord.youtube (
        id SERIAL PRIMARY KEY,
        followMembers INTEGER NOT NULL,
        videosNumber INTEGER NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `);
  } catch (err) {
    console.log(err);
  }
});
