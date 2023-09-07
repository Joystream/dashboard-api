import express from "express";
import cors from "cors";
import cron from "node-cron";
import path from "path";
import fs from "fs";
import { log } from "./utils/debug";
import getCarouselData from "./apis/get-carousel-data";
import getCirculatingSupply from "./apis/get-circulating-supply";
import getTotalSupply from "./apis/get-total-supply";
import { Client, ClientOptions } from "discord.js";

import price from "./routes/price";
import criculatingSupply from "./routes/criculatingSupply";
import totalSupply from "./routes/totalSupply";
import budgets from "./routes/budgets";
import carouselData from "./routes/carouselData";

const options: ClientOptions = {
  intents: [
    "GuildMembers", // Specify the GUILDS intent
    "Guilds",
  ],
};

const client = new Client(options);

const app = express();
const port = process.env.PORT || 8081;

const CAROUSEL_DATA_PATH = path.join(__dirname, "../carousel-data.json");
const TOTAL_SUPPLY_DATA_PATH = path.join(
  __dirname,
  "../total-supply-data.json"
);

const CIRCULATING_SUPPLY_DATA_PATH = path.join(
  __dirname,
  "../circulating-supply-data.json"
);
app.use(cors());
app.use(express.json());

const scheduleCronJob = async () => {
  console.log("Scheduling cron job...");

  const fetchAndWriteCarouselData = async () => {
    const carouselData = await getCarouselData();

    fs.writeFileSync(CAROUSEL_DATA_PATH, JSON.stringify(carouselData, null, 2));
  };

  const fetchAndWriteSupplyData = async () => {
    const circulatingSupplyData = await getCirculatingSupply();
    const totalSupplyData = await getTotalSupply();

    fs.writeFileSync(
      CIRCULATING_SUPPLY_DATA_PATH,
      JSON.stringify(circulatingSupplyData, null, 2)
    );
    fs.writeFileSync(
      TOTAL_SUPPLY_DATA_PATH,
      JSON.stringify(totalSupplyData, null, 2)
    );
  };

  // Fetch data initially such that we have something to serve. There will at most
  // be a buffer of 5 minutes from this running until the first cron execution.
  if (
    !fs.existsSync(CIRCULATING_SUPPLY_DATA_PATH) ||
    !fs.existsSync(TOTAL_SUPPLY_DATA_PATH)
  )
    await fetchAndWriteSupplyData();
  if (!fs.existsSync(CAROUSEL_DATA_PATH)) await fetchAndWriteCarouselData();

  cron.schedule("*/5 * * * *", fetchAndWriteCarouselData);
  cron.schedule("*/5 * * * *", fetchAndWriteSupplyData);
};

app.use("./price", price);
app.use("./circulatingSupply", criculatingSupply);
app.use("./totalSupply", totalSupply);
app.use("./budgets", budgets);
app.use("./carouselData", carouselData);

client.on("ready", () => {
  console.log(`Logged in as ${client.user?.tag}!`);
});

client.on("message", async (msg) => {
  if (msg.content === "!membercount") {
    const guild = client.guilds.cache.get(
      String(process.env.DISCORD_SERVER_ID)
    );
    const memberCount = guild?.members.cache.size;
    await msg.reply(`The member count of this server is ${memberCount}.`);
  }
});

client.login(process.env.DISCORD_TOKEN);

scheduleCronJob().then(() => {
  app.listen(port, () => {
    log(`server started at http://localhost:${port}`);
  });
});
