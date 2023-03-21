const express = require("express");
// const { logger } = require("./accounts/accounts-middleware");
const accountsRouter = require("./accounts/accounts-router");

const server = express();

server.use(express.json());
// server.use(logger);

server.use("/api/accounts", accountsRouter);

server.use("*", (req, res) => {
  res.status(404);
  json({
    message: "not found",
  });
});

module.exports = server;
