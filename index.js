import express from "express";
import path from "path";
import bodyParser from "body-parser";
import { notesRoutes } from "./routes/notesRoutes";

const app = express();

// const router = express.Router();

app.use(express.static(path.resolve("public/html")));
app.use(express.static(path.resolve("public")));

app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.sendFile("/html/index.html", { root: __dirname + "/public/" });
});

app.use("/notes", notesRoutes);

const hostname = "127.0.0.1";
const port = 3000;
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
