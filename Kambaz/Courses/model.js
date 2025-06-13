import mongoose from "mongoose";
import schema from "./schema.js";

/* Mongoose models provide functions to interact with the collection such as find(), create(), updateOne(), and deleteOne()*/
// course model declares a unique name that can be used as a reference from other mongoose schemas
const model = mongoose.model("CourseModel", schema);
export default model;
