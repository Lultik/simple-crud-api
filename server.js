const http = require('http');
require('dotenv').config({path: '.env'});
const {getPersons, getPersonById, createPerson, updatePerson, deletePerson} = require('./controllers/personController');
const {getId} = require("./utils/getId");

const server = http.createServer(async (req, res) => {

  const idRegex = /\/person\/[\w\-]+/i;

  if (req.url === '/person' && req.method === 'GET') {
    await getPersons(req, res);
  } else if (req.url.match(idRegex) && req.method === 'GET') {
    const id = getId(req);   //  /person/:id
     await getPersonById(req, res, id);
  } else if (req.url === '/person' && req.method === 'POST') {
    await createPerson(req, res);
  } else if (req.url.match(idRegex) && req.method === 'PUT') {
    const id = getId(req);  //  /person/:id
    await updatePerson(req, res, id);
  } else if (req.url.match(idRegex) && req.method === 'DELETE') {
    const id = getId(req);  //  /person/:id
    await deletePerson(req, res, id);
  } else {
    res.writeHead(404, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({message: 'Route not found'}));
  }

  res.end();
});

const PORT = process.env.PORT || 5001;

server.listen(PORT, () => console.log(`Server has started on port ${PORT}...`))

module.exports = {server};
