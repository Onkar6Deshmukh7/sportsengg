import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Scrape({ channel }) {
  const [headlines, setHeadlines] = useState([]);

  useEffect(() => {
    const fetchHeadlines = async () => {
      let feedUrl = '';
  
      // Switch between different channels, using the backend proxy server for BBC Sports
      switch (channel) {
        case 'ESPN':
          // Call the backend proxy to avoid CORS issues
          feedUrl = 'https://www.espn.com/espn/rss/news';
          break;
        case 'BBC Sports':
          // feedUrl = `http://localhost:3001/rss?url=http://feeds.bbci.co.uk/sport/rss.xml`;
          feedUrl = `https://sportsengg-1.onrender.com/rss?url=http://feeds.bbci.co.uk/sport/rss.xml`;
          break;
          case 'Sky Sports':
            // feedUrl = `http://localhost:3001/rss?url=https://www.skysports.com/rss/12040`;
            feedUrl = `https://sportsengg-1.onrender.com/rss?url=https://www.skysports.com/rss/12040`;
            break;          
        // default:
        //   feedUrl = 'https://www.espn.com/espn/rss/news';
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
    <div className='w-auto h-auto flex flex-col justify-center items-center m-2'>

      <div id='channels_wrapper' className='w-auto h-96 border-2 rounded-md border-yellow-500'>

          <span className='w-full flex justify-center items-center h-12 underline'>
             <p className='italic underline text-xl text-red-600 font-extrabold'>
                {channel} 
            </p>
          </span>

        <div id='channel_card' className='w-72 h-80 rounded-lg overflow-y-auto'>
          {headlines.map((headline, index) => (
            <li className='list-none m-2' key={index}>
              <a href={headline.link} target="_blank" rel="noopener noreferrer" className='italic'>
                {headline.title}
              </a>
            </li>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Scrape;
