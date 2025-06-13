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

const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kambaz"
mongoose.connect(CONNECTION_STRING);
// Add this debug code here:
mongoose.connection.on('connected', () => {
  console.log('✅ Connected to MongoDB successfully!');
  console.log('🔍 Database name:', mongoose.connection.name);
  console.log('🔍 Host:', mongoose.connection.host); 
  console.log('🔍 Is Atlas?', CONNECTION_STRING.includes('mongodb+srv') ? 'YES' : 'NO');
  console.log('🔍 Connection string (hidden):', CONNECTION_STRING.replace(/\/\/.*:.*@/, '//***:***@'));
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('🔌 Disconnected from MongoDB');
});

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
  secret: process.env.SESSION_SECRET || "kambaz-secret-key-change-in-production",
  resave: false,
  saveUninitialized: false,
  cookie: {
    sameSite: "lax",
    secure: false,
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 
  },
  name: 'kambaz.session'
};
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
