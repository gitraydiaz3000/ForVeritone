# Veritone Shopping List

## Dependencies
Used PostGreSQL for database.
pgAdmin will need to be running in the background.
Database was named "veritoneShoppingList" with one table for: shoppinglist
The create scripts are included.

## Routes
I created routes at /base, /add, /edit, and /shoppinglist
We start the app at / which is the base "Add your first item" window.
After creating several items and deleting all of them, the app will go back to this first screen since there won't be any more items again.

### Deployment

Run the app with VSCode using terminal 1 for Express's npm start against port 3001.
And then cd into \veritone-shoppinglist and run terminal 2 for React app's npm start.


#### View it
- visit http://localhost:8081 in your browser 
