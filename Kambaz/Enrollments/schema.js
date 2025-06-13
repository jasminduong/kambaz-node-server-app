import mongoose from "mongoose";

// enrollment schema that implements a many to many Enrollments relationship 
// that relates user and course documents stored in the users and courses collections, 
// referred to by their model names CourseModel and UserModel respectively
const enrollmentSchema = new mongoose.Schema(
 {
   _id: String,
   course: { type: String, ref: "CourseModel" },
   user:   { type: String, ref: "UserModel"   },
 },
 { collection: "enrollments" }
);
export default enrollmentSchema;