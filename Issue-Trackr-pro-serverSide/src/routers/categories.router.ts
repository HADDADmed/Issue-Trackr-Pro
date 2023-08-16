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

router.get('/:id', (req:any, res:any) => {
    connection.query('SELECT * FROM category WHERE id = ?', [req.params.id], (err:any, rows:any, fields:any) => {
        if (!err) {
            res.json(rows);
            console.log("category fetched succeffuly");
        } else {
            console.log(err);
            console.log("an error was occured while fetching category");
        }
    });

});

router.post('/', (req:any, res:any) => {
    let category = req.body;

    connection.query('INSERT INTO category SET ?', category, (err:any, rows:any, fields:any) => {


        if (!err) {
            res.json(rows);
            console.log("category added succeffuly");
        } else {
            console.log(err);
            console.log("an error was occured while adding category");
        }
    });

});







export const categoriesRouter = router;

