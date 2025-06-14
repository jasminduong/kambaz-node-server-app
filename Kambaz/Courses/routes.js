import * as dao from "./dao.js";
import * as modulesDao from "../Modules/dao.js";
import * as assignmentsDao from "../Assignments/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js"; 
import * as usersDao from "../Users/dao.js";

// CourseRoutes expose the database operations of courses through a RESTful API
export default function CourseRoutes(app) {
  // retrieves all courses
  app.get("/api/courses", async (req, res) => {
    const courses = await dao.findAllCourses();
    res.send(courses);
  });

  // creates a course
  app.post("/api/courses", async (req, res) => {
    const currentUser = req.session.currentUser;

    if (!currentUser) {
      return res.status(401).json({ error: "No user in session" });
    }

    if (currentUser.role !== "FACULTY") {
      return res
        .status(401)
        .json({ error: `User role is ${currentUser.role}, not FACULTY` });
    }

    try {
      const course = await dao.createCourse(req.body);
      res.json(course);
    } catch (err) {
      res.status(500).json({ error: "Server error creating course" });
    }
  });

  // deletes a course
  app.delete("/api/courses/:courseId", async (req, res) => {
    const { courseId } = req.params; // parses course's id from url
    const status = await dao.deleteCourse(courseId);
    res.send(status); // if the deletion was successful, respond with status 204
  });

  // updates a course
  app.put("/api/courses/:courseId", async (req, res) => {
    const { courseId } = req.params;
    const courseUpdates = req.body;

    const currentUser = req.session.currentUser;
    if (!currentUser || currentUser.role !== "FACULTY") {
      return res.status(401).json({ error: "Not authorized" });
    }

    try {
      const status = await dao.updateCourse(courseId, courseUpdates);
      res.json({ ...courseUpdates, _id: courseId });
    } catch (error) {
      res.status(500).json({ error: "Server error updating course" });
    }
  });

  // finds modules for a course
  app.get("/api/courses/:courseId/modules", async (req, res) => {
    const { courseId } = req.params;
    const modules = await modulesDao.findModulesForCourse(courseId);
    res.json(modules);
  });

  // creates a new module for the course
  app.post("/api/courses/:courseId/modules", async (req, res) => {
    const { courseId } = req.params;
    const module = {
      ...req.body,
      course: courseId,
    };
    const newModule = await modulesDao.createModule(module);
    res.send(newModule);
  });

  // finds assignments for a course
  app.get("/api/courses/:courseId/assignments", async (req, res) => {
    const { courseId } = req.params;
    const assignments = await assignmentsDao.findAssignmentsForCourse(courseId);
    res.json(assignments);
  });

  // creates a new assignment for the course
  app.post("/api/courses/:courseId/assignments", async (req, res) => {
    const { courseId } = req.params;
    const assignment = {
      ...req.body,
      course: courseId,
    };
    const newAssignment = await assignmentsDao.createAssignment(assignment);
    res.send(newAssignment);
  });

  // find users for a course
  const findUsersForCourse = async (req, res) => {
    const { cid } = req.params;
    
    try {
      // get enrollments for this course
      const enrollments = await enrollmentsDao.findUsersForCourse(cid);
      
      // extract user IDs from enrollments
      const userIds = enrollments.map(e => e.user);
      
      // get full user data for each enrolled user
      const users = await Promise.all(
        userIds.map(userId => usersDao.findUserById(userId))
      );
      
      // filter out any null results
      const validUsers = users.filter(user => user !== null);
      
      res.json(validUsers);
    } catch (error) {
      res.status(500).json({ error: "Failed to find users for course" });
    }
  };
  app.get("/api/courses/:cid/users", findUsersForCourse);
}
