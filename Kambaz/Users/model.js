import mongoose from "mongoose";
import schema from "./schema.js";

/* Mongoose models implement a low level API to interact with MongoDB collections programmatically */
/* Models provide CRUD (Create Read Update Delete) functions such as: find(), create(), updateOne(), removeOne() */ 
/* The functions provided by Mongoose models are deliberately generic 
because they can interact with any collection configured in the schema */

const model = mongoose.model("UserModel", schema); // create mongoose model from the schema
export default model; // export so it can be used elsewhere