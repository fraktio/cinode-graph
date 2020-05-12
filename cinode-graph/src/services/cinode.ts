import axios from 'axios';

export async function getResults(tech: string) {
  const url = 'http://localhost:5000/skills/' + tech;

  return await axios.get(url);
}

export async function getUserSkills(user: string) {
  const url = 'http://localhost:5000/user/' + user;

  const res = await axios.get(url);
  // TODO: All data formatting process to backend.
  const temp = [] as any;
  res.data.test.map(m =>
    temp.push({ tech: m.keyword.masterSynonym, level: m.level })
  );

  return { user: user, skills: temp };
}
