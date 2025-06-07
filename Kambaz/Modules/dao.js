import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";

// Modules dao.js implements various CRUD operations for handling the modules array in the Database

// function to find modules by its course id
export function findModulesForCourse(courseId) {
  const { modules } = Database;
  return modules.filter((module) => module.course === courseId);
}

// function to create a new module
export function createModule(module) {
  const newModule = { ...module, _id: uuidv4() };
  Database.modules = [...Database.modules, newModule];
  return newModule;
}

// function to delete a module
export function deleteModule(moduleId) {
  const { modules } = Database;
  Database.modules = modules.filter((module) => module._id !== moduleId);
}

// function to updates a module 
export function updateModule(moduleId, moduleUpdates) {
  const { modules } = Database;
  const module = modules.find((module) => module._id === moduleId);
  Object.assign(module, moduleUpdates);
  return module;
}
