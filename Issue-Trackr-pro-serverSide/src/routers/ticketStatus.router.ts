import { format } from "date-fns";

const express = require('express');
const router = express.Router();
const connection = require('../DataBaseManager/dbConnection'); // Adjust the path as needed


// Get all statuses by tickt_id

router.get('/:ticketid', (req: any, res: any) => {
    console.log("Get all statuses by ticket id");
    const ticketId = req.params.ticketid;
    const selectQuery = 'SELECT * FROM status WHERE ticket_id = ?';

    connection.query(selectQuery, [ticketId], (err: any, results: any) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        res.status(200).json(results);
    });
});





// add new status to status table

router.post('/', (req: any, res: any) => {
    console.log("Add status");
    const ticketId = req.body.ticket_id;
    const changedByUserId = req.body.changedByUser_id;
    const statusId = req.body.status_id;
    const d = new Date();
    const date = format(d, 'yyyy-MM-dd HH:mm:ss');


    const insertQuery = 'INSERT INTO ticketstatus (ticket_id, status_id,changedByUser_id,createdAt) VALUES (?, ?, ?, ?)';
    connection.query(insertQuery, [ ticketId, statusId,changedByUserId, date], (err: any, results: any) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        res.status(200).json(results);
    }
    );
});






export const statusRouter = router;

