import express from "express";
import session from "express-session";
import Hello from "./Hello.js";
import Lab5 from "./Lab5/index.js";
import cors from "cors";
import UserRoutes from "./Kambaz/Users/routes.js";
import "dotenv/config";
import CourseRoutes from "./Kambaz/Courses/routes.js";
import ModuleRoutes from "./Kambaz/Modules/routes.js";
import AssignmentRoutes from "./Kambaz/Assignments/routes.js";
import EnrollmentsRoutes from "./Kambaz/Enrollments/routes.js";
import mongoose from "mongoose";

const CONNECTION_STRING =
  process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kambaz";
mongoose.connect(CONNECTION_STRING);

const app = express();

const allowedOrigins = [
  "https://jasminduong-kambaz.netlify.app",
  "http://localhost:5173",
];

app.use(
  cors({
    credentials: true,
    origin: allowedOrigins,
  })
);

const sessionOptions = {
  secret:
    process.env.SESSION_SECRET || "kambaz-secret-key-change-in-production",
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  // in production turn on proxy support configure cookies for remote server
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
  };
}

app.use(session(sessionOptions));

app.use(express.json());

UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
EnrollmentsRoutes(app);

Lab5(app);
Hello(app);

app.listen(process.env.PORT || 4000);
