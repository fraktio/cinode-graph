import axios from 'axios';

export function getResults(tech: string) {
  const url = 'http://localhost:5000/skills/' + tech;

  return axios.get(url).then(res => console.log('Response Proxylta: ', res));
}
