import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
// UI 
import { MuiThemeProvider, styles } from '@mui/material/styles';
import { ThemeProvider } from '@material-ui/styles'; 
import { blue } from '@mui/material/colors'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import IconButton from '@mui/material/IconButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

// screens
import Add from './Add';
import Edit from './Edit';


var iCallOnce = 0;
var bShowEmpty = false;

function App() {
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(0);
  const [showBase, setShowBase] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showEmpty, setShowEmpty] = useState(false);
  const [products, setProducts] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [checked, setChecked] = React.useState([0]);

  useEffect(()=>
  {
    getProducts();
  }, []);


  const handleToggle = (value) => () => {
    console.log("toggling:" + value)
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };


  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };


  function createProduct() {
    let name = prompt('Enter product name');
    let email = prompt('Enter product long description');
    fetch('http://localhost:3001/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name, email}),
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getProducts();
      });
  }
 
  

  function getProducts()
  {
    fetch('http://localhost:3001')
    .then(response => {
      
      return response.text();
    })
    .then(data => {
      console.log("data.length:" + data.length);
      setProducts(data);
      if (data.length <= 2)
      {
        try
        {        
          setShowBase(true)
          setShowEmpty(true)
        }
        catch (err)
        {
          
        }
      }
    });
    

  }

  function openDeleteDialog(bShow, id)
  {
    setOpenDialog(true)
    setDeleteId(id)
    
  }
  
  function deleteProduct(id) {

    console.log("calling delete:" + id)
    fetch(`http://localhost:3001/products/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
       // console.log(response.text())        
       // return response.text();
      })
      .then(data => {
        alert(data);
        getProducts();
      });
    
  }

  

 function editProduct(id) {

  console.log("calling edit:" + id)
/*  fetch(`http://localhost:3001/products/${id}`, {
    method: 'PUT',
  })
    .then(response => {
      return response.text();
    })
    .then(data => {
      alert(data);
      getProducts();
    }); */
}

function fnOpenAdd()
{
  //window.location.href='add'
  setShowBase(false)
  setShowAdd(true)
  setShowEdit(false)

}

function fnShowHeaderRow ()
  {    
    return(
      <div>
        { !showEmpty ?
          <div>
            <div className="containerLeft">&nbsp;&nbsp;Your Items</div>
            <div className="containerRight"><Button color="primary" sx={{borderRadius:1, backgroundColor:'blue', padding:"8px 8px", color:"white", fontSize:"8px"}} onClick={fnOpenAdd}>Add Item</Button>
            </div>
          </div>
      : ''}
      </div>
      );
    
  }

  function fnHandleFirstAdd()
  {
    setShowBase(false)
    setShowAdd(true)
    bShowEmpty = false
  }

  function fnShowEmptyList()
  {
    
        return(
          
          <div>

          <Box className="containerCenterEmpty" sx={{height:300, width:500, backgroundColor:'white'}}>
            <div className="containerHeaderCenter">Your Shopping list is empty :( <p></p>
              <Button color="primary" sx={{borderRadius:1, width:100, height:30, backgroundColor:'blue', fontStyle:'normal', padding:"8px 8px", color:"white", fontSize:"7px"}} onClick={(e) => {fnHandleFirstAdd()}}>Add Your First Item</Button>
              </div>        
          </Box>
          </div>        
        );    
  }
  
  
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleProcessDelete = () => {
    setOpenDialog(false);
    deleteProduct(deleteId)
  };

let productsArray = []
  

  // main engine
  function isPostBack()
  {
    var bRetVal = false
    bRetVal = document.referrer.indexOf(document.location.href) > -1;
    if (bRetVal)
    {
      console.log("is a postback")
    }
    else
    {
      console.log("is not a postback")
    }
   return bRetVal
  }
 
  if (iCallOnce == 0)
  {
    console.log("productsArray.length:" + productsArray.length)
    console.log("products:" + products.length)
    console.log(JSON.parse(products))
    if ((products === null) || (products == undefined))
    {
      console.log("products is null")
    }
    else
    {
      console.log("products.length:" + products.length)
      productsArray = JSON.parse(products);
    }
    
    bShowEmpty = true
    // if (productsArray.length < 2)
    if (!isPostBack())      
    {
      try
      {        
        bShowEmpty = true
        setShowBase(true)
        setShowEmpty(true)
        //setShowAdd(false)
      }
      catch (err)
      {
        console.log("error showing base:" + err)
      }
    }
    iCallOnce = 1
  }
  

  return (
    <div>      
    <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>Delete Item?</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete this item? This can not be undone.
              </DialogContentText>              
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Cancel</Button>
              <Button onClick={handleProcessDelete}>Delete</Button>
            </DialogActions>
          </Dialog>
      { (showBase || bShowEmpty)? 
      <div className="App">            
        <Box sx={{ border:'1' , marginTop:'100px', marginLeft:'auto',marginRight:'auto', width: '80%',  bgcolor: 'white' }}> {/*background.paper*/}
        
        {(productsArray.length > 0)? fnShowHeaderRow() : fnShowEmptyList()}
                  
        <List component="nav" aria-label="main mailbox folders">
          {/* productsArray? productsArray : 'no products' */}     
          {/* products? products : 'no products' (/)}           
          { /* console.log(Object.keys(products)) */ }
          {productsArray? productsArray.map((product)=>{
          const labelId = `checkbox-list-label-${product.name}`;
          return(
            <ListItem key={product.productid}
            secondaryAction={
              <div>
              <IconButton edge="end" aria-label="edit" onClick={(e)=>{editProduct(product.productid)}}>
              <EditIcon > </EditIcon>
              </IconButton>&nbsp;
              <IconButton edge="end" aria-label="delete" onClick={(e)=>{ openDeleteDialog(true, product.productid)}}>
              <DeleteIcon > </DeleteIcon>
              </IconButton>
              </div>
              }> 
              <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={checked.indexOf({product}) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                </ListItemIcon> 
                <ListItemButton
                  selected={selectedIndex === 0}
                  onClick={(event) => handleListItemClick(event, 0)}
                >
                <ListItemText primary={product.name} />
                </ListItemButton>   
        
              </ListItem>                 
            )        
            })
            : fnShowEmptyList()} 
            
        </List>       
      </Box>
      </div>
      :  ''}        
    { showAdd? 
    <Add />
    : '' }
    { showEdit? <Edit />
    : '' }
    </div>
  );
}

export default App;
