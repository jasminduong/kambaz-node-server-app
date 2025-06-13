import * as assignmentsDao from "./dao.js";

// AssignmentRoutes expose the database operations of routes through a RESTful API
export default function AssignmentRoutes(app) {
  // creates a new assignment
  app.post("/api/assignments", async (req, res) => {

    try {
      const assignment = await assignmentsDao.createAssignment(req.body);
      res.json(assignment);
    } catch (error) {
      res.status(500).json({ error: "Failed to create assignment" });
    } 
  });

  // deletes an assignment
  app.delete("/api/assignments/:assignmentId", async (req, res) => {
    const { assignmentId } = req.params;
    try {
      const status = await assignmentsDao.deleteAssignment(assignmentId);
      res.json(status);
    } catch (error) {
      res.status(500).json({ error: "Failed to delete assignment" });
    }
  });

  // updates an assignment
  app.put("/api/assignments/:assignmentId", async (req, res) => {
    const { assignmentId } = req.params;
    const assignmentUpdates = req.body;
    try {
      const status = await assignmentsDao.updateAssignment(
        assignmentId,
        assignmentUpdates
      );
      res.json(status);
    } catch (error) {
      res.status(500).json({ error: "Failed to update assignment" });
    }
  });
}
