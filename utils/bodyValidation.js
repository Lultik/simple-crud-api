const bodyValidation = (body) => {
  return new Promise((resolve, reject) => {
    if(Array.isArray(body.hobbies)) {
      if(!body?.hobbies.every((hobby) => typeof hobby === 'string')) {
        resolve({message: 'Hobbies should be array of strings'});
      }
    } else resolve({message: 'Hobbies should be array'});


    if(!body.name) resolve({message: 'Name is required'});
    if(typeof body.name !== 'string') resolve({message: 'Name should be string'});

    if(!body.age) resolve({message: 'Age is required'});
    if(typeof body.age !== 'number') resolve({message: 'Age should be number'});
    resolve();
  })
}

module.exports = {bodyValidation}
