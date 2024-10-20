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
          feedUrl = 'https://www.espn.com/espn/rss/news';
          break;
        case 'BBC Sports':
          // Call the backend proxy to avoid CORS issues
          feedUrl = `http://localhost:3001/rss?url=http://feeds.bbci.co.uk/sport/rss.xml`;
          break;
          case 'Sky Sports':
            feedUrl = `http://localhost:3001/rss?url=https://www.skysports.com/rss/12040`;
            break;          
        default:
          feedUrl = 'https://www.espn.com/espn/rss/news'; // Default to ESPN
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
      {/* <header className='w-screen text-3xl italic font-bold flex justify-center items-center absolute top-0'>
        Sports Central
      </header> */}

      <div id='channels_wrapper' className='w-auto h-96'>
        <div id='channel_card' className='w-72 h-96 border rounded-lg overflow-y-auto'>
          <span className='w-full flex justify-center items-center h-auto underline text-xl italic'>
            {channel}
          </span>

          {headlines.map((headline, index) => (
            <li className='list-none m-2' key={index}>
              <a href={headline.link} target="_blank" rel="noopener noreferrer">
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
