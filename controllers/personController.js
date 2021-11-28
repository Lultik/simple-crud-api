const Persons = require('../models/personsModel');
const {getPostData} = require("../utils/getPostData");
const {bodyValidation} = require("../utils/bodyValidation");
const {IdValidation} = require('../utils/idValidator');

const getPersons = async (req, res) => {
  try {
    const persons = await Persons.findAll();

    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(persons));

  } catch (err) {
    res.writeHead(500, {'Content-Type': 'application/json'});
    res.end({message: err.message});
  }
}

const getPersonById = async (req, res, id) => {
  try {

    const errMessage = await IdValidation(id);

    if(errMessage) {
      res.writeHead(400, {'Content-Type': 'application/json'});
      res.end(JSON.stringify(errMessage));
      return;
    }

    const person = await Persons.findById(id);

    if (!person) {
      res.writeHead(404, {'Content-Type': 'application/json'});
      res.end(JSON.stringify({message: 'Person not found'}));
    } else {
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify(person));
    }
  } catch (err) {
    res.writeHead(500, {'Content-Type': 'application/json'});
    res.end({message: err.message});
  }
}

const createPerson = async (req, res) => {
  try {
    let body = await getPostData(req, res);

    const bodyData = JSON.parse(body);

    const errMessage = await bodyValidation(bodyData);

    if (errMessage) {
      res.writeHead(400, {'Content-Type': 'application/json'});
      res.end(JSON.stringify(errMessage));
    } else {
      const newData = {name: bodyData.name, age: bodyData.age, hobbies: bodyData.hobbies}
      const newPerson = await Persons.create(newData);

      res.writeHead(201, {'Content-Type': 'application/json'});
      res.end(JSON.stringify(newPerson));
    }

  } catch (err) {
    res.writeHead(500, {'Content-Type': 'application/json'});
    res.end({message: err.message});
  }
}

const updatePerson = async (req, res, id) => {
  try {
    const person = getPersonById(id);

    if (!person) {
      res.writeHead(404, {'Content-Type': 'application/json'});
      res.end(JSON.stringify({message: 'Person not found'}));
    } else {
      let body = await getPostData(req, res);

      const bodyData = JSON.parse(body);

      const errMessage = await bodyValidation(bodyData);

      if (errMessage) {
        res.writeHead(400, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(errMessage));
      } else {
        const data = {
          name: bodyData.name || person.name,
          age: bodyData.age || person.age,
          hobbies: bodyData.hobbies || person.hobbies,
        }

        const newPerson = await Persons.update(id, data);

        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(newPerson));
      }
    }
  } catch (err) {
    res.writeHead(500, {'Content-Type': 'application/json'});
    res.end({message: err.message});
  }
}

const deletePerson = async (req, res, id) => {
  try {
    const person = await Persons.findById(id);

    if (!person) {
      res.writeHead(404, {'Content-Type': 'application/json'});
      res.end(JSON.stringify({message: 'Person not found'}));
    } else {
      await Persons.remove(id);
      res.writeHead(204, {'Content-Type': 'application/json'});
      res.end();
    }
  } catch (err) {
    res.writeHead(500, {'Content-Type': 'application/json'});
    res.end({message: err.message});
  }
}

module.exports = {
  getPersons,
  getPersonById,
  createPerson,
  updatePerson,
  deletePerson
}
