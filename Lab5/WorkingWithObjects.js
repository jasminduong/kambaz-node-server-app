const assignment = {
  id: 1,
  title: "NodeJS Assignment",
  description: "Create a NodeJS server with ExpressJS",
  due: "2021-10-10",
  completed: false,
  score: 0,
};
const module = {
    id: 1,
    name: "NodeJS Module",
    description: "Create a NodeJS server with ExpressJS",
    course: "Web Development"
  };
export default function WorkingWithObjects(app) {
  app.get("/lab5/assignment", (req, res) => {
    res.json(assignment); // retrieves assignment object
  });
  app.get("/lab5/assignment/title", (req, res) => {
    res.json(assignment.title); // retrieves property title of assignment object
  });
  app.get("/lab5/assignment/title/:newTitle", (req, res) => {
    const { newTitle } = req.params; // retrieves the new title from the path 
    assignment.title = newTitle; // and updates the assignment's object's title property
    res.json(assignment);
  });
  app.get("/lab5/assignment/score/:newScore", (req, res) => {
    const { newScore } = req.params; 
    assignment.score = newScore; 
    res.json(assignment);
  });
  app.get("/lab5/assignment/completed/:newCompleted", (req, res) => {
    const { newCompleted } = req.params; 
    assignment.completed = newCompleted; 
    res.json(assignment);
  });
  app.get("/lab5/module", (req, res) => {
    res.json(module); 
  });
  app.get("/lab5/module/name", (req, res) => {
    res.json(module.name); 
  });
  app.get("/lab5/module/name/:newName", (req, res) => {
    const { newName } = req.params; 
    module.name = newName; 
    res.json(module);
  });
}
