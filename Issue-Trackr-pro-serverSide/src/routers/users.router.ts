import e from "express";
const connection = require('../DataBaseManager/dbConnection'); // Adjust the path as needed
const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');    

const JWT_SECRET_KEY = 'haddad'
  
const TOKEN_HEADER_KEY = 'haddad'
// Set up Global configuration acces
dotenv.config();


// Get all users 
router.get('/', (req: any, res: any) => {
    console.log("Get all users");

  res.send("Get all users");
}
);

// Get user by id
router.get('/:id', (req: any, res: any) => {

    console.log("Get user by id");
    res.send("Get user by id");
}   
);

router.post('/login', (req: any, res: any) => {
    const { email, password } = req.body;
  const selectQuery = 'SELECT * FROM user WHERE email = ? AND password = ?';

  connection.query(selectQuery, [email, password], (err: any,results: any) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    if (results.length === 1) {
    
      const token = jwt.sign({ userId: results[0].id }, JWT_SECRET_KEY, { expiresIn: '1h' })
      console.log(results[0] )
      const user = results[0] 
      console.log({ 
        message: 'Login successful',
        user ,
        token
      }
        );
      res.status(200).json({ 
        message: 'Login successful' ,
        user,
        token
      }
        );
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  }); 
});

// Change user role by id
router.put('/change-user-role/:id', (req: any, res: any) => {

    console.log("Change user role by id");
    
    const selecteQuery = 'UPDATE user SET role = ? WHERE id = ?';
    const { role } = req.body;
    const { id } = req.params;
    connection.query(selecteQuery, [role, id], (err: any, results: any) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        console.log({ message: 'User role changed successfully' , results});
        res.status(200).json({ message: 'User role changed successfully' , results});
    });

}
);


export const usersRouter = router;
