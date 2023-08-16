const express = require('express');
const router = express.Router();
const connection = require('../DataBaseManager/dbConnection'); // Adjust the path as needed


// Get all tickets

router.get('/', (req: any, res: any) => {
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

router.get('/:userid', (req: any, res: any) => {
    console.log("Get tickets by user id");

    const selectQuery = 'SELECT * FROM ticket WHERE user_id = ?';
    const userId = req.params.userid;

    connection.query(selectQuery, [userId], (err: any, results: any) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        res.status(200).json(results);
    });
});

router.delete('/:id', (req: any, res: any) => {

    console.log("Delete ticket");
    const ticketId = req.params.id;
    console.log("ticket_id to delete : " + ticketId);
    const deleteQuery = 'DELETE FROM ticket WHERE id = ?';

    connection.query(deleteQuery, [ticketId], (err: any, results: any) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        console.log(" ticket Deleted succesfuly");
        console.log(results);
        console.log("ticket_id deleted : " + ticketId);
        res.status(200).json(results);

    });
});


router.post('/', (req: any, res: any) => {
    console.log("Create ticket");
    const ticketId = req.body.id;
    const title = req.body.title;
    const userId = req.body.user_id;
    const description = req.body.content;
    const categoryId = req.body.category_id;    
    const d = new Date();
    var  status =  req.body.status;

    if(ticketId == 0){
        status = "Open";
        const historyOfStatus = 'Open('+d+')';
        const insertQuery = 'INSERT INTO ticket (title, user_id, description, category_id, status, historyOfStatus) VALUES (?, ?, ?, ?, ?, ?)';
        connection.query(insertQuery, [title, userId, description, categoryId, status, historyOfStatus], (err: any, results: any) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }
            console.log("ticket created succesfuly By the User With tickets id = 0");
            res.status(200).json(results);
        }
        );

    }else if(status == 'FROM_USER')
    {
        //update tickets but not changing Status or historyOfStatus
        const updateQuery = 'UPDATE ticket SET title = ?, description = ?, category_id = ? WHERE id = ?';
        connection.query(updateQuery, [title, description, categoryId, ticketId], (err: any, results: any) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }

            console.log("Ticket updated successfully By User with status == FROM_USER");
            res.status(200).json(results);
        }
        );
       
    }else {
        //fetch ticket that have ticket id 
        const selectQuery = 'SELECT historyOfStatus FROM ticket WHERE id = ?';
        connection.query(selectQuery, [ticketId], (err: any, results: any) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }
           const historyOfStatus = results[0].historyOfStatus;

        // updating ticket

        const newHistoryOfStatus = historyOfStatus +',\n('+d+')';
        const status = req.body.status;
                    //update the entire ticket 
        const updateQuery = 'UPDATE ticket SET title = ?, user_id = ?, description = ?, category_id = ?, status = ?, historyOfStatus = ? WHERE id = ?';
        connection.query(updateQuery, [title, userId, description, categoryId, status, newHistoryOfStatus, ticketId], (err: any, results: any) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }
    
            console.log("Ticket updated successfully by Admin or responible ");
            res.status(200).json(results);
        }
        );
        });
    
}
});

router.get('/ticket/:id', (req: any, res: any) => {

    console.log("Get ticket by id");

    const selectQuery = 'SELECT * FROM ticket WHERE id = ?';
    const ticketId = req.params.id;

    connection.query(selectQuery, [ticketId], (err: any, results: any) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        console.log("Succes ticket id");
        res.status(200).json(results);
    });
});







export const ticketsRouter = router;
