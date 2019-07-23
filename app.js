const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(morgan('common'));
app.use(cors());

const playstore = require('./playstore.js');

app.get('/apps', (req, res) => {
    const { sort, genre } = req.query;

    let results = playstore;

    if(sort) {
        if(!['rating', 'app'].includes(sort)) {
            return res
                .status(400)
                .send('Sort must be either RATING or APP');
        }
    }

    if(sort) {
        results.sort((a, b) => {
            return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
        })
    }

    if(genre) {
        if(!['Action', 'Puzzle', 'Strategy', 'Casual','Arcade', 'Card'].includes(genre)) {
            return res
                .status(400)
                .send('Genre must be one of: Action, Puzzle, Strategy, Casual, Arcade, or Card');
        }
    }

    if(genre) {
        results.sort((a, b) => {
            return a[genre] > b[genre] ? 1 : a[genre] < b[genre] ? -1 : 0;
        })
    }

    res
        .json(results);
});

app.listen(8000, () => {
    console.log('Server started on PORT 8000');
});