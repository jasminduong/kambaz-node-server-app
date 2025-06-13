import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

// Enrollments dao.js implements various CRUD operations for handling enrollments in MongoDB

// function to add user to a course
export async function enrollUserInCourse(userId, courseId) {
  console.log("=== ENROLL USER DAO ===");
  console.log("User ID:", userId);
  console.log("Course ID:", courseId);

  try {
    const newEnrollment = {
      _id: uuidv4(),
      user: userId,
      course: courseId,
    };

    console.log("Creating enrollment:", newEnrollment);
    const result = await model.create(newEnrollment);
    console.log("Enrollment created:", result);
    return result;
  } catch (error) {
    console.error("Error enrolling user:", error);
    throw error;
  }
}

// function to remove user from a course
export async function unenrollUserFromCourse(userId, courseId) {
  console.log("=== UNENROLL USER DAO ===");
  console.log("User ID:", userId);
  console.log("Course ID:", courseId);

  try {
    // First, let's see if the enrollment exists
    const existingEnrollment = await model.findOne({
      user: userId,
      course: courseId,
    });
    console.log("Existing enrollment found:", existingEnrollment);

    if (!existingEnrollment) {
      console.log("❌ No enrollment found to delete!");
      console.log("Let's check what enrollments exist for this user:");

      const userEnrollments = await model.find({ user: userId });
      console.log("User's enrollments:", userEnrollments);

      console.log(
        "User field values:",
        userEnrollments.map((e) => e.user)
      );
      console.log(
        "Course field values:",
        userEnrollments.map((e) => e.course)
      );
    }

    const result = await model.deleteOne({ user: userId, course: courseId });
    console.log("Delete result:", result);
    return result;
  } catch (error) {
    console.error("Error unenrolling user:", error);
    throw error;
  }
}

// function for finding all enrollments by user
export async function findEnrollmentsByUser(userId) {
  console.log("=== FIND ENROLLMENTS DAO ===");
  console.log("User ID:", userId);

  try {
    const result = await model.find({ user: userId });
    console.log("Found enrollments:", result.length);
    return result;
  } catch (error) {
    console.error("Error finding enrollments:", error);
    throw error;
  }
}

// function for finding users enrolled in a course
export async function findUsersForCourse(courseId) {
  console.log("=== FIND USERS FOR COURSE DAO ===");
  console.log("Course ID:", courseId);

  try {
    const result = await model.find({ course: courseId });
    console.log("Found users for course:", result.length);
    return result;
  } catch (error) {
    console.error("Error finding users for course:", error);
    throw error;
  }
}
