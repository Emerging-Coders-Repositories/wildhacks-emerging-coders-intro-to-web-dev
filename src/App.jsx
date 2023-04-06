import React from 'react'
import { useState, useEffect } from 'react'
import Header from './components/header';
import List from './components/List';
import './App.css'

function App() {

  const [word, setWord] = useState(""); 
  const [syns, setSyns] = useState([]); 
  const [score, setScore] = useState(5500); 

  const handleGetNewSynmoms = async (e) => {
    e.preventDefault(); 
    const response = await fetch(`https://api.datamuse.com/words?rel_syn=${word}`);
    const responseData = await response.json();  
    const filteredData = responseData.filter(word => word.score >= score);
    console.log(filteredData);  
    setSyns(filteredData); 
    // This is going to print an empty array
    // But syns holds the data that we want
    console.log(syns)
  }

  // Triggers re-render of syns
  // We need to do this because of Reacts asych way of updating states
  useEffect(() => {
    console.log(syns);
  }, [syns]);

  return (
    <div className="App">
      <Header />
      <div className='forms-container'>
        <form onSubmit={handleGetNewSynmoms}> 
          <label htmlFor="word-input">Your word:  </label>
          <input
            value={word}
            onChange={(e) => setWord(e.target.value)}
            id="word-input" />
          <button>Submit</button>
        </form>
        <label htmlFor="score-filter">Your desired score: </label>
        <input 
          type='range' 
          min={0} 
          max={5500} 
          step={50} 
          value={score} 
          onChange={e => setScore(e.target.value)} />
        <span>{score}</span>
        <List data={syns} />
      </div>
    </div>
  )
}

export default App
