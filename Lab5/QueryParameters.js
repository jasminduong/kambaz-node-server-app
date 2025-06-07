// React applications can also send data to servers by encoding it as a query string
// after the question mark character (?) at the end of a URL
// A query string consists of a list of name value pairs separated by the ampersand character (&) as shown below:
// http://localhost:4000/lab5/calculator?operation=add&a=2&b=4

export default function QueryParameters(app) {
  app.get("/lab5/calculator", (req, res) => {
    const { a, b, operation } = req.query; // retrieve a, b, and operation parameters in query
    let result = 0;
    switch (operation) {
      case "add":
        result = parseInt(a) + parseInt(b); // parse as integers since parameters are strings
        break;
      case "subtract":
        result = parseInt(a) - parseInt(b);
        break;
      case "multiply":
        result = parseInt(a) * parseInt(b);
        break;
      case "divide":
        result = parseInt(a) / parseInt(b);
        break;
      default:
        result = "Invalid operation";
    }
    res.send(result.toString()); // convert to string otherwise browser interprets as a status code
  });
}
