import React, { useState } from 'react';
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
  const [searchString, setSearchString] = useState('');

  const handleSubmit = evt => {
    evt.preventDefault();
    getResults(searchString).then(r => {
      setResults(results => [...results, r.data]);
    });
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <form onSubmit={handleSubmit}>
          <label>
            Search by technology:
            <input
              type='text'
              value={searchString}
              onChange={e => setSearchString(e.target.value)}
            />
          </label>
          <input type='submit' value='Submit' />
        </form>
        <Chart data={results} />
      </header>
    </div>
  );
};

export default App;
