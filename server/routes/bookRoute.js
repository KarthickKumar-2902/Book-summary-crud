const express = require('express');
const router = express.Router();
const db = require('../config/dbConnect');

router.get("/", (req, res) => {
    const query = "SELECT * FROM books";
    
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Database query failed.' });
        }
        
        res.status(200).json(results);
    });
});


router.post("/", (req, res) => {
    
    const { B_NAME, B_DESC,B_PRICE, B_IMG } = req.body;

    if (!B_NAME ||!B_PRICE|| !B_DESC || !B_IMG) {
        return res.status(400).json({ error: 'B_NAME, B_DESC, B_PRICE,and B_IMG are required.' });
    }

    const B_DATE = new Date().toISOString().slice(0, 10);

    const query = "INSERT INTO books (B_NAME, B_DESC, B_PRICE,B_IMG, B_DATE) VALUES (?, ?,?, ?, ?)";
    
    db.query(query, [B_NAME, B_DESC,B_PRICE, B_IMG, B_DATE], (err, results) => {
        
        
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Database query failed.' });
        }

        res.status(201).json({ message: 'Book added successfully', result: results });
    });
});



module.exports = router;
