// React applications can pass data to servers by embedding it in a URL path as path parameters part of a URL
// For instance the last two integers -- 2 and 4 -- at the end of the following URL can be parsed 
// by a corresponding matching route on the server, add the two integers, and respond with the result of 6

export default function PathParameters(app) {
  app.get("/lab5/add/:a/:b", (req, res) => { // route expects 2 path parameters after /lab5/add
    const { a, b } = req.params; // retrieve path parameters as strings
    const sum = parseInt(a) + parseInt(b); // parse as integers and adds
    res.send(sum.toString()); // sum as string sent back as response
  });
  app.get("/lab5/subtract/:a/:b", (req, res) => {
    const { a, b } = req.params; 
    const sum = parseInt(a) - parseInt(b);
    res.send(sum.toString());
  });
  app.get("/lab5/multiply/:a/:b", (req, res) => {
    const { a, b } = req.params; 
    const sum = parseInt(a) * parseInt(b);
    res.send(sum.toString());
  });
  app.get("/lab5/divide/:a/:b", (req, res) => {
    const { a, b } = req.params; 
    const sum = parseInt(a) / parseInt(b);
    res.send(sum.toString());
  });
}



