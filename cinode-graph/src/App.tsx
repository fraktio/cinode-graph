import React, { useState } from 'react';
import Adjust from '@material-ui/icons/Adjust';
import './App.css';
import Modal from './components/modal';
import Chart from './components/chart';
import { getResults, getUserSkills } from './services/cinode';

interface U {
  first: string;
  last: string;
  level: number;
}

interface D {
  averageLevel: number;
  tech: string;
  userCount: number;
  userArray: U[];
}

interface C {
  info: string;
}

const App = () => {
  const initialArray: D[] = [];
  const initialArraySecond: C[] = [];
  const [results, setResults] = useState(initialArray);
  const [searchString, setSearchString] = useState('');
  const [visible, setModalVisible] = useState(false);
  const [content, setContent] = useState(initialArraySecond);
  const [byTech, setByTech] = useState(true);

  const handleSubmit = evt => {
    evt.preventDefault();
    setContent([
      {
        info: searchString
      }
    ]);
    setSearchString('');
    getResults(searchString).then(r => {
      setResults(results => [...results, r.data]);
      setTimeout(() => setModalVisible(true), 250);
    });
  };

  const handleUserSubmit = evt => {
    evt.preventDefault();
    getUserSkills(searchString).then(r => {
      const temp: C[] = [];

      r.skills.sort((a, b) => b.level - a.level);
      r.skills.map(s => {
        temp.push({ info: s.tech + ' level ' + s.level });
      });
      setContent(temp);
      setTimeout(() => setModalVisible(true));
    });
  };

  const toggleModal = () => {
    setModalVisible(!visible);
  };

  const tester = (test: U[]) => {
    const temp: C[] = [];

    test.sort((a, b) => a.level - b.level);
    test.map(t => {
      temp.push({ info: t.first + ' ' + t.last + ' level ' + t.level });
    });
    setContent(temp);
    setTimeout(() => setModalVisible(true), 500);
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <Modal show={visible} handleClose={toggleModal}>
          {content.map(m => (
            <p>{m.info}</p>
          ))}
        </Modal>
        <form onSubmit={byTech ? handleSubmit : handleUserSubmit}>
          <label>
            <div className='Search-button' onClick={() => setByTech(!byTech)}>
              <Adjust />
              {byTech ? 'Search by technology:' : 'Search by employee:'}
            </div>

            <input
              type='text'
              value={searchString}
              onChange={e => setSearchString(e.target.value)}
            />
          </label>
          <input type='submit' value='Submit' />
        </form>
        <Chart data={results} f={tester} />
      </header>
    </div>
  );
};

export default App;
