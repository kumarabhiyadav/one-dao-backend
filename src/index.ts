import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

import { DataBaseConnect } from './database/connection';
import User from "./users/user.model";
import morgan from "morgan";
import Product from "./product/product.model";
import { errorHandler } from "./Helper/globalErrorHandler";
import OTP from "./auth/otp.model";
dotenv.config();

const mainRoutes = require("./mainroutes.routes");

const app = express();
const port = process.env.PORT;

app.use(
  cors({
    origin: "*",
  })
);

app.set('trust proxy', true);

app.use(morgan('combined'))

app.use(express.json({ limit: "500mb" }));


// ############### === DB CONNECTION === ########################


(async () => {
  await DataBaseConnect();
  await User.sync({
    force:true
  }); 
  await Product.sync({
    force:true
  }); 
  await OTP.sync({
    force:true
  }); 

  Product.belongsTo(User, {
    foreignKey: 'user',
  });
  

})();

// ############### === DB CONNECTION END === ########################

app.use("/api", mainRoutes);

app.use(errorHandler);
// Status Check
app.get("/", (req, res) => {
  res.send("Serving on port" + port);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
