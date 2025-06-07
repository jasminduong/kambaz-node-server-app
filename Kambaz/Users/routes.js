import * as dao from "./dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";
import * as courseDao from "../Courses/dao.js";

/* routes create an interface between the HTTP network layer and the JavaScript object and function layer 
by transforming a stream of bits from a network connection request into a set of objects, maps, and 
function event handlers that are part of the client/server architecture in a multi-tiered application */

// UserRoutes expose the database operations of users through a RESTful API
export default function UserRoutes(app) {
  const createUser = (req, res) => {};
  const deleteUser = (req, res) => {};
  const findAllUsers = (req, res) => {};
  const findUserById = (req, res) => {};

  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.delete("/api/users/:userId", deleteUser);

  // SIGNUP - creates new user
  const signup = (req, res) => {
    const user = dao.findUserByUsername(req.body.username); // checks if a user with that username already exists
    if (user) {
      res.status(400).json({ message: "Username already in use" }); // returns a 400 error status if user exists
      return;
    }
    const currentUser = dao.createUser(req.body); // if the username is not already taken, store it in the session's currentUser property
    req.session["currentUser"] = currentUser; // to remember that this new user is now the currently logged-in user
    res.json(currentUser); // the response includes the newly created user
  };
  app.post("/api/users/signup", signup);

  // SIGNIN - logs in the user if credentials match
  const signin = (req, res) => {
    const { username, password } = req.body; // extracts properties username and password from the request's body
    const currentUser = dao.findUserByCredentials(username, password); // and passess them to the findUserByCredentials function implemented by the DAO
    if (currentUser) {
      req.session["currentUser"] = currentUser; // the resulting user is stored in the server's currentUser  session
      res.json(currentUser); // the user is then sent to the client in the response
    } else {
      res.status(401).json({ message: "Unable to login. Try again later." });
    }
  };
  app.post("/api/users/signin", signin);

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
  const updateUser = (req, res) => {
    const userId = req.params.userId; // accepts a user's primary key (id) as a path parameter
    const userUpdates = req.body;
    dao.updateUser(userId, userUpdates); // passes in user id and request body
    const currentUser = dao.findUserById(userId); // if a user updates their profile,
    req.session["currentUser"] = currentUser; // then the session is kept in synch
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
  const findCoursesForEnrolledUser = (req, res) => {
    let { userId } = req.params;
    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }
    const courses = courseDao.findCoursesForEnrolledUser(userId);
    res.json(courses);
  };
  app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);

  // enrolls the current user in the new course
  const createCourse = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      return res.status(401).json({ message: "Not logged in" });
    }

    const newCourse = courseDao.createCourse(req.body);
    enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
    res.json(newCourse);
  };
  app.post("/api/users/current/courses", createCourse);
}
