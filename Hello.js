export default function Hello(app) {
    app.get("/hello", (req, res) => {
      res.send("Life is good!"); // http://localhost:4000/hello responds "Life is good"
    });
    app.get("/", (req, res) => {
      // http://localhost:4000 responds "Welcome to Full ..."
      res.send("Welcome to Full Stack Development!");
    });
  }
  