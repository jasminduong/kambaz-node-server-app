import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";

// Courses dao.js implements various CRUD operations for handling the courses array in the Database

export function findAllCourses() {
  return Database.courses;
}

// function for finding all courses enrolled to display courses on dashboard
export function findCoursesForEnrolledUser(userId) {
  const { courses, enrollments } = Database;
  const enrolledCourses = courses.filter((course) =>
    enrollments.some(
      (enrollment) =>
        enrollment.user === userId && enrollment.course === course._id
    )
  );
  return enrolledCourses;
}

// function for creating a new course
export function createCourse(course) {
  const newCourse = { ...course, _id: uuidv4() }; // given a new unique identifier and sent back to the client in the response
  Database.courses = [...Database.courses, newCourse]; // appended to the end of the courses array in the Database
  return newCourse;
}

// function for deleting a course
export function deleteCourse(courseId) {
  const { courses, enrollments } = Database;
  Database.courses = courses.filter((course) => course._id !== courseId);
  Database.enrollments = enrollments.filter(
    (enrollment) => enrollment.course !== courseId
  );
}

// function for updating a course
export function updateCourse(courseId, courseUpdates) {
    const { courses } = Database;
    const course = courses.find((course) => course._id === courseId);
    Object.assign(course, courseUpdates);
    return course;
  }
  
