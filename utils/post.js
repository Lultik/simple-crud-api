const fs = require('fs');

const postPerson = async (filename, content) => {
  const write = fs.createWriteStream(filename);

  await write.end(JSON.stringify(content));
}

module.exports = {
  postPerson,
}
