import express from "express";
import { connectDb } from "./config/mongodb";
import { apiV1 } from "./routes/v1";
import cors from "cors";
const app = express();
const hostname = "localhost";
const port = 8017;
//BvYLy0183PpfYCkx
//mongodb+srv://anduy1712:<password>@cluster0.adawb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

const bootServer = () => {
  app.get("/", (req, res) => {
    res.end("<h1>Hello World!</h1><hr>");
  });
  //Enabled req body
  app.use(express.json());
  app.use(function (err, req, res, next) {
    console.log(err);
  });
  app.use(cors());
  //Routes
  app.use("/v1", apiV1);
  app.listen(port, hostname, () => {
    console.log(`Hello Ann, I am running at ${hostname}:${port}/`);
  });
};

connectDb()
  .then(() => console.log("Connect successfull"))
  .then(() => bootServer())
  .catch((error) => console.log(error));
