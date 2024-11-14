import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Scrape({ channel }) {
  const [headlines, setHeadlines] = useState([]);

  useEffect(() => {
    const fetchHeadlines = async () => {
      let feedUrl = '';

      switch (channel) {
        case 'ESPN':
          feedUrl = 'https://www.espn.com/espn/rss/news';
          break;
        case 'BBC Sports':
          feedUrl = `https://sportsengg-1.onrender.com/rss?url=http://feeds.bbci.co.uk/sport/rss.xml`;
          break;
        case 'Sky Sports':
          feedUrl = `https://sportsengg-1.onrender.com/rss?url=https://www.skysports.com/rss/12040`;
          break;
        default:
          feedUrl = 'https://www.espn.com/espn/rss/news';
      }

      try {
        const response = await axios.get(feedUrl);
        const parser = new DOMParser();
        const xml = parser.parseFromString(response.data, 'text/xml');
        const items = Array.from(xml.querySelectorAll('item')).map((item) => ({
          title: item.querySelector('title')?.textContent,
          link: item.querySelector('link')?.textContent,
        }));
        setHeadlines(items);
      } catch (error) {
        console.error('Error fetching headlines:', error);
      }
    };

    fetchHeadlines();
  }, [channel]);

  return (
    <div className="w-full h-auto flex flex-col justify-center items-center p-4 bg-gray-100">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-yellow-500 text-white p-4 text-center">
          <h2 className="text-2xl font-extrabold">{channel} Headlines</h2>
        </div>
        <div className="p-4 space-y-4">
          {headlines.length > 0 ? (
            headlines.map((headline, index) => (
              <div
                key={index}
                className="border-b border-gray-300 py-2 px-3 rounded-lg hover:bg-gray-50 transition duration-300"
              >
                <a
                  href={headline.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-semibold text-blue-600 hover:text-blue-800"
                >
                  {headline.title}
                </a>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No headlines available at the moment.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Scrape;
