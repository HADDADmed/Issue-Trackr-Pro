const mysql = require('mysql2/promise');

async function createDatabase() {
  const connection = await mysql.createConnection({
    host: '127.0.0.1', // Change this to your MySQL host
    user: 'root',
    password: ''
  });




  // Create the IssueTrackrPro database if it doesn't exist
  await connection.query('CREATE DATABASE IF NOT EXISTS IssueTrackrPro');
  await connection.end();
}


async function changeTableNames() {
    const connection = await mysql.createConnection({
        host: '127.0.0.1', // Change this to your MySQL host
    user: 'root',
    password: '',
    database: 'IssueTrackrPro',
    });
    await connection.query(`
        ALTER TABLE bUser RENAME TO User;
    `);
    await connection.end();
}



async function createSchema() {
    const connection = await mysql.createConnection({
      host: '127.0.0.1', // Change this to your MySQL host
      user: 'root',
      password: '',
      database: 'IssueTrackrPro',
    });
  
    // Create the Category table first
    await connection.query(`
      CREATE TABLE IF NOT EXISTS Category (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        description TEXT
      )
    `);
  
    // Create the bUser table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS bUser (
        id INT PRIMARY KEY AUTO_INCREMENT,
        fullName VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL
      )
    `);
  
    // Create the Ticket table last
    await connection.query(`
      CREATE TABLE IF NOT EXISTS Ticket (
        id INT PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        status VARCHAR(50) NOT NULL,
        category_id INT,
        user_id INT,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        historyOfStatus TEXT,
        FOREIGN KEY (category_id) REFERENCES Category(id),
        FOREIGN KEY (user_id) REFERENCES bUser(id)
      )
    `);
  
    await connection.end();
  }


async function main() {
//   try {
//     await changeTableNames();
//     console.log('Schema created successfully');
//   } catch (error) {
//     console.error('Error creating schema:', error);
//   }
}

main();
