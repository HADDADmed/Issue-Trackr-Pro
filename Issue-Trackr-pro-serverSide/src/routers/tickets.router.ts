const express = require('express');
const router = express.Router();
const connection = require('../DataBaseManager/dbConnection'); // Adjust the path as needed


// Get all tickets
router.get('/', (req: any, res: any) => {
    console.log("Get all tickets");

    res.send("Get all tickets");

});
router.get('/all', (req: any, res: any) => {
    console.log("Get all tickets");

    const selectQuery = 'SELECT * FROM ticket';

    connection.query(selectQuery, (err: any, results: any) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        res.status(200).json(results);
    });
});


export const ticketsRouter = router;
