import React, { useState } from 'react';
import Adjust from '@material-ui/icons/Adjust';
import './App.css';
import Modal from './components/modal';
import Chart from './components/chart';
import { getResults, getTest } from './services/cinode';

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

const App = () => {
  const initialArray: D[] = [];
  const [results, setResults] = useState(initialArray);
  const [searchString, setSearchString] = useState('');
  const [visible, setModalVisible] = useState(false);
  const [content, setContent] = useState('');
  const [byTech, setByTech] = useState(true);

  const handleSubmit = evt => {
    evt.preventDefault();
    setContent(searchString);
    setSearchString('');
    setContent(`Added ${content}.`);
    getResults(searchString).then(r => {
      setResults(results => [...results, r.data]);
      setModalVisible(true);
      // setInterval(() => setModalVisible(false), 2500);
    });
  };

  const handleOther = evt => {
    evt.preventDefault();
    getTest(searchString).then(r => {
      console.log('DATA: ', r);
    });
  };

  const toggleModal = () => {
    setModalVisible(!visible);
  };

  const tester = (test: U[]) => {
    let temp = '';

    test.map(t => {
      temp += t.first;
    });
    setContent(temp);
    setModalVisible(true);
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <Modal show={visible} handleClose={toggleModal}>
          <p>{content}</p>
        </Modal>
        <form onSubmit={byTech ? handleSubmit : handleOther}>
          <label>
            <div onClick={() => setByTech(!byTech)}>
              <Adjust />
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
        <Chart data={results} f={tester} />
      </header>
    </div>
  );
};

export default App;
