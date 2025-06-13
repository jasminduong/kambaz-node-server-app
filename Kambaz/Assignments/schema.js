import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    _id: String,
    title: String,           
    name: String,            
    description: String,
    course: String,         
    module: String,         
    points: Number,          
    availableDate: Date,     
    dueDate: Date,           
  },
  { collection: "assignments" }
);

export default schema;