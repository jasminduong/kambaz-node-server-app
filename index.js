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

const app = express();
const allowedOrigins = [
  "https://jasminduong-kambaz.netlify.app",
  "http://localhost:5173",
];
app.use(
  cors({
    // governs the policies and mechanisms of how various resources can be shared across different domains or origins
    credentials: true, // support cookies
    origin: allowedOrigins // use different front end URL in dev and in production
  })
);
const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kambaz",
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

app.use(express.json()); // encoding the data as JSON in the HTTP request body allows for arbitrarily large amounts of data and secure data encryption

UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
EnrollmentsRoutes(app);

Lab5(app); // pass reference to express module
Hello(app);
app.listen(process.env.PORT || 4000);
