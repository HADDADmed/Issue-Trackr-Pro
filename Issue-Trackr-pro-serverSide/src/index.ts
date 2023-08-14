import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser"
import { ticketsRouter } from "./routers/tickets.router";
import { usersRouter } from "./routers/users.router";
const connection = require('./DataBaseManager/dbConnection'); // Adjust the path as needed
const app: Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var cors = require('cors');
app.use(cors());


connection.connect(function (err: any) {
  if (err) throw err;
  console.log("Connected successfuly to MySql !");
});



app.use('/api/tickets', ticketsRouter);
app.use('/api/users', usersRouter);




const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});