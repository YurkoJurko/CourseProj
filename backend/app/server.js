require("./envfunc")();
const {
  PORT = 3000,
  SECRET = "secret",
  NODE_ENV = "development",
} = process.env;

const cors = require("cors");
const corsOptions = require("./configs/cors.js");

const express = require("express");
const app = express();

const morgan = require("morgan");

NODE_ENV === "production" ? app.use(cors(corsOptions)) : app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(morgan("tiny"));

require("./models/User");
require("./models/Role");
require("./models/Post");
require("./models/Like");
require("./models/Comment");
require("./models/Tag");

require("./routers/index.js")(app);

app.listen(PORT, () => {
  console.log(`Your are listening on port ${PORT}`);
});
