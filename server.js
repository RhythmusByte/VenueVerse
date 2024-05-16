const express = require("express");

const app = express();

const dbConfig = require('./db')
const auditoriumRoute = require('./routes/auditoriumRoute')

app.use('/api/auditoriums' , auditoriumRoute)

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server running on port ${port}`));