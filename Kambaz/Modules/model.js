import mongoose from "mongoose";
import schema from "./schema.js";

// mongoose model interacts with the module collection in the database
// implements various functions to implement CRUD operations such as find(), create(), deleteOne(), updateOne()
const model = mongoose.model("ModuleModel", schema);
export default model;