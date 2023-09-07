import express from "express";
import db from "./db";

const app = express();

// create database table tokenInfo
app.get("/create/table/tokenInfo", async (req, res) => {
  try {
    const client = await db.connect();
    await client.query("CREATE SCHEMA IF NOT EXISTS dashbaord");
    await client.query(`
      CREATE TABLE IF NOT EXISTS dashbaord.tokenInfo (
        id SERIAL PRIMARY KEY,
        circulatinSupply INTEGER NOT NULL,
        totalSupply INTEGER NOT NULL,
        totalMinting INTEGER NOT NULL,
        rewardMinting INTEGER NOT NULL,
        spendProposalMinting INTEGER NOT NULL,
        validatorPayoutMinting INTEGER NOT NULL,
        creatorPayoutMinting INTEGER NOT NULL,
        stakeTokens INTEGER NOT NULL,
        stakingAPR INTEGER NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `);
  } catch (err) {
    console.log(err);
  }
});
