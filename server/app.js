const express = require('express');
const { config } = require('dotenv');
const cors = require('cors');
const booksRouter = require('./routes/bookRoute');
const deleteRoute = require('./routes/deleteRoute');
const updateRoute = require('./routes/updateRoute');


config(); 

const app = express();
const PORT = process.env.PORT || 1000;

app.use(express.json());
app.use(cors())

app.use("/api/books", booksRouter);
app.use("/api/books",deleteRoute);
app.use("/api/books",updateRoute);

app.get("/", (req, res) => {
    res.json({ "message": "Hello World" });
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
