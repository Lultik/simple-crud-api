const getPostData = (req, res) => {
  return new Promise((resolve, reject) => {
    try {
      let body = '';
      req
        .on('data', (chunk) => {
        body += chunk.toString();
      })
        .on('end', async () => {
          resolve(body);
        })
    } catch (err) {
      reject(err);
    }
  })
}

module.exports = {getPostData}
