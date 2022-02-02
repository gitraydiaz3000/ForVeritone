import './App.css';
import React, {useState, useEffect} from 'react';

// UI 
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
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
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import LastPageIcon from '@mui/icons-material/LastPage';

// Screens
import App from './App';
//import { createShoppingItem } from '../../server/shoppinglist_model';
var iCallOnce = 0;


const EditWithParm = ({editid, editname, editcount, editpurchased, editdescription}) => {
  
    const [showBase, setShowBase] = useState(false);
    const [showEdit, setShowEdit] = useState(true);
    const [editChecked, setEditChecked] = useState(editpurchased? editpurchased: false);
    const [editCount, setEditCount] = useState(editcount? editcount : 0);
    const [shoppinglist, setShoppingList] = useState(false);
    const [shoppingName, setShoppingName] = useState(editname? editname: '');
    const [shoppingDescription, setShoppingDescription] = useState(editdescription? editdescription: '');
    const [productCount, setProductCount] = useState(0);    
    const [purchased, setPurchased] = useState(editpurchased? editpurchased: '');
    const [checked, setChecked] = React.useState([0]);

      // main engine
  if (iCallOnce == 0)
  {
    // editpurchased? setEditChecked(editpurchased) : setEditChecked(editChecked)

    iCallOnce = 1
  }

    useEffect(()=>
    {
            getShoppingList();
    }, []);

 
    function handleSelectChange(event) {
        console.log("handleSelectChange:")  
        console.log(event.target.value)
        setEditCount(event.target.value)
       
        setProductCount(event.target.value)
        editcount = event.target.value
    };

    function handleChecked(event) {
        console.log("handleChecked:")  
        console.log(event.target.value)
        
        setEditChecked(event.target.value)

        console.log("checked is now:" + editpurchased)
        
    };


    function fnEditShoppingItem(id, name, description, pCount, purchased) {
 
        console.log("now editing shopping item:")
        console.log(id)
        console.log(name)
        console.log(description)
        console.log(pCount)
        console.log(purchased)
        fetch('http://localhost:3001/shoppinglist/' + id, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({"name": name, "description" : description, "itemcount": pCount, "purchased": purchased})
        })
        .then(
                response => {       
                    if (response.ok)
                    {   
                        console.log("ok response")  
                    }
                }
        )
        .then(
            ()=>{
            console.log("done");            
            }
        );
    }
 

    const handleSubmit = (e) =>
    {
        console.log("submitting")

        console.log(editid)
        console.log(shoppingName)
        console.log(shoppingDescription)
        console.log(productCount)
        console.log(editChecked)
        fnEditShoppingItem(editid, shoppingName, shoppingDescription,productCount, editChecked) 
        e.preventDefault()
        window.location.href="shoppinglist"
        
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
        console.log("slide out this card")
        window.location.href='shoppinglist'
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
         EditId:{editid}
         { showBase? <App /> :  ''}
         { showEdit? 
        <div className="containerCenterAdd">
        {/* shoppingListArray? JSON.stringify(shoppingListArray) : 'no shoppinglist' */ }

      <form onSubmit={e=>{this.handleSubmit(e)}}>
      <Box sx={{   marginTop:'50',margin:'auto', width: '50%', height:'400px', bgcolor: 'lightgrey', paddingBottom:'10px' }}> {/*background.paper*/}
      <Card sx={{   display:'flex',flexDirection:'column',marginTop:'50',margin:'auto', padding:'0px' }}>
            <CardHeader 
                title="Shopping List"
                style={myTheme.cardHeaderStylePref}
                subtitlesolor={myTheme.color}
                titlesolor={myTheme.color}
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
                <Typography gutterBottom variant="h5" component="div">Edit an Item </Typography>
                <Typography variant="body2" color="text.secondary">
                Edit your new item below
                </Typography><p></p>
                <FormControl fullWidth>

                <TextField id="txtItemName" label="Item Name" variant="outlined" value={shoppingName} onChange={e=> setShoppingName(e.target.value)} /><p></p>            
                
                <TextField id="txtDescription" label="Description" multiline rows="3" variant="outlined" value={shoppingDescription}  onChange={e=> setShoppingDescription(e.target.value)}  /><p></p>
                </FormControl>
                
           
	            <FormControl fullWidth>
                    <InputLabel id="txtProductCount" value={productCount}></InputLabel>
                    <Select
                        labelId="selHowMany"
                        id="selHowMany"

                        value={editCount}
                        defaultValue={1}
                        onChange={handleSelectChange}
                    >
                        <MenuItem key={1} value={1}>1</MenuItem>
                        <MenuItem key={2} value={2}>2</MenuItem>
                        <MenuItem key={3} value={3}>3</MenuItem>
                    </Select>
                </FormControl><p></p>
                &nbsp;&nbsp;&nbsp;<FormControlLabel label="Purchased"
                control={

                    <Checkbox
                        edge="start"                        
                        checked={editChecked}                                                    
                        onChange={e=>{
                            if (e.target.checked){
                                setEditChecked(true)
                            }
                            else 
                            {
                                setEditChecked(false)
                            }
                            console.log("changing checked to :" + e.target.checked)
                        }}
                        tabIndex={-1}
                        disableRipple    
                    />
                }
                />
                <p>&nbsp;</p>
                <p>&nbsp;</p>                
                <h4 className="card-header titleRight">
                    <small className="justify-content-end"><Button onClick={(e)=>{fnSlideOut()}} sx={{borderRadius:1, width:60, height:30, backgroundColor:'lightgrey', fontStyle:'normal', padding:"8px 8px", color:"white", fontSize:"7px"}} >Cancel</Button>&nbsp;&nbsp;
                    <Button color="primary" sx={{borderRadius:1, width:60, height:30, backgroundColor:'blue', fontStyle:'normal', padding:"8px 8px", color:"white", fontSize:"7px"}} onClick={handleSubmit}>Save Item</Button>
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

export default EditWithParm;
