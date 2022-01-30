const Pool = require('pg').Pool

const pool = new Pool({
  user: 'diazr',
  host: 'localhost',
  database: 'veritoneShoppingList',
  password: 'root',
  port: 5432,
});

const getProducts = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM products ORDER BY productid ASC', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  }) 
}

const createProduct = (body) => {
  return new Promise(function(resolve, reject) {
    const { name, longdescription, pcount } = body
    console.log("name:" + name)
    console.log("longdes:" + longdescription)
    console.log("pcount:" + pcount)
    
    pool.query('INSERT INTO products (name, longdescription) VALUES ($1, $2) RETURNING *', [name, longdescription], (error, results) => {
      if (error) {
        reject(error)
      }
     
    })
  })
}

const deleteProduct = (productId) => {
  return new Promise(function(resolve, reject) {
    const id = parseInt(productId)

    pool.query('DELETE FROM products WHERE productid = $1', [id], (error, results) => {
      if (error) {
        reject(error)
      }      
    })
  })
}

const editProduct = (body) => {
  return new Promise(function(resolve, reject) {

    const { id, name, longdescription } = body

    pool.query('update products set name=$2, longdescription=$3 WHERE productid = $1', [id], (error, results) => {
      if (error) {
        reject(error)
      }
    })
  })
}

module.exports = {
  getProducts,
  createProduct,
  editProduct,
  deleteProduct,
}