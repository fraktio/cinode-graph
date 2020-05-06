import React, { useState, useEffect } from 'react';
import './App.css';
import Chart from './components/chart';
import { getResults } from './services/cinode';

interface D {
  averageLevel: number;
  tech: string;
  users: number;
}

const App = () => {
  const initialArray: D[] = [];
  const [results, setResults] = useState(initialArray);

  useEffect(() => {
    getResults('react').then(r => {
      setResults(results => [...results, r.data]);
    });
  }, []);

  return (
    <div className='App'>
      <header className='App-header'>
        <Chart data={results} />
      </header>
    </div>
  );
};

export default App;
