import express from "express";
import db from "./db";

const app = express();

// create database table traction
app.get("/create/table/traction", async (req, res) => {
  try {
    const client = await db.connect();
    await client.query("CREATE SCHEMA IF NOT EXISTS dashbaord");
    await client.query(`
      CREATE TABLE IF NOT EXISTS dashbaord.traction (
        id SERIAL PRIMARY KEY,
        channelNumber INTEGER NOT NULL,
        video INTEGER NOT NULL,
        comment INTEGER NOT NULL,
        reaction INTEGER NOT NULL,
        videoNFT INTEGER NOT NULL,
        videoNFTsales INTEGER NOT NULL,
        videoNFTTotalPrice INTEGER NOT NULL,
        YYPPayout INTEGER NOT NULL,
        block INTEGER NOT NULL,
        transactions INTEGER NOT NULL,
        extrinsics INTEGER NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `);
  } catch (err) {
    console.log(err);
  }
});
