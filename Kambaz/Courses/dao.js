import Database from "../Database/index.js";
import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

// Courses dao.js implements various CRUD operations for handling the courses array in the Database

export async function findAllCourses() {
  return await model.find();
}

// function for finding all courses enrolled to display courses on dashboard
export async function findCoursesForEnrolledUser(userId) {
    const allCourses = await model.find();
}

// function for creating a new course
export async function createCourse(course) {
  const newCourse = { ...course, _id: uuidv4() };
  return await model.create(newCourse);
}

// function for deleting a course
export async function deleteCourse(courseId) {
  return await model.deleteOne({ _id: courseId });
}

// function for updating a course
export async function updateCourse(courseId, courseUpdates) {
  return await model.updateOne({ _id: courseId }, { $set: courseUpdates });
}
