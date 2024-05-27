const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const app = express();
const port = 3000;

// MongoDB connection URL and database name
const url = 'mongodb+srv://venueverse:VenueVerse@venue-verse.lu2nlwz.mongodb.net/auditoriums';
const dbName = 'auditoriums';

app.use(cors());
app.use(express.static('public'));

// Route to get auditorium data
app.get('/api/auditorium', async (req, res) => {
    const auditoriumName = req.query.name;
    const client = new MongoClient(url);
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('auditoria');
        const auditorium = await collection.findOne({ auditoriumName: auditoriumName });
        res.json(auditorium);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching data from database');
    } finally {
        await client.close();
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
