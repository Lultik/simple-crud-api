const persons = require("./../data/person.json");
const {findAll, findById, create} = require('./personsModel');

describe('test model functions', () => {
  test('get all persons', async () => {
    await expect(findAll()).resolves.toMatchObject(persons);
  });

  test('get person by id', async () => {
    const id = "1b23a2a0-9e1f-4369-aaa5-e7f3d276ff93";

    const person = await persons.find((p) => p.id === id);

    if (person) {
      await expect(findById(id)).resolves.toMatchObject(person);
    } else {
      await expect(findById(id)).resolves.toBeUndefined();
    }
  });

  test('create person', async () => {
    const newPerson = {
      name: "test",
      age: 12,
      hobbies: [ 'testing' ],
    }

    await expect(create(newPerson)).resolves.toMatchObject(expect.objectContaining(newPerson));
  });
})
