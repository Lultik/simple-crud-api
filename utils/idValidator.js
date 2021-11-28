const IdValidation = (id) => {
  return new Promise((resolve, reject) => {
    const idRegex = /\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/;
    if (!idRegex.test(id)) {
      resolve({message: 'Incorrect ID'});
    } else {
      resolve();
    }
  })
}

module.exports = {IdValidation};
