const express = require("express");
const router = express.Router();
const db = require("../config/dbConnect");

router.delete("/:id", (req, res) => {
    const id = req.params.id;
    // console.log("Delete");
    
    const query = "DELETE FROM BOOKS WHERE B_ID = ?";
    db.query(query, [id], (err, result) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json("Book has been deleted...");
        }
    });
});

module.exports = router;
