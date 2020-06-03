const http = require("http");

const server = http.createServer((req, res) => {
  //Status code 200 means it's a success
  res.statusCode = 200;

  // Tell the browser what we are sending back
  res.setHeader("Content-Type", "text/html");

  //Send back some content
  res.write("<h1>Hello World</h1>");

  //sens response back to the browser
  res.end();
});

// Web server needs to be continuously listening for incoming request
server.listen(8080, () => {
  console.log("Server started on port 8080");
});
