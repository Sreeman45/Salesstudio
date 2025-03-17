import express from "express";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cors from 'cors';
dotenv.config();
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors({
  credentials:true
  
}))
let usersIp = [];
const coupons = [
  "ABCDEF5678",
  "ABCDEF5679",
  "ABCDEF5680",
  "ABCDEF5681",
  "ABCDEF5682",
  "ABCDEF5683",
  "ABCDEF5684",
  "ABCDEF5685",
  "ABCDEF5686",
  "ABCDEF5687",
  "ABCDEF5688",
];

const hour = 60 * 60 * 1000;
const cookieChecker = (req, res, next) => {
  const ip = usersIp.find((user) => user.ip === req.ip);

  try {
    if (ip) {
      const time = jwt.verify(req?.cookies?.token, process.env.key);
      const timenow = new Date().getTime();
      const timediff = timenow - time;
      let timeleft=3600000-timediff
      const convertTime = (milliseconds) => {
        let seconds = Math.floor(milliseconds / 1000);
        let minutes = Math.floor(seconds / 60);
        let remaingSeconds = Math.floor(seconds % 60);
        
        return { minutes, remaingSeconds };
      };
      if (timeleft < hour) {
        let { minutes, remaingSeconds } = convertTime(timeleft);
        return res.status(501).json({
          success: false,
          message: `you can claim after ${minutes} min and ${remaingSeconds} sec`,
        });
      }
    }
  } catch (err) {
    console.log("JSONERROR" + err);
  }
  

  return next();
};
app.use(cookieChecker);
let i = 0;
app.get("/claim", (req, res) => {
  let date = Date.now();
  usersIp = [...usersIp, { ip: req.ip, token: date }];
  console.log("came...");
  try {
    const token = jwt.sign(date, process.env.key);
    res.cookie("token", token, {
      maxAge: 60 * 60 * 1000,
      secure: true,
      sameSite:'none',
      httpOnly:true,
      
    });
  } catch (err) {
    console.log(err);
  }
  if (i > coupons.length - 1) {
    i = 0;
  } 
  return res.json({
    success: true,
    message: "Sucess",
    code: coupons[i++],
  });
});
export default app;
