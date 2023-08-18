const express = require('express');
const router = express.Router();
const connection = require('../DataBaseManager/dbConnection'); // Adjust the path as needed
import { format } from 'date-fns'; // Import the format function from the 'date-fns' library


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
    var description = req.body.content;
    const categoryId = req.body.category_id;    
    const d = new Date();
    const formattedDate = format(d, "dd/MM/yyyy, HH:mm:ss"); // Format the date object
    let  status =  req.body.status;
    const fromWho = req.body.fromWho;

    if(ticketId == 0 && fromWho == 'FROM_USER'){
        status = "OPEN";
        description = description+'\n';
        const historyOfStatus = '( '+status+' ) : '+formattedDate ;
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

    }else if(status == 'FROM_USER' && fromWho == 'FROM_USER')
    {
      //update ticket by adding other lines to description 
        const selectQuery = 'SELECT description,historyOfStatus FROM ticket WHERE id = ?';
        connection.query(selectQuery, [ticketId], (err: any, results: any) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }
              const description = results[0].description;
              const contentUpdate = req.body.contentUpdate;

        // updating ticket
         const newDescription = description +'\nCOMMENT_'+fromWho+'('+formattedDate+') : \n'+contentUpdate+'\n\\\\\\\\\\\\\\\\\\\\\endComment///////////////\n';
 
        const updateQuery = 'UPDATE ticket SET  description = ? WHERE id = ?';

        connection.query(updateQuery, [ newDescription, ticketId], (err: any, results: any) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }

            console.log("Ticket updated successfully by User");
            res.status(200).json(results);
        }
        );
        });


    }
    else if(fromWho == 'FROM_ADMIN' || fromWho == 'FROM_RESPONSIBLE')
    {
        //fetch ticket that have ticket id 
        const selectQuery = 'SELECT historyOfStatus, description FROM ticket WHERE id = ?';
        connection.query(selectQuery, [ticketId], (err: any, results: any) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }
           const historyOfStatus = results[0].historyOfStatus;
           const description = results[0].description;
           const contentUpdate = req.body.contentUpdate;

        // updating ticket
        // if the descripton did not chaged 
        if(contentUpdate == 'NO_CHANGE' )
        {
            const status = req.body.status;
            const newHistoryOfStatus = historyOfStatus +',\n( '+status+' ) : '+formattedDate;
            const updateQuery = 'UPDATE ticket SET  status = ?, historyOfStatus = ? WHERE id = ?';
            connection.query(updateQuery, [status, newHistoryOfStatus, ticketId], (err: any, results: any) => {
                if (err) {
                    console.error('Error executing query:', err);
                    res.status(500).json({ error: 'Internal server error' });
                    return;
                }

                console.log("Ticket updated successfully by Admin or responible ");

                res.status(200).json(results);

            }
            );
        }
        else if (status != 0 ){
            // if the descripton chaged
        const newDescription = description +'\nCOMMENT_'+fromWho+'('+formattedDate+') : \n'+contentUpdate+'\n\\\\\\\\\\\\\\\\\\\\\endComment///////////////\n';
        const status = req.body.status; 
        const newHistoryOfStatus = historyOfStatus +',\n( '+status+' ) : '+formattedDate;

                console.log('status : '+status);
                    //update the entire ticket 
        const updateQuery = 'UPDATE ticket SET  description = ? , status = ?, historyOfStatus = ? WHERE id = ?';
        connection.query(updateQuery, [newDescription, status, newHistoryOfStatus, ticketId], (err: any, results: any) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }
    
            console.log("Ticket updated successfully by Admin or responible ");
            res.status(200).json(results);
        }
        );
             } else if (status == 0 || status == '0' || status == 'null' || status == null || status == 'undefined' || status == undefined || status == '') {
                // if the descripton chaged
            const newDescription = description +'\nCOMMENT_'+fromWho+'('+formattedDate+') : \n'+contentUpdate+'\n\\\\\\\\\\\\\\\\\\\\\endComment///////////////\n';


                        //update the entire ticket  
            const updateQuery = 'UPDATE ticket SET  description = ?  WHERE id = ?';
            connection.query(updateQuery, [newDescription, ticketId], (err: any, results: any) => {
                if (err) {
                    console.error('Error executing query:', err);
                    res.status(500).json({ error: 'Internal server error' });
                    return;
                }
        
                console.log("Ticket updated successfully by Admin or responible ");
                res.status(200).json(results);
            }
            );

                }else {
                    console.log("Ticket not updated successfully by Admin or responible ");
                }

    
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
