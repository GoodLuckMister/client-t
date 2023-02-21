const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "build")));

app.get("*", express.static(path.join(__dirname, "build", "index.html")));

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
