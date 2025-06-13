import * as enrollmentsDao from "./dao.js";

// EnrollmentsRoutes expose the database operations of enrollments through a RESTful API
export default function EnrollmentsRoutes(app) {
  // enrolls user in a course
  app.post("/api/enrollments", async (req, res) => {
    const { user, course } = req.body;
    await enrollmentsDao.enrollUserInCourse(user, course);
    res.sendStatus(200);
  });

  // unenrolls user in a course
  app.delete("/api/enrollments/:userId/:courseId", async (req, res) => {
    console.log("=== UNENROLL ROUTE ===");
    const { userId, courseId } = req.params;
    console.log("User ID:", userId);
    console.log("Course ID:", courseId);

    try {
      const result = await enrollmentsDao.unenrollUserFromCourse(
        userId,
        courseId
      );
      console.log("Unenroll result:", result);
      res.json(result);
    } catch (error) {
      console.error("Error in unenroll route:", error);
      res.status(500).json({ error: "Failed to unenroll user" });
    }
  });

  // gets all enrollments for a user
  app.get("/api/enrollments/:userId", async (req, res) => {
    const userId = req.params.userId;
    const enrollments = await enrollmentsDao.findEnrollmentsByUser(userId);
    res.send(enrollments);
  });
}
