import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/auth_route';
import jobRoutes from './routes/job_route';
import locationRoutes from './routes/location_route';
import userRoutes from './routes/user_route';
import workTypeRoutes from './routes/work_type';
import JobApplicationRoutes from './routes/jobapplication_routes';
import tagRoutes from './routes/tag_route'
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import { getCV, uploadCV } from './controllers/user_controller';
import cors from 'cors'


dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const uploadDirectory = 'uploads';

const corsOptions = {
  origin: '*'
};

app.use(cors(corsOptions));


app.use(express.urlencoded({ limit: "1000mb", extended: true, parameterLimit: 50000 }));
app.use(express.json({ limit: "2mb" }));
app.use('/uploads', express.static(uploadDirectory));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage })

app.use("/v1", authRoutes);
app.use("/v1", jobRoutes);
app.use("/v1", locationRoutes);
app.use("/v1", workTypeRoutes);
app.use("/v1", JobApplicationRoutes);
app.use("/v1", tagRoutes);


app.use((req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const tokenArray = token.split(" ");
    const tokenValue = tokenArray[1];
    const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET)
    req.user = decoded?.user;
    
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
})

app.use('/v1/users/cv', upload.single("file"), uploadCV)
app.use('/v1/cv/download', getCV)
app.use("/v1", userRoutes);

app.use((error, req, res, next) => {
  const status = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;

  const message =
    error.message || "Something went wrong, please try again later";

  res.status(status).json({ code: status, message });
});

mongoose
  .connect(process.env.MONGODB_URI || "", { appName: process.env.APP_NAME })
  .then((result) => {
    console.log("MongoDB Connected!");
  })
  .catch((error) => {
    console.log(`ERROR :: MongoDB Connection :: ${error}`);
  });

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});