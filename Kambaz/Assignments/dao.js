import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";

// Assignments dao.js implements various CRUD operations for handling the assignments array in the Database

// function to find assignments by its course id
export function findAssignmentsForCourse(courseId) {
  const { assignments } = Database;
  return assignments.filter((assignment) => assignment.course === courseId);
}

// function to create a new assignment
export function createAssignment(assignment) {
  const newAssignment = { ...assignment, _id: uuidv4() };
  Database.assignments = [...Database.assignments, newAssignment];
  return newAssignment;
}

// function to updates an assignment
export function updateAssignment(assignmentId, assignmentUpdates) {
  const { assignments } = Database;
  const assignment = assignments.find(
    (assignment) => assignment._id === assignmentId
  );
  Object.assign(assignment, assignmentUpdates);
  return assignment;
}

// function to delete an assignment
export function deleteAssignment(assignmentId) {
  console.log("Deleting assignment with ID:", assignmentId);
  const { assignments } = Database;
  Database.assignments = assignments.filter(
    (assignment) => assignment._id !== assignmentId
  );
}
