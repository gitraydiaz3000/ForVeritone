import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';


// UI 
import { styles } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CircularProgress from '@mui/material/CircularProgress';
import LastPageIcon from '@mui/icons-material/LastPage';


// Screens
import App from './App';
//import { createShoppingItem } from '../../server/shoppinglist_model';

function Add() {
  
    const [showBase, setShowBase] = useState(false);
    const [showBase2, setShowBase2] = useState(false);
    const [showAdd, setShowAdd] = useState(true);
    const [showProgress, setShowProgress] = useState(false);

    const [shoppinglist, setShoppingList] = useState(false);
    const [shoppingName, setShoppingName] = useState('');
    const [shoppingDescription, setShoppingDescription] = useState('');  

    const [productCount, setProductCount] = useState(0);
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const [checked, setChecked] = useState(false);   
    
    useEffect(()=>
    {
            getShoppingList();
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


  function handleSelectChange(event) {
    console.log("handleSelectChange:")  
    console.log(event.target.value)
    
    setSelectedIndex(event.target.value)
    setProductCount(event.target.value)
  };

  function createShoppingItem(name, description, pCount) {
    console.log("now creating Shopping Item:")

    console.log(name)
    console.log(description)
    console.log(pCount)    
    fetch('http://localhost:3001/shoppinglist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name, description, pCount}),
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getShoppingList();
      });
  }

  
  const handleSubmit = (e) =>
  {
      console.log("submitting")

      console.log(shoppingName)
      console.log(shoppingDescription)
      console.log(productCount)
      setShowProgress(true)
      createShoppingItem(shoppingName, shoppingDescription, productCount)      
      
    // setShowBase2(true)    
      setShowAdd(false)      
      e.preventDefault()
      const myTimeout = setTimeout(()=>{var iWait = 0}, 5000);
      window.location.href = "/shoppinglist"
      
  }
  
  function createProduct(name, description, pCount) {
    console.log("now creating product:")

    console.log(name)
    console.log(description)
    console.log(pCount)    
    fetch('http://localhost:3001/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name, description, pCount}),
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getShoppingList();
      });
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
            return response.text();
        })
        .then(data => {
            alert(data);
            getShoppingList();
        });
        
    }



  function fnSlideOut(){
    console.log("slide out this card to the right")
    window.location.href='shoppinglist'
 //   setShowBase2(true)
 //   setShowAdd(false)
  }

 function editShoppingItem(id) {

        console.log("calling edit:" + id)
        /*  fetch(`http://localhost:3001/shoppinglist/${id}`, {
            method: 'PUT',
        })
            .then(response => {
            return response.text();
            })
            .then(data => {
            alert(data);
            getShoppingList();
            }); */  
    }
    
  const shoppingListArray = JSON.parse(shoppinglist);

  const myTheme = {
    cardHeaderStylePref:{
       background: 'lightgrey',
       color: 'black',       
       height: 30,
       padding: 10
     }
 }

  return (
     <div>
         test
         {showProgress? 
          <Box sx={{ display: 'flex', marginTop:'50px', marginLeft:'50%'}}>
           <CircularProgress />
           </Box>
        : ''}
         { showBase? <App /> :  ''}
         { showAdd? 
        <div className="containerCenterAdd">        
        
        {/* shoppingListArray? JSON.stringify(shoppingListArray) : 'no shoppinglist'  */}

        <form onSubmit={e=>{this.handleSubmit(e)}}>
        <Box sx={{   marginTop:'50',margin:'auto', width: '50%', height:'400px', bgcolor: 'lightgrey', paddingBottom:'10px' }}> {/*background.paper*/}
            <Card sx={{   display:'flex',flexDirection:'column',marginTop:'50',margin:'auto', padding:'0px' }} >
                <CardHeader 
                    title="Shopping List"
                    style={myTheme.cardHeaderStylePref}
                    subtitlecolor={myTheme.color}
                    titlecolor={myTheme.color}
                    titlestyle={{textAlign: 'center'}}
                    action={
            	<div>
                    <IconButton edge="end" aria-label="lastPage" onClick={(e)=>{fnSlideOut()}}>
                    <LastPageIcon></LastPageIcon>&nbsp;
                    </IconButton>
                </div>
            }
            >  
                </CardHeader>
                <CardContent>
                <Typography gutterBottom variant="h5" component="div">Add an Item </Typography>
                <Typography variant="body2" color="text.secondary">
                Add your new item below
                </Typography><p></p>
                <FormControl fullWidth>
                <TextField id="txtItemName" label="Item Name" variant="outlined" value={shoppingName} onChange={e=> setShoppingName(e.target.value)} /><p></p>
                
                <TextField id="txtDescription" label="Description" multiline rows="3" variant="outlined" value={shoppingDescription}  onChange={e=> setShoppingDescription(e.target.value)}  /><p></p>
                </FormControl>
                <FormControl fullWidth>
                <InputLabel id="txtProductCount" value={productCount}>How many?</InputLabel>
                <Select
                    labelId="selHowMany"
                    id="selHowMany"
   		    defaultValue=''
                    value={productCount}
                    label="How many?"
                    onChange={handleSelectChange}
                >
                    <MenuItem key={1} value={1}>1</MenuItem>
                    <MenuItem key={2} value={2}>2</MenuItem>
                    <MenuItem key={3} value={3}>3</MenuItem>
                </Select>
                </FormControl>
                <h4 className="card-header">
                <small className="justify-content-end"><Button sx={{borderRadius:1, width:60, height:30, backgroundColor:'lightgrey', fontStyle:'normal', padding:"8px 8px", color:"white", fontSize:"7px"}} >Cancel</Button>&nbsp;&nbsp;
                <Button color="primary" sx={{borderRadius:1, width:60, height:30, backgroundColor:'blue', fontStyle:'normal', padding:"8px 8px", color:"white", fontSize:"7px"}} onClick={handleSubmit}>Add Task</Button>
                </small>
                </h4>
            </CardContent>
        </Card>
        </Box>
        </form> 
        </div>
        : '' }
    </div> 
  );
}

export default Add;
