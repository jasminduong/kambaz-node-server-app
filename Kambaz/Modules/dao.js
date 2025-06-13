import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

// Modules dao.js implements various CRUD operations for handling the modules array in the Database

// function to find modules by its course id
export async function findModulesForCourse(courseId) {
  return await model.find({ course: courseId });
}

// function to create a new module
export async function createModule(module) {
  const newModule = { ...module, _id: uuidv4() };
  return await model.create(newModule);
}

// function to delete a module
export async function deleteModule(moduleId) {
  return await model.deleteOne({ _id: moduleId });
}

// function to updates a module
export async function updateModule(moduleId, moduleUpdates) {
  return await model.updateOne({ _id: moduleId }, moduleUpdates);
}
