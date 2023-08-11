const express = require('express');
const router = express.Router();
const connection = require('../DataBaseManager/dbConnection'); // Adjust the path as needed


// Get all tickets
router.get('/', (req: any, res: any) => {
    console.log("Get all tickets");

    res.send("Get all tickets");

});

export const ticketsRouter = router;
