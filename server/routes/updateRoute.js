const express = require("express");
const router = express.Router();
const db = require("../config/dbConnect");

router.put("/:id", (req, res) => {
    const id = req.params.id;
    const { B_NAME, B_DESC, B_PRICE, B_IMG } = req.body;

    
    let fields = [];
    let values = [];

    if (B_NAME) {
        fields.push("B_NAME = ?");
        values.push(B_NAME);
    }
    if (B_DESC) {
        fields.push("B_DESC = ?");
        values.push(B_DESC);
    }
    if (B_PRICE) {
        fields.push("B_PRICE = ?");
        values.push(B_PRICE);
    }
    if (B_IMG) {
        fields.push("B_IMG = ?");
        values.push(B_IMG);
    }

    if (fields.length > 0) {
        
        values.push(id);

        const query = `UPDATE books SET ${fields.join(", ")} WHERE B_ID = ?`;

        db.query(query, values, (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }
            return res.status(200).json("Book has been updated...");
        });
    } else {
        return res.status(400).json({ error: 'No valid fields to update.' });
    }
});

module.exports = router;
