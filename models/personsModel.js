const persons = require('./../data/person.json');
const { v4: uuidv4 } = require('uuid');
const { postPerson } = require('./../utils/post');

const findAll = async () => {
  return new Promise((resolve, reject) => {
    resolve(persons);
  })
}

const findById = async (id) => {
  return new Promise((resolve, reject) => {
    const person = persons.find((p) => p.id === id);
    resolve(person);
  })
}

const create = (person) => {
  return new Promise((resolve, reject) => {
    const newPerson = {id: uuidv4(), ...person};
    persons.push(newPerson);

    postPerson('./data/person.json', persons);

    resolve(newPerson);
  })
}

const update = async (id, person) => {
  return new Promise((resolve, reject) => {
    const index = persons.findIndex((p) => p.id === id);
    persons[index] = {id, ...person};

    postPerson('./data/person.json', persons);

    resolve(persons[index]);
  })
}

const remove = async (id) => {
  return new Promise((resolve, reject) => {
    const newPersonsList = persons.filter((p) => p.id !== id);

    postPerson('./data/person.json', newPersonsList);

    resolve();
  })
}


module.exports = {
  findAll,
  findById,
  create,
  update,
  remove
}
