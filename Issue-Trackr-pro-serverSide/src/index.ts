import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser"
import { ticketsRouter } from "./routers/tickets.router";
import { usersRouter } from "./routers/users.router";
import { categoriesRouter } from "./routers/categories.router";
import { commentsRouter } from "./routers/comments.router";
import { statusRouter } from "./routers/ticketStatuses.router";
const connection = require('./DataBaseManager/dbConnection'); // Adjust the path as needed
const app: Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const cors = require('cors'); // Import the cors package
const port = process.env.SERVER_PORT || 8000;

// Add Access Control Allow Origin headers
app.use(cors()); // Enable CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});


connection.connect(function (err: any) {
  if (err) throw err;
  console.log("Connected successfuly to MySql !");
});




app.use('/api/tickets', ticketsRouter);
app.use('/api/users', usersRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/comments', commentsRouter);
app.use('/api/statuses', statusRouter);






const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});