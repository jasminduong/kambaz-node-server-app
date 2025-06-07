import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";

export function enrollUserInCourse(userId, courseId) {
  const { enrollments } = Database;

  const exists = enrollments.find(
    (e) => e.user === userId && e.course === courseId
  );
  if (!exists) {
    enrollments.push({ _id: uuidv4(), user: userId, course: courseId });
  }
}

export function unenrollUserFromCourse(userId, courseId) {
  const { enrollments } = Database;
  const index = enrollments.findIndex(
    (e) => e.user === userId && e.course === courseId
  );
  if (index !== -1) {
    enrollments.splice(index, 1);
  }
  return { status: "success" };
}

export function findEnrollmentsByUser(userId) {
  const { enrollments } = Database;
  return enrollments.filter((e) => e.user === userId);
}
