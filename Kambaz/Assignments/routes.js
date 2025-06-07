import * as assignmentsDao from "./dao.js";

// AssignmentRoutes expose the database operations of routes through a RESTful API
export default function AssignmentRoutes(app) {
  // deletes an assignment
  app.delete("/api/assignments/:assignmentId", async (req, res) => {
    const { assignmentId } = req.params;
    console.log("DELETE endpoint hit with ID:", assignmentId);
    const status = await assignmentsDao.deleteAssignment(assignmentId);
    res.send(status);
  });

  // updates an assignment
  app.put("/api/assignments/:assignmentId", async (req, res) => {
    const { assignmentId } = req.params;
    const assignmentUpdates = req.body;
    const status = await assignmentsDao.updateAssignment(
      assignmentId,
      assignmentUpdates
    );
    res.send(status);
  });
}
