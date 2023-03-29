// const express = require("express");
import express from "express";
// const colors = require("colors");
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoute.js";
import productRoutes from "./routes/ProductRoute.js";

//configure .env
dotenv.config();

//database config
connectDB();

//rest object
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// potr encolse in .env
const PORT = process.env.PORT || 8080;

//all routes

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/products", productRoutes);

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
