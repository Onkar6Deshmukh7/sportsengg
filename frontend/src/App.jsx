import { useState } from "react";
import { Link, animateScroll as scroll } from "react-scroll";
import Scrape from "./scraper/Scrape";

function App() {
  return (
    <>
      <div className="flex w-screen min-h-screen flex-col justify-start items-center bg-gray-100">

        {/* Sticky Header Section */}
        <header className="w-full h-20 flex justify-center items-center bg-blue-600 text-white text-4xl font-extrabold italic sticky top-0 z-10">
          <h1 className="underline">Sports Central</h1>
        </header>

        {/* Sticky Navigation Links with react-scroll */}
        <nav className="w-full flex justify-center items-center gap-6 py-4 bg-gray-200 sticky top-20 z-10">
          <Link
            to="espn"
            smooth={true}
            duration={500}  // Scroll duration in milliseconds
            offset={-70}    // Adjust offset if header overlaps
            className="text-lg font-semibold text-blue-600 hover:text-blue-800 cursor-pointer"
          >
            ESPN
          </Link>
          <Link
            to="bbc"
            smooth={true}
            duration={500}
            offset={-70}
            className="text-lg font-semibold text-blue-600 hover:text-blue-800 cursor-pointer"
          >
            BBC Sports
          </Link>
          <Link
            to="sky"
            smooth={true}
            duration={500}
            offset={-70}
            className="text-lg font-semibold text-blue-600 hover:text-blue-800 cursor-pointer"
          >
            Sky Sports
          </Link>
        </nav>

        {/* Main Content Section */}
        <main className="w-full h-auto flex flex-col md:flex-row flex-wrap justify-center items-center p-6 gap-6 mt-20">
          {/* Each Scrape component has a unique id for navigation */}
          <section id="espn">
            <Scrape channel={"ESPN"} />
          </section>
          <section id="bbc">
            <Scrape channel={"BBC Sports"} />
          </section>
          <section id="sky">
            <Scrape channel={"Sky Sports"} />
          </section>
        </main>

      </div>
    </>
  );
}

export default App;
