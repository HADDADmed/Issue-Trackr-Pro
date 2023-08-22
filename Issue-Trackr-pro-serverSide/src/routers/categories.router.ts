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


//delete category   delete all tickets with this category id after deleting all statuses with this ticket id and comments with this ticket id
router.delete('/:id', (req:any, res:any) => {
    // creat an array with the ids of the tickets to delete
    let ticketsIds: any = [];
    connection.query('SELECT id FROM ticket WHERE category_id = ?', [req.params.id], (err:any, rows:any, fields:any) => {   

        if (!err) {
            rows.forEach((element:any) => {
                ticketsIds.push(element.id);
            });
            console.log("tickets ids : " + ticketsIds);
            // delete all statuses with this ticket id
            connection.query('DELETE FROM ticketstatus WHERE ticket_id IN (?)', [ticketsIds], (err:any, rows:any, fields:any) => {
                if (!err) {
                    console.log("ticketstatuses deleted succeffuly");
                } else {
                    console.log(err);
                    console.log("an error was occured while deleting ticketstatuses");
                }
            });
            // delete all comments with this ticket id
            connection.query('DELETE FROM comment WHERE ticket_id IN (?)', [ticketsIds], (err:any, rows:any, fields:any) => {
                if (!err) {
                    console.log("comments deleted succeffuly");
                } else {
                    console.log(err);
                    console.log("an error was occured while deleting comments");
                }
            });
            // delete all tickets with this category id
            connection.query('DELETE FROM ticket WHERE category_id = ?', [req.params.id], (err:any, rows:any, fields:any) => {
                if (!err) {
                    console.log("tickets deleted succeffuly");
                } else {
                    console.log(err);
                    console.log("an error was occured while deleting tickets");
                }
            });
            // delete the category
            connection.query('DELETE FROM category WHERE id = ?', [req.params.id], (err:any, rows:any, fields:any) => {
                if (!err) {
                    res.json(rows);
                    console.log("category deleted succeffuly");
                } else {
                    console.log(err);
                    console.log("an error was occured while deleting category");
                }
            });
        } else {
            console.log(err);
            console.log("an error was occured while fetching tickets ids");
        }
    });


});






export const categoriesRouter = router;

