const express = require('express');
const cors = require('cors');
const axios = require('axios');
const dotenv = require('dotenv');

const app = express();

app.use(cors());
dotenv.config();

const apiUrl = 'https://api.cinode.com';

function getSkills(skillName) {
  const basic = new Buffer(
    `${process.env.ACCESS_ID}:${process.env.ACCESS_SECRET}`,
    'binary'
  ).toString('base64');

  const config = {
    headers: {
      Authorization: `Basic ${basic}`
    }
  };

  return axios
    .get(apiUrl + '/token', config)
    .then(res => {
      const url = apiUrl + '/v0.1/companies/1404/skills/search/term';
      return axios.post(
        url,
        {
          term: skillName,
          min: 0,
          max: 50,
          limit: 50
        },
        {
          headers: {
            Authorization: `Bearer ${res.data.access_token}`
          }
        }
      );
    })
    .then(response => {
      return response.data.hits;
    })
    .catch(error => console.log('Error: ', error));
}

function getUserSkills(id) {
  const basic = new Buffer(
    `${process.env.ACCESS_ID}:${process.env.ACCESS_SECRET}`,
    'binary'
  ).toString('base64');

  const config = {
    headers: {
      Authorization: `Basic ${basic}`
    }
  };

  return axios
    .get(apiUrl + '/token', config)
    .then(res => {
      const url = apiUrl + '/v0.1/companies/1404/users/' + id + '/skills';
      return axios.get(url, {
        headers: {
          Authorization: `Bearer ${res.data.access_token}`
        }
      });
    })
    .then(response => {
      return response.data;
    })
    .catch(error => console.log('Error: ', error));
}

function getUsers() {
  const basic = new Buffer(
    `${process.env.ACCESS_ID}:${process.env.ACCESS_SECRET}`,
    'binary'
  ).toString('base64');

  const config = {
    headers: {
      Authorization: `Basic ${basic}`
    }
  };

  return axios
    .get(apiUrl + '/token', config)
    .then(res => {
      const url = apiUrl + '/v0.1/companies/1404/users';
      return axios.get(url, {
        headers: {
          Authorization: `Bearer ${res.data.access_token}`
        }
      });
    })
    .then(response => {
      return response.data;
    })
    .catch(error => console.log('Error: ', error));
}

app.get('/skills/:id', async (req, res) => {
  getSkills(req.params.id).then(r => {
    const temp = r;
    const users = [];
    let count = 0;

    temp.map(m => {
      count = count + m.skills[0].level;
      users.push({
        first: m.firstname,
        last: m.lastname,
        level: m.skills[0].level
      });
    });
    const average = count / temp.length;
    res.json({
      tech: req.params.id,
      userCount: temp.length,
      userArray: users,
      averageLevel: average
    });
  });
});

app.get('/user/:id', async (req, res) => {
  getUsers().then(r => {
    const temp = r;
    let userId = 'no data';
    temp.map(t => {
      const test = t.firstName + ' ' + t.lastName;

      if (test.toLowerCase() === req.params.id.toLowerCase()) {
        userId = t.companyUserId.toString();
      }
    });

    getUserSkills(userId).then(r => {
      res.json({
        test: r
      });
    });
  });
});

function notFound(req, res, next) {
  res.status(404);
  re;
  const error = new Error('Not Found');
  next(error);
}

function errorHandler(error, req, res, next) {
  res.status(res.statusCode || 500);
  res.json({
    message: error.message
  });
}

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT;
app.listen(port, () => {
  console.log('Listening on port', port);
});
