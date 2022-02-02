// server/index.js

const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || 3001;

const app = express();
//let shoppinglists = [];

app.use(cors())
// Configuring body parser middleware
/*app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
*/


// api endpoint
app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
  });
/*app.post('/api', (req, res) => {
  res.send('Send POST to homepage');
});
app.put('/api', (req, res) => {
  res.send('Send PUT to homepage');
  });
  
app.get("/", (req, res) => {
  res.json({ message: "Hello from server!" });
});
app.post('/', (req, res) => {
res.send('Send POST to homepage');
});
app.put('/', (req, res) => {
  res.send('Send PUT to homepage');
  });
  */

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});