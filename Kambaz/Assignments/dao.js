import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

// Assignments dao.js implements various CRUD operations for handling the assignments array in the Database

// function to find assignments by its course id
export async function findAssignmentsForCourse(courseId) {
  try {
    const result = await model.find({ course: courseId });
    return result;
  } catch (error) {
    console.error("Error finding assignments:", error);
    throw error;
  }
}

// function to create a new assignment
export async function createAssignment(assignment) {

  const newAssignment = { ...assignment, _id: uuidv4() };

  try {
    const result = await model.create(newAssignment);
    return result;
  } catch (error) {
    throw error;
  }
}

// function to update an assignment
export async function updateAssignment(assignmentId, assignmentUpdates) {
  try {
    const result = await model.updateOne(
      { _id: assignmentId },
      { $set: assignmentUpdates }
    );
    return result;
  } catch (error) {
    console.error("Error updating assignment:", error);
    throw error;
  }
}

// function to delete an assignment
export async function deleteAssignment(assignmentId) {
  try {
    const result = await model.deleteOne({ _id: assignmentId });
    return result;
  } catch (error) {
    console.error("Error deleting assignment:", error);
    throw error;
  }
}
