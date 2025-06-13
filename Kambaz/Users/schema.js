import mongoose from "mongoose";
/* Mongoose Schemas describe the structure of the data being stored in the database 
and it's used to validate the data being stored or modified through the Mongoose library */

// describes the structure for the users collection
const userSchema = new mongoose.Schema({ // create the schema
    _id: String, // primary key name is _id of type String
    username: { type: String, required: true, unique: true }, // String field that is required and unique
    password: { type: String, required: true }, // String field that in required but not unique
    firstName: String, // String fields with no additional configurations
    email: String,
    lastName: String,
    dob: Date, // Date field with no configurations 
    role: {
      type: String, // String field 
      enum: ["STUDENT", "FACULTY", "ADMIN", "USER"], // allowed string values 
      default: "USER", // default value if not provided
    },
    loginId: String,
    section: String,
    lastActivity: Date,
    totalActivity: String,
  },
  { collection: "users" } // store data in "users" collection
);
export default userSchema; 


