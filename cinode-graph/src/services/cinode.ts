import axios from 'axios';

export async function getResults(tech: string) {
  const url = 'http://localhost:5000/skills/' + tech;

  return await axios.get(url);
}

export async function getTest(tech: string) {
  const url = 'http://localhost:5000/skillz/' + tech;

  return await axios.get(url);
}
