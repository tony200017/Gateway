const express = require("express");
const routes = require("./routes");
const mongoose = require("mongoose");
const config = require("./configs/config");

async function connectToDatabase() {
  try {
    await mongoose.connect(config.mongodbConnectionLink);
    console.log("Connected Successfully");
  } catch (err) {
    console.error(err);
  }
}

connectToDatabase();

// Controllers
const globalRoutingFunction = require("./controller");
// Middleware
const authenticateFunctionMiddleware = require("./authMiddleware");

const app = express();
app.use(express.json());

// Initialize routes dynamically
routes.forEach((route) => {
  if (route.isAuthenticated) {
    app.use(route.api, authenticateFunctionMiddleware);
  }
  route.methods.forEach((method) => {
    switch (method) {
      case "get":
        app.get(route.api, globalRoutingFunction);
        break;
      case "post":
        app.post(route.api, globalRoutingFunction);
        break;
      case "delete":
        app.delete(route.api, globalRoutingFunction);
        break;
      case "put":
        app.put(route.api, globalRoutingFunction);
        break;
      case "patch":
        app.patch(route.api, globalRoutingFunction);
        break;
      default:
        break;
    }
  });
});

const port = config.port;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
