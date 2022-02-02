import './App.css';
import React, {useState, useEffect} from 'react';

// UI 
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
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
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
    

    const countItems = [
      { "1": [1] },
      { "2": [2] },
      { "3": [3] }
    ];

    useEffect(()=>
    {
            getShoppingList();
    }, []);


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
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({"name": name, "description" : description, "itemcount": pCount}),
    })
      .then(response => {
        if (response.ok)
        {   
            console.log("ok response")  
        }
      })
      .then(data => {
        console.log("done");    
      });
  }

  
  const handleSubmit = (e) =>
  {
      console.log("submitting")

      console.log(shoppingName)
      
      console.log(shoppingDescription)
      console.log(productCount)
      //setShowProgress(true)

      createShoppingItem(shoppingName, shoppingDescription, productCount)      
      
      // setShowBase2(true)    
      setShowAdd(false)      
      e.preventDefault()
      const myTimeout = setTimeout(()=>{var iWait = 0}, 5000);
      window.location.href = "/shoppinglist"
      
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

  function fnSlideOut(){
    console.log("slide out this card to the right")
    window.location.href='shoppinglist'
 //   setShowBase2(true)
 //   setShowAdd(false)
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
                { countItems?
                <Select
                    labelId="selHowMany"
                    id="selHowMany"
                    value={productCount}
                    label="How many?"
                    onChange={handleSelectChange}
                >
                  {countItems.map(element=>(
                    <MenuItem key={Object.keys(element)[0]} value={element[Object.keys(element)] + ""}>{Object.keys(element)[0]}</MenuItem>
                    ))}                    
                </Select>
                :
                ''}
                </FormControl>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <h4 className="card-header titleRight">
                <small className="justify-content-end"><Button onClick={(e)=>{fnSlideOut()}} sx={{borderRadius:1, width:60, height:30, backgroundColor:'lightgrey', fontStyle:'normal', padding:"8px 8px", color:"white", fontSize:"7px"}} >Cancel</Button>&nbsp;&nbsp;&nbsp;&nbsp;
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
