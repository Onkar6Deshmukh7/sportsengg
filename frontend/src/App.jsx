import { useState } from "react"
import Scrape from "./scraper/Scrape"
function App() {
  
  return (
    <>
    <div className=" flex w-screen h-screen flex-col justify-center items-center bg-slate-300">

      <header className="w-auto h-20 flex justify-center items-center text-4xl font-extrabold italic"> Sports Central </header>
      
      <div className="border w-auto flex h-auto text-sm">
        get the headlines from top Sports channels all at one place...
      </div>


      <div className="w-screen h-auto flex flex-col md:flex-row flex-wrap justify-around">
        <Scrape channel={"ESPN"}/>
        <Scrape channel={"BBC Sports"}/>
        <Scrape channel={"Sky Sports"}/>
      </div>

      
    </div>
    </>
  )
}

export default App
