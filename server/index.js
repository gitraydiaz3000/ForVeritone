const express = require('express')
const app = express()
const port = 3001
const shoppinglist_model = require('./shoppinglist_model')
app.use(express.urlencoded({extended: false}))

// cors settings
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration
//////////////


app.use(express.json())
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});


app.post('/shoppinglist', (req, res) => {
  console.log("here we go shopping list post")
   
   shoppinglist_model.createShoppingItem(req.body)
   .then(response => {
     res.status(200).send(response);
   })
   .catch(error => {
     res.status(500).send(error);
   })
 })
 
 
 app.patch('/shoppinglist/:id', (req, res) => {
  
  const {id} = req.params
  const changes = req.body
  shoppinglist_model.editShoppingItem(id, changes)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})


app.delete('/shoppinglist/:id', (req, res) => {
  shoppinglist_model.deleteShoppingItem(req.params.id)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})


app.get('/shoppinglist/', (req, res) => {
  
  shoppinglist_model.getShoppingList()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})


app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})