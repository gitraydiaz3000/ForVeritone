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
    const { name, purchased, itemcount } = body
    /*console.log("name:" + name)
    console.log("purchased:" + purchased)
    console.log("itemcount:" + itemcount)*/
    pool.query('INSERT INTO shoppinglist (name, purchased, itemcount) VALUES ($1, $2, $3) RETURNING *', [name, purchased, itemcount], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`A new shopping item has been added added: ${JSON.stringify(results.rows[0])}`)
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

const editShoppingItem = (body) => {
  return new Promise(function(resolve, reject) {

    const { id, name, purchased, itemcount } = body

    pool.query('update shoppinglist set name=$2, purchased=$3, itemcount=$4 WHERE productid = $1', [id], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`Shopping item deleted with ID: ${id}`)
    })
  })
}

module.exports = {
  getShoppingList,
  createShoppingItem,
  editShoppingItem,
  deleteShoppingItem,
}