const mysql = require('mysql');
require('dotenv').config(); 


// const dbConnect = () => {
//     const connection = mysql.createConnection({
//         host: process.env.host,
//         user: process.env.user, 
//         password: process.env.password,
//         database: process.env.database
//     });
    
//     connection.connect(err => {
//         if (err) {
//             console.error('Error connecting to the database:', err);
//             return;
//         }
//         console.log('Connected to the MySQL database.');
//     });
    
//     return connection;
// };

const connection = mysql.createConnection({
    host: process.env.host,
    user: process.env.user, 
    password: process.env.password,
    database: process.env.database
});


connection.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database.');
});

module.exports = connection;
