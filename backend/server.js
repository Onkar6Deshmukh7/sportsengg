const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 3001; // Choose any port you like

app.use(cors()); // Enable CORS for all routes

app.get('/rss', async (req, res) => {
  const { url } = req.query;

  // Allow only specific URLs (BBC and Sky Sports) to prevent misuse
  const allowedUrls = [
    'http://feeds.bbci.co.uk/sport/rss.xml', 
    'https://www.skysports.com/rss/12040'
  ];

  if (!allowedUrls.includes(url)) {
    return res.status(400).send('Invalid RSS feed URL');
  }

  try {
    const response = await axios.get(url);
    res.set('Content-Type', 'application/rss+xml'); // Set the correct content type
    res.send(response.data); // Send back the RSS feed content
  } catch (error) {
    console.error('Error fetching RSS feed:', error);
    res.status(500).send('Error fetching RSS feed');
  }
});

app.listen(port, () => {
  console.log(`Proxy server running on http://localhost:${port}`);
});