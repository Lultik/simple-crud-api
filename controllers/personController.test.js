const {server} = require('./../server');
const supertest = require('supertest');
const serverRequest = supertest(server);

const persons = require('./../data/person.json');

describe('Persons Endpoints', () => {
  test('GET /persons shows all persons', async () => {
    await serverRequest
      .get('/person')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body).toMatchObject(persons);
      })

  });

  test('GET /person/:id with correct id', async () => {
    const id = '1b23a2a0-9e1f-4369-aaa5-e7f3d276ff93';
    const res = await serverRequest
      .get(`/person/${id}`)
      .expect('Content-Type', /json/);

    const person = persons.find((p) => p.id === id);

    if (person) {
      expect(res.status).toEqual(200);
      expect(JSON.parse(res.text)).toMatchObject(person);
    } else {
      expect(res.status).toEqual(404);
      expect(JSON.parse(res.text)).toMatchObject({message: 'Person not found'});
    }
  });
  test('GET /person/:id with INcorrect id', async () => {
    const id = '1b23a2a0-9e1f-4369-aaa5-e7f3d276ff32';
    const res = await serverRequest
      .get(`/person/${id}`)
      .expect('Content-Type', /json/);

    expect(res.status).toEqual(404);
    expect(JSON.parse(res.text)).toMatchObject({message: 'Person not found'});
  });

  test('POST /person', async () => {
    const newPerson = {
      "name": "Student 1",
      "age": 4,
      "hobbies": ["low points"],
    }

    serverRequest
      .post('/person')
      .send(newPerson)
      .expect(201)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body).toMatchObject(expect.objectContaining(newPerson))
      })

  });

  test('server should return code 500 at creating person with invalid data', async () => {
    const newPerson = `{
      "name": "Student 2",
      age: 12,
      "hobbies": ["scream on high points and score"]
    }`;

    serverRequest
      .post('/person')
      .send(newPerson)
      .expect(500)
      .expect('Content-Type', /json/)
  });
})


