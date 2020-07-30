require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const app = express();

const http = require("http").Server(app);
const setupWebSocket = require("./setup-websocket");

app.use(express.json());
setupWebSocket(http);

mongoose
  .connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    try {
      return http.listen(process.env.PORT, listenPort);
    } catch (e) {
      return e;
    }
  })
  .catch((e) => e);

const listenPort = (err) => {
  if (err) return err;
  if (process.env.ENVIROMENT === "development") {
    console.log(`Runing on port: ${process.env.PORT}`);
  }
};
