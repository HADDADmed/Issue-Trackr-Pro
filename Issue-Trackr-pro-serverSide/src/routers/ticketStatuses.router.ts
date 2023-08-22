import { format } from "date-fns";

const express = require('express');
const router = express.Router();
const connection = require('../DataBaseManager/dbConnection'); // Adjust the path as needed



// Get all statuses

router.get('/', (req: any, res: any) => {
    console.log("Get all statuses");

    const selectQuery = 'SELECT * FROM status';

    connection.query(selectQuery, (err: any, results: any) => {

        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        res.status(200).json(results);
    }
    );

}

);



// Get all ticketstatuses by tickt_id

router.get('/:ticketid', (req: any, res: any) => {
    console.log("Get all statuses by ticket id");
    const ticketId = req.params.ticketid;
    const selectQuery = 'SELECT * FROM ticketstatus WHERE ticket_id = ? ORDER BY createdAt DESC';

    connection.query(selectQuery, [ticketId], (err: any, results: any) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        res.status(200).json(results);
    });
});


//get status by id

router.get('/status/:id', (req: any, res: any) => {
    console.log("Get status by id");
    const statusId = req.params.id;
    const selectQuery = 'SELECT * FROM status WHERE id = ?';

    connection.query(selectQuery, [statusId], (err: any, results: any) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        res.status(200).json(results);
    });
});





// add new status to ticketstatus table

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


router.put('/changestatus', (req: any, res: any) => {

    console.log("add new  ticketstatus");
    const ticketId = req.body.ticket_id;
    const statusId = req.body.status_id;
    const changedByUserId = req.body.changedByUser_id; 
    const d = new Date();
    const formattedDate = format(d, "dd-MM-yyyy HH:mm:ss"); // Format the date object
    //add a new record in table status 
    const insertQuery = 'INSERT INTO ticketstatus (ticket_id, status_id,changedByUser_id,createdAt) VALUES (?, ?, ?, ?)';
    connection.query(insertQuery, [ticketId, statusId,changedByUserId, formattedDate], (err: any, results: any) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        console.log("ticketstatus added succesfuly");
        console.log(results);
        res.status(200).json(results);
    }
    );
});



        






export const statusRouter = router;

