import * as dao from "./dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";
import * as courseDao from "../Courses/dao.js";

/* routes create an interface between the HTTP network layer and the JavaScript object and function layer 
by transforming a stream of bits from a network connection request into a set of objects, maps, and 
function event handlers that are part of the client/server architecture in a multi-tiered application */

// UserRoutes expose the database operations of users through a RESTful API
export default function UserRoutes(app) {
  const createUser = async (req, res) => {
    const user = await dao.createUser(req.body);
    res.json(user);
  };
  app.post("/api/users", createUser);

  // uses deleteUser function implemented by DAO to delete the user
  const deleteUser = async (req, res) => {
    const status = await dao.deleteUser(req.params.userId);
    res.json(status);
  };
  app.delete("/api/users/:userId", deleteUser);

  // uses findAllUsers function implemented by the DAO to retrieve all the users from the database
  const findAllUsers = async (req, res) => {
    const { role, name } = req.query;
    if (role) {
      const users = await dao.findUsersByRole(role);
      res.json(users);
      return;
    }
    if (name) {
      const users = await dao.findUsersByPartialName(name);
      res.json(users);
      return;
    }
    const users = await dao.findAllUsers();
    res.json(users);
  };
  const findUserById = async (req, res) => {
    const user = await dao.findUserById(req.params.userId);
    res.json(user);
  };
  app.get("/api/users/:userId", findUserById);

  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.delete("/api/users/:userId", deleteUser);

  // SIGNUP - creates new user
  const signup = async (req, res) => {
    const user = await dao.findUserByUsername(req.body.username); // checks if a user with that username already exists
    if (user) {
      res.status(400).json({ message: "Username already in use" }); // returns a 400 error status if user exists
      return;
    }
    const currentUser = await dao.createUser(req.body); // if the username is not already taken, store it in the session's currentUser property
    req.session["currentUser"] = currentUser; // to remember that this new user is now the currently logged-in user
    res.json(currentUser); // the response includes the newly created user
  };
  app.post("/api/users/signup", signup);

  // SIGNIN - logs in the user if credentials match
  const signin = async (req, res) => {
    console.log("=== SIGNIN ROUTE DEBUG ===");
    console.log("Request body:", req.body);
    console.log("Session before signin:", req.session);
    console.log("Session ID:", req.sessionID);

    const { username, password } = req.body;
    const currentUser = await dao.findUserByCredentials(username, password);

    console.log("User found:", currentUser);

    if (currentUser) {
      req.session["currentUser"] = currentUser;
      console.log("User saved to session:", req.session["currentUser"]);
      console.log("Session after saving user:", req.session);
      res.json(currentUser);
    } else {
      console.log("Invalid credentials");
      res.status(401).json({ message: "Unable to login. Try again later." });
    }
  };

  // PROFILE
  const profile = async (req, res) => {
    // if a user has already signed in,
    const currentUser = req.session["currentUser"]; // the currentUser can be retrieved from the session
    if (!currentUser) {
      // if there is no currentUser,
      res.sendStatus(401); // an error is returned
      return;
    }
    res.json(currentUser);
  };
  app.post("/api/users/profile", profile);

  // UPDATE - updates current user's profile
  const updateUser = async (req, res) => {
    const userId = req.params.userId; // accepts a user's primary key (id) as a path parameter
    const userUpdates = req.body;
    dao.updateUser(userId, userUpdates); // passes in user id and request body
    const currentUser = req.session["currentUser"];
    if (currentUser && currentUser._id === userId) {
      req.session["currentUser"] = { ...currentUser, ...userUpdates };
    }
    res.json(currentUser); // responds with status
  };
  app.put("/api/users/:userId", updateUser);

  // SIGN OUT - resets the currentUser to null in the server
  const signout = (req, res) => {
    if (!req.session) {
      return res.sendStatus(200);
    }

    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying session:", err);
        return res.status(500).send("Error signing out");
      }
      res.clearCookie("connect.sid"); // clears session cookie
      res.sendStatus(200);
    });
  };
  app.post("/api/users/signout", signout);

  // gets the courses the current user is enrolled in
  const findCoursesForEnrolledUser = async (req, res) => {
    let { userId } = req.params;
    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }
    const courses = await courseDao.findCoursesForEnrolledUser(userId);
    res.json(courses);
  };
  app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);

  // enrolls the current user in the new course
  const createCourse = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      return res.status(401).json({ message: "Not logged in" });
    }

    const newCourse = await courseDao.createCourse(req.body);
    enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
    res.json(newCourse);
  };
  app.post("/api/users/current/courses", createCourse);
}
