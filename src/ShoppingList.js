import './App.css';
import React, {useState, useEffect} from 'react';

// UI 
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import CircularProgress from '@mui/material/CircularProgress';
// screens
import EditWithParm from './EditWithParm';
//import { deleteShoppingItem } from '../../server/shoppinglist_model';

function ShoppingList() {
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(0);
  const [editId, setEditId] = useState(0);
  const [editName, setEditName] = useState('');
  const [editPurchased, setEditPurchased] = useState(0);
  const [editCount, setEditCount] = useState(0);
  const [editDescription, setEditDescription] = useState(0);
    
  const [showBase, setShowBase] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showProgress, setShowProgress] = useState(true);
  const [showEmpty, setShowEmpty] = useState(false);
  const [shoppinglist, setShoppingList] = useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [checked, setChecked] = React.useState([0]);

  useEffect(()=>
  {
            getShoppingList();
  }, []);


  function openEditDialog(bShow, id, myName, myCount, myPurchased, myDescription)
  {
    console.log("setting edit screen parms to: ")
    console.log(id)
    console.log(myName)
    console.log(myCount)
    console.log(myPurchased)
    setEditId(id)    
    setEditCount(myCount)
    setEditPurchased(myPurchased)
    setEditName(myName)
    setEditDescription(myDescription)
    setShowEdit(true)
    setShowBase(false)
    
  };

  function openDeleteDialog(bShow, id)
  {
    setOpenDialog(true)
    setDeleteId(id)
    
  }
  
    function getShoppingList()
    {
        fetch('http://localhost:3001/shoppinglist')
        .then(response => {
        
        return response.text();
        })
        .then(data => {
        console.log(data.length);
        setShoppingList(data);
        });

    }
  
    function deleteShoppingListItem(id) {

        console.log("calling delete:" + id)
        fetch(`http://localhost:3001/shoppinglist/${id}`, {
        method: 'DELETE',
        })
        .then(response => {
            console.log("new count: " + shoppingListArray.length)
            if (shoppingListArray.length <= 1)
            {
                console.log("we now have no more items")
                window.location.href="base"
            }
            return response.text();

        })
        .then(data => {
            
            getShoppingList();

         
        });
        
    }

    function fnOpenAdd()
    {
	  window.location.href='add'
	  /*setShowBase(false)
	  setShowAdd(true)
	  setShowEdit(false) */

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

  }

  function fnShowEmptyList()
  {
    
        return(
          
          <div>
         {showProgress? 
          <Box sx={{ display: 'flex', marginTop:'50px', marginLeft:'50%'}}>
           <CircularProgress />
           </Box>
        : ''}
	  
            { showEmpty ?
          <Box className="containerCenterEmpty" sx={{height:300, width:500, backgroundColor:'white'}}>
            <div className="containerHeaderCenter">Your Shopping list is empty :( <p></p>
              <Button color="primary" sx={{borderRadius:1, width:100, height:30, backgroundColor:'blue', fontStyle:'normal', padding:"8px 8px", color:"white", fontSize:"7px"}} onClick={fnHandleFirstAdd()}>Add Your First Item</Button>
              </div>        
          </Box>
          : ''}
          </div>        
        );    
    }

        
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };
    const handleProcessDelete = () => {
        setOpenDialog(false);
        deleteShoppingListItem(deleteId)
        
    };

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
    
        if (currentIndex === -1) {
          newChecked.push(value);
        } else {
          newChecked.splice(currentIndex, 1);
        }
    
        setChecked(newChecked);
      };

    const shoppingListArray = JSON.parse(shoppinglist);

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
        {showEdit?
            <EditWithParm editid={editId} editname={editName} editcount={editCount} editpurchased={editPurchased} editdescription={editDescription} />
            :''}
            {showBase?
            <div className="App">
                
        <Box sx={{ border:'1' , marginTop:'100px', marginLeft:'auto',marginRight:'auto', width: '80%',  bgcolor: 'background.paper' }}> {/*background.paper*/}
            {(shoppingListArray.length > 0)? fnShowHeaderRow() : fnShowEmptyList()}

            <List component="nav" aria-label="main mailbox folders" sx={{ width: '80%', minWidth: '100%' }}>
                {/* products? products : 'no products' */} 
                {/*console.log(Object.keys(products))*/}
                {shoppingListArray? shoppingListArray.map((shoppinglistItem)=>{            
                    
                    const labelId = `checkbox-list-label-${shoppinglistItem}`;
                    return(
                        <ListItem key={shoppinglistItem}
                        secondaryAction={
                            <div>
                            <IconButton edge="end" aria-label="edit" onClick={(e)=>{openEditDialog(true, shoppinglistItem.shoppinglistid, shoppinglistItem.name, shoppinglistItem.itemcount, shoppinglistItem.purchased, shoppinglistItem.description)}}>
                            <EditIcon > </EditIcon>
                            </IconButton>&nbsp;
                            <IconButton edge="end" aria-label="delete" onClick={(e)=>{ openDeleteDialog(true, shoppinglistItem.shoppinglistid)}}>
                            <DeleteIcon > </DeleteIcon>
                            </IconButton>
                        
                            </div>
                            }> 
                            <ListItemButton role={undefined} onClick={handleToggle(shoppinglistItem)} sx={{ width: '80%', maxWidth: 50 }}>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={checked.indexOf({shoppinglistItem}) !== -1} 
                                /* onChange={e=>{
                                        if (e.target.checked){
                                            setChecked(true)
                                        }
                                        else 
                                        {
                                            setChecked(false)
                                        }
                                        console.log("changing checked to :" + e.target.checked)
                                    }}*/
                                
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItemIcon> 
                            </ListItemButton>
                            <ListItemButton
                                selected={selectedIndex === 0}
                                onClick={(event) => handleListItemClick(event, 0)}
                            >
                            <ListItemText primary={shoppinglistItem.name}  style={{ textDecoration : shoppinglistItem.purchased ? 'line-through' : 'none' }} 
                            secondary={
                                <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                    style={{ textDecoration : shoppinglistItem.purchased ? 'line-through' : 'none' }} 
                                >
                                    
                                {shoppinglistItem.description}
                                </Typography>

                                </React.Fragment>
                            }
                            
                            />
                            </ListItemButton>   
                    
                        </ListItem>                 
                    )        
                }) 
                    : fnShowEmptyList()} 
            </List>       
        </Box>
            </div>
            : ''}
            
        </div>
    );
}

export default ShoppingList;
