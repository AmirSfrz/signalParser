const express = require('express')
const port = 8000;
const ex = express();

ex.use(express.json())

ex.use(
  express.urlencoded({
    extended: true
  })
)

ex.listen(port, () => {
  console.log(`Listening on port ${port}!\n`)
});


module.exports = ex;