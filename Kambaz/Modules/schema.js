import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    _id: String,
    name: String,
    description: String,
    course: { type: String, ref: "CourseModel" }, 
    // the course field is declared as type String to store a primary key value
    // the ref properaty set to the value CourseModel is the same value as the name of the courses model stored in the courses collection
    // the ref property establishes that the primary key stored in course refers to a document stored in the courses collection
    // = one to many relationship
  },
  { collection: "modules" }
);
export default schema;