// const express = require("express");
import express from "express";
// const colors = require("colors");
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";

//configure .env
dotenv.config();

//database config
connectDB();

//rest object
const app = express();

//middleware
app.use(express.json());
app.use(morgan("dev"));

// potr encolse in .env
const PORT = process.env.PORT || 8080;

//res api
app.get("/", (req, res) => {
  res.send({
    mesege: "welcome to ecommerce MERN stack app",
  });
});

app.listen(PORT, () => {
  console.log(
    `server is running on ${process.env.DEV_MODE}mode on localhost://${PORT}`
      .bgMagenta.green
  );
});
