import mongoose from "mongoose";

// coourseSchema describes the constraints of the documents stored in a collection,
// such as the names of the properties, their data types, and the name of the collection where the documents will be stored
const courseSchema = new mongoose.Schema(
  {
    _id: String,
    name: String,
    number: String,
    startDate: Date,
    endDate: Date,
    department: String,
    credits: Number,
    description: String,
    color: String,
    image: String,
  },
  { collection: "courses" }
);
export default courseSchema;
