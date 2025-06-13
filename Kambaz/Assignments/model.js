import mongoose from "mongoose";
import schema from "./schema.js";

// mongoose model interacts with the assignments collection in the database
const model = mongoose.model("AssignmentModel", schema);
export default model;