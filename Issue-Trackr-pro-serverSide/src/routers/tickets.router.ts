const express = require('express');
const router = express.Router();
const connection = require('../DataBaseManager/dbConnection'); // Adjust the path as needed
import { format } from 'date-fns'; // Import the format function from the 'date-fns' library


// Get all tickets

router.get('/', (req: any, res: any) => {
    console.log("Get all tickets");

    //creat a query to get all tickets ordred by status
    const selectQuery = 'SELECT * FROM ticket ORDER BY id DESC';

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
    console.log("Get tickets by user id : " + req.params.userid);

    const selectQuery = 'SELECT * FROM ticket WHERE user_id = ?  ORDER BY id DESC';
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
    // Delete all statuses with this ticket id and comments with this ticket id then delete the ticket
    console.log("Delete ticket by id");
    const ticketId = req.params.id;
    const deleteQuery = 'DELETE FROM ticket WHERE id = ?';
    const deleteQuery2 = 'DELETE FROM ticketstatus WHERE ticket_id = ?';
    const deleteQuery3 = 'DELETE FROM comment WHERE ticket_id = ?';

    connection.query(deleteQuery2, [ticketId], (err: any, results: any) => {


        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        console.log("ticket statuses deleted succesfuly");
        console.log(results);
        connection.query(deleteQuery3, [ticketId], (err: any, results: any) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }
            console.log("ticket comments deleted succesfuly");
            console.log(results);
            connection.query(deleteQuery, [ticketId], (err: any, results: any) => {
                if (err) {
                    console.error('Error executing query:', err);
                    res.status(500).json({ error: 'Internal server error' });
                    return;
                }
                console.log("ticket deleted succesfuly");
                console.log(results);
                res.status(200).json(results);
            });
        }
        );



    });




});

//Delete More than One Ticket the ids are in the body of the request in a array
router.post('/delete', (req: any, res: any) => {
    // Delete all statuses with this ticket id and comments with this ticket id then delete the ticket
    console.log("Delete tickets by ids");
    const ticketIds = req.body;
    const deleteQuery = 'DELETE FROM ticket WHERE id = ?';
    const deleteQuery2 = 'DELETE FROM ticketstatus WHERE ticket_id = ?';
    const deleteQuery3 = 'DELETE FROM comment WHERE ticket_id = ?';
    ticketIds.forEach((ticketId: any) => {
        connection.query(deleteQuery2, [ticketId], (err: any, results: any) => {


            if (err) {
                console.error('Error executing query:', err);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }
            console.log("ticket statuses deleted succesfuly");
            console.log(results);
            connection.query(deleteQuery3, [ticketId], (err: any, results: any) => {

                if (err) {
                    console.error('Error executing query:', err);
                    res.status(500).json({ error: 'Internal server error' });
                    return;
                }
                console.log("ticket comments deleted succesfuly");
                console.log(results);
                connection.query(deleteQuery, [ticketId], (err: any, results: any) => {
                    if (err) {
                        console.error('Error executing query:', err);
                        res.status(500).json({ error: 'Internal server error' });
                        return;
                    }
                    console.log("ticket deleted succesfuly");
                    console.log(results);
                });
            }
            );


        });
    });
    res.status(200).json({ message: 'tickets deleted' });
});





// CREATE A NEW TICKET AND CREAT NEW STATUS FOR IT  
router.post('/', (req: any, res: any) => {
    console.log("Create new ticket");
    const { title, description, category_id, user_id } = req.body;
    const d = new Date();
    const createdAt = format(d, 'yyyy-MM-dd HH:mm:ss');
    const status_id = 1;
    const insertQuery = 'INSERT INTO ticket (title, description, category_id, user_id, createdAt) VALUES (?, ?, ?, ?, ?)';
    const insertQuery2 = 'INSERT INTO ticketstatus (status_id, ticket_id,changedByUser_id, createdAt) VALUES (?,?, ?, ?)'; 

    console.log("title : " + title);
    console.log("description : " + description);
    console.log("category_id : " + category_id);
    console.log("user_id : " + user_id);
    console.log("createdAt : " + createdAt);
    console.log("status_id : " + status_id);


    connection.query(insertQuery, [title, description, category_id, user_id, createdAt], (err: any, results: any) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        console.log("ticket created succesfuly");
        console.log(results);
        console.log("ticket_id created : " + results.insertId);
        const ticketId = results.insertId;
        connection.query(insertQuery2, [status_id, ticketId,user_id, createdAt], (err: any, results: any) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }
            console.log("ticket status created succesfuly");
            console.log(results);
            console.log("ticket status created : " + results.insertId);
            res.status(200).json(results);
        });
    });
});




router.get('/ticket/:id', (req: any, res: any) => {
    console.log("Get ticket by id");
  
    const ticketId = req.params.id;
  
    const selectQuery = 'SELECT * FROM ticket WHERE id = ?';
    const selectQuery2 = 'SELECT * FROM ticketstatus WHERE ticket_id = ? ORDER BY createdAt DESC LIMIT 1';
  
    connection.query(selectQuery, [ticketId], (err: any, ticketResults: any) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
  
      connection.query(selectQuery2, [ticketId], (err: any, statusResults: any) => {
          if (err) {
              console.error('Error executing query:', err);
              res.status(500).json({ error: 'Internal server error' });
              return;
            }
        const status = statusResults[0] ? statusResults[0].status_id : 'unknown';
            console.log("status : " );
            console.log(statusResults[0]);
        const ticket = {
          id: ticketResults[0].id,
          title: ticketResults[0].title,
          description: ticketResults[0].description,
          status_id: status,
          category_id: ticketResults[0].category_id,
          user_id: ticketResults[0].user_id,
          createdAt: ticketResults[0].createdAt,
          historyOfStatus: ticketResults[0].historyOfStatus,
        };
        console.log(ticket);
        console.log("Success ticket id");
        res.status(200).json(ticket);
      });
    });
  });
  







export const ticketsRouter = router;
