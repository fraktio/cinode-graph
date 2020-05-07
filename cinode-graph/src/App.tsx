import React, { useState } from 'react';
import './App.css';
import Modal from './components/modal';
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
  const [visible, setModalVisible] = useState(false);
  const [byTech, setByTech] = useState(true);

  const handleSubmit = evt => {
    evt.preventDefault();
    setSearchString('');
    getResults(searchString).then(r => {
      setResults(results => [...results, r.data]);
      setModalVisible(true);
      setInterval(() => setModalVisible(false), 2500);
    });
  };

  const handleOther = evt => {
    evt.preventDefault();
    console.log('Hohoo');
  };

  const toggleModal = () => {
    setModalVisible(!visible);
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <Modal show={visible} handleClose={toggleModal}>
          <p>Added {searchString}!</p>
        </Modal>
        <form onSubmit={byTech ? handleSubmit : handleOther}>
          <label>
            <div onClick={() => setByTech(!byTech)}>
              {byTech ? 'Search by technology:' : 'Search by employee'}
            </div>
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
