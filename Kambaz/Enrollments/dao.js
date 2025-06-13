import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

// Enrollments dao.js implements various CRUD operations for handling enrollments in MongoDB

// function to add user to a course
export async function enrollUserInCourse(userId, courseId) {

  try {
    const newEnrollment = {
      _id: uuidv4(),
      user: userId,
      course: courseId,
    };
    const result = await model.create(newEnrollment);
    return result;
  } catch (error) {
    throw error;
  }
}

// function to remove user from a course
export async function unenrollUserFromCourse(userId, courseId) {

  try {
    // First, let's see if the enrollment exists
    const existingEnrollment = await model.findOne({
      user: userId,
      course: courseId,
    });

    if (!existingEnrollment) {
      const userEnrollments = await model.find({ user: userId });
    }

    const result = await model.deleteOne({ user: userId, course: courseId });
    return result;
  } catch (error) {
    throw error;
  }
}

// function for finding all enrollments by user
export async function findEnrollmentsByUser(userId) {

  try {
    const result = await model.find({ user: userId });
    return result;
  } catch (error) {
    throw error;
  }
}

// function for finding users enrolled in a course
export async function findUsersForCourse(courseId) {

  try {
    const result = await model.find({ course: courseId });
    return result;
  } catch (error) {
    throw error;
  }
}
