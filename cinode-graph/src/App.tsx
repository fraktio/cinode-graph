import React from 'react';
import './App.css';
import Chart from './components/chart';
import { getResults } from './services/cinode';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <button onClick={() => getResults('react')}>Test</button>
        <Chart />
      </header>
    </div>
  );
}

export default App;
