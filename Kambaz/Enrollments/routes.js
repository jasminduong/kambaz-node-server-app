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
    const { userId, courseId } = req.params;

    try {
      const result = await enrollmentsDao.unenrollUserFromCourse(
        userId,
        courseId
      );
      res.json(result);
    } catch (error) {
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
