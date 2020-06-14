import express from "express";
import path from "path";

const app = express();

// const router = express.Router();

app.use(express.static(path.resolve("public/html")));
app.use(express.static(path.resolve("public")));

app.get("/", function (req, res) {
  res.sendFile("/html/index.html", { root: __dirname + "/public/" });
});

// app.use("/", indexRoutes);

const hostname = "127.0.0.1";
const port = 3000;
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
