const path = require("path");
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "data.json"));
const middlewares = jsonServer.defaults();

// Debugging - log the absolute path
console.log("Looking for data.json at:", path.join(__dirname, "data.json"));

server.use(middlewares);
server.use(router);

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
