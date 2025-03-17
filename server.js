const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

const API_KEY = 'YOUR API KEY';
const BASE_URL = 'https://api.pubg.com/shards/steam';

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.get('/api/player/:playerName', async (req, res) => {
    const playerName = req.params.playerName;
    const headers = {
        'Authorization': `Bearer ${API_KEY}`,
        'Accept': 'application/vnd.api+json'
    };
    console.log(`Received request for player: ${playerName}`);
    try {
        const response = await fetch(`${BASE_URL}/players?filter[playerNames]=${playerName}`, { headers });
        console.log(`PUBG API Response status: ${response.status}`);
        if (!response.ok) throw new Error(`Error: ${response.status} - ${response.statusText}`);
        const data = await response.json();
        console.log('Player data fetched:', data);
        res.json(data);
    } catch (error) {
        console.error(`Error fetching player data: ${error.message}`);
        res.status(500).send(`Error fetching player data: ${error.message}`);
    }
});

app.get('/api/match/:matchId', async (req, res) => {
    const matchId = req.params.matchId;
    const headers = {
        'Authorization': `Bearer ${API_KEY}`,
        'Accept': 'application/vnd.api+json'
    };
    console.log(`Received request for match ID: ${matchId}`);
    try {
        const response = await fetch(`${BASE_URL}/matches/${matchId}`, { headers });
        console.log(`PUBG API Response status: ${response.status}`);
        if (!response.ok) throw new Error(`Error: ${response.status} - ${response.statusText}`);
        const data = await response.json();
        console.log('Match data fetched:', data);
        res.json(data);
    } catch (error) {
        console.error(`Error fetching match data: ${error.message}`);
        res.status(500).send(`Error fetching match data: ${error.message}`);
    }
});

app.get('/api/seasonal/:playerId', async (req, res) => {
    const playerId = req.params.playerId;
    const headers = {
        'Authorization': `Bearer ${API_KEY}`,
        'Accept': 'application/vnd.api+json'
    };
    console.log(`Received request for player ID: ${playerId}`);
    try {
        const response = await fetch(`${BASE_URL}/players/${playerId}/seasons/lifetime`, { headers });
        console.log(`PUBG API Response status: ${response.status}`);
        if (!response.ok) throw new Error(`Error: ${response.status} - ${response.statusText}`);
        const data = await response.json();
        console.log('Seasonal stats fetched:', data);
        res.json(data);
    } catch (error) {
        console.error(`Error fetching seasonal stats: ${error.message}`);
        res.status(500).send(`Error fetching seasonal stats: ${error.message}`);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
