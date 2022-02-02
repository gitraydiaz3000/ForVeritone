const Pool = require('pg').Pool

const pool = new Pool({
  user: 'diazr',
  host: 'localhost',
  database: 'veritoneShoppingList',
  password: 'root',
  port: 5432,
});

const getShoppingList = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM shoppinglist ORDER BY shoppinglistid ASC', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  }) 
}



const createShoppingItem = (body) => {
  return new Promise(function(resolve, reject) {
    const { name, description, itemcount } = body
    console.log("now adding:")
    console.log("name:" + name)
    console.log("purchased:" + "false")
    console.log("itemcount:" + itemcount)
 //   description = description.replace(/'/gi, "''")
    console.log("new description:" + description)
    
    var query = 'INSERT INTO shoppinglist (name, purchased, itemcount, description) VALUES (\''+name+ '\', '+ false+', \'' + itemcount + '\',\'' + description + '\') RETURNING *'    
    console.log("running query:" + query)
    pool.query(query, (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`A new shopping item has been added added`)
    })
  })
}

const deleteShoppingItem = (shoppingListId) => {
  return new Promise(function(resolve, reject) {
    const id = parseInt(shoppingListId)

    pool.query('DELETE FROM shoppinglist WHERE shoppinglistid = $1', [id], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`Shopping item deleted with ID: ${id}`)
    })
  })
}

const editShoppingItem = (id, body) => {
  return new Promise(function(resolve, reject) {

    const { name, purchased, itemcount, description } = body
    //console.log("now calling patch query: " + id, name, purchased, itemcount, description)
    var query = 'update shoppinglist set name=\'' + name + '\', purchased=\'' + purchased + '\', itemcount=\'' + itemcount + '\', description=\'' + description + '\' WHERE shoppinglistid = ' + id
    //console.log(query)
    pool.query(query, (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`Shopping item edited with ID: ${id}`)
    })
  })
}

module.exports = {
  getShoppingList,
  createShoppingItem,
  editShoppingItem,
  deleteShoppingItem,
}