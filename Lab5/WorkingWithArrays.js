let todos = [
  { id: 1, title: "Task 1", completed: false },
  { id: 2, title: "Task 2", completed: true },
  { id: 3, title: "Task 3", completed: false },
  { id: 4, title: "Task 4", completed: true },
];

/* WorkingWithArrays defines SERVER-side functionality using Express
handles requests and the actual data manipulation logic */
export default function WorkingWithArrays(app) {
  app.get("/lab5/todos", (req, res) => {
    res.json(todos);
  });

  // creating new data in a server
  app.get("/lab5/todos/create", (req, res) => {
    const newTodo = {
      // creates a new item in the array
      id: new Date().getTime(),
      title: "New Task",
      completed: false,
    };
    todos.push(newTodo);
    res.json(todos); // and responds with the array now containing the new item
  });
  // POST method - used for CREATING new data typically embedded in the HTTP body
  app.post("/lab5/todos", (req, res) => {
    const newTodo = { ...req.body, id: new Date().getTime() };
    todos.push(newTodo);
    res.json(newTodo);
  });

  // deleting data from a server
  app.get("/lab5/todos/:id/delete", (req, res) => {
    const { id } = req.params; // encode the ID of the item to delete as a path parameter
    const todoIndex = todos.findIndex((t) => t.id === parseInt(id)); // search for the item in the set of items and remove it
    if (todoIndex === -1) {
      res.status(404).json({ message: `Unable to delete Todo with ID ${id}` }); // returns 404 status error if not found
      return;
    }
    todos.splice(todoIndex, 1);
    res.json(todos);
  });
  // DELETE method - used for REMOVING existing data
  app.delete("/lab5/todos/:id", (req, res) => {
    const { id } = req.params;
    const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
    todos.splice(todoIndex, 1);
    res.sendStatus(200); // sends a success status and let the user interface update its state variable
  });

  // updating data on a server
  app.get("/lab5/todos/:id/title/:title", (req, res) => {
    const { id, title } = req.params; // encode the ID of the item to update as a path parameter
    const todo = todos.find((t) => t.id === parseInt(id)); // search for the item in the set of items and update it
    todo.title = title;
    res.json(todos);
  });
  app.get("/lab5/todos/:id/completed/:completed", (req, res) => {
    const { id, completed } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    todo.completed = completed;
    res.json(todos);
  });
  app.get("/lab5/todos/:id/description/:description", (req, res) => {
    const { id, description } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    todo.description = description;
    res.json(todos);
  });
  // PUT method - used for modifying existing data where UPDATES are typically embedded in the HTTP body
  app.put("/lab5/todos/:id", (req, res) => {
    const { id } = req.params;
    const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
    if (todoIndex === -1) {
      res.status(404).json({ message: `Unable to update Todo with ID ${id}` });
      return;
    }
    todos = todos.map((t) => {
      if (t.id === parseInt(id)) {
        return { ...t, ...req.body };
      }
      return t;
    });
    res.sendStatus(200);
  });

  // retrieving a particular item from an array by its primary key
  app.get("/lab5/todos/:id", (req, res) => {
    const { id } = req.params; // encode the ID of the item of interest as a path parameter
    const todo = todos.find((t) => t.id === parseInt(id)); // parses the ID from the path parameter, finds the corresponding item,
    res.json(todo); // and responds with the item
  });

  // filtering items using query strings
  app.get("/lab5/todos", (req, res) => {
    const { completed } = req.query; // filters the array by the completed query parameter
    if (completed !== undefined) {
      const completedBool = completed === "true";
      const completedTodos = todos.filter((t) => t.completed === completedBool);
      res.json(completedTodos);
      return;
    }
    res.json(todos);
  });
}
