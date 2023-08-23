const mysql = require('mysql');

const connectionConfig = {
  host: '127.0.0.1', // Change this to your MySQL host
  user: 'root',
  password: '',
  database: 'IssueTrackrPro'
};


const connection =  mysql.createConnection(connectionConfig);




async function main() {
    try {
      console.log('function to execute ');
    } catch (error) {
        console.error('Error: ');
    } finally {
      connection.end(); // Close the database connection
    }
  }

  // Execute the main function
  main();
