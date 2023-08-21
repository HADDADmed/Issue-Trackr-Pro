import { format } from "date-fns";

const express = require('express');
const router = express.Router();
const connection = require('../DataBaseManager/dbConnection'); // Adjust the path as needed


// get All comments By ticket id

router.get('/:ticketid', (req: any, res: any) => {
    console.log("Get all comments by ticket id");
    const ticketId = req.params.ticketid;
    const selectQuery = 'SELECT * FROM comment WHERE ticket_id = ?';

    connection.query(selectQuery, [ticketId], (err: any, results: any) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        res.status(200).json(results);
    });
});

// add comment

    router.post('/', (req: any, res: any) => {
        console.log("Add comment");
        const commentContent = req.body.commentContent;
        const ticket_id = req.body.ticket_id 
        const user_id = req.body.user_id
        const d = new Date();
        const date = format(d, 'yyyy-MM-dd HH:mm:ss'); // Format the date to 'yyyy-mm-dd hh:mm:ss' format

        const insertQuery = 'INSERT INTO comment (commentContent, commentedAt, ticket_id, user_id) VALUES (?, ?, ?, ?)';
        connection.query(insertQuery, [commentContent, date, ticket_id, user_id], (err: any, results: any) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }
            res.status(200).json(results);
        }
        );
    });




export const commentsRouter = router;

