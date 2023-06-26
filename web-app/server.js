import express, { json, urlencoded } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import db from "./models/index.js";

const app = express();

let corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(json());

app.use(urlencoded({ extended: true }));

const Role = db.role; 

db.sequelize.sync({force: true}).then(() => {
    console.log('Drop and Resync Db');
    initial();
  });

app.get("/", (req, res) => {
  res.json({ message: "Welcome first page" });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
    Role.create({
      id: 1,
      name: "admin"
    });
   
    Role.create({
      id: 2,
      name: "user"
    });
  }