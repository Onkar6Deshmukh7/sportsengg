const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors({
  origin: ['https://sportsengg.vercel.app', 'http://localhost:5173'], // Allow both production and local URLs
  credentials: true
}));

app.get('/rss', async (req, res) => {
  const { url, isMobile } = req.query; // Get isMobile from the query parameters

  // Allow only specific URLs (BBC and Sky Sports) to prevent misuse
  const allowedUrls = [
    'http://feeds.bbci.co.uk/sport/rss.xml', 
    'https://www.skysports.com/rss/12040'
  ];

  if (!allowedUrls.includes(url)) {
    return res.status(400).send('Invalid RSS feed URL');
  }

  // Set a custom User-Agent based on the device type
  const userAgent = isMobile 
    ? 'Mozilla/5.0 (Linux; Android 10; Pixel 3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Mobile Safari/537.36' // Mobile User-Agent
    : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'; // Desktop User-Agent

  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': userAgent
      }
    });

    res.set('Content-Type', 'application/rss+xml'); // Set the correct content type
    res.send(response.data); // Send back the RSS feed content
  } catch (error) {
    console.error('Error fetching RSS feed:', error);
    res.status(500).send('Error fetching RSS feed');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Proxy server running on http://localhost:${port}`);
});
