const getId = (req) => {
  return req.url.split('/')[2];
}

module.exports = { getId }
