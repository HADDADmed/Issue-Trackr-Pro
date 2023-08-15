const express = require('express');
const router = express.Router();
const connection = require('../DataBaseManager/dbConnection'); // Adjust the path as needed


router.get('/', (req:any, res:any) => {
    connection.query('SELECT * FROM category', (err:any, rows:any, fields:any) => {
        if (!err) {
            res.json(rows);
            console.log("categories fetched succeffuly");
        } else {
            console.log(err);
            console.log("an error was occured while fetching categories");
        }
    });

});






export const categoriesRouter = router;

