import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";

// Enrollments dao.js implements various CRUD operations for handling the array of enrollment of users in the Database

// function to add user to a course
export function enrollUserInCourse(userId, courseId) {
  const { enrollments } = Database;
  enrollments.push({ _id: uuidv4(), user: userId, course: courseId });
}

// function to remove user from a course
export function unenrollUserFromCourse(userId, courseId) {
  const { enrollments } = Database;
  const index = enrollments.findIndex(
    (e) => e.user === userId && e.course === courseId
  );
  if (index !== -1) {
    enrollments.splice(index, 1);
  }
}

// function for finding all courses enrolled to by the user
export function findEnrollmentsByUser(userId) {
  const { enrollments } = Database;
  return enrollments.filter((e) => e.user === userId);
}

