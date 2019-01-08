# bamazon
There are two parts to this application, bamazonCustomer.js and bamazonManager.js

### bamazonCustomer.js

When this file runs, it displays a lost of the items for sale, including their unique id's and their price. 

The user is then asked to enter the id of the item they wish to buy, and then the amount they wish to buy. If the amount requested is greater then the current stock, a message will be displayed informing the user that their is not enough of the item in stock. If there is enough of the item in stock, the program calculates the total price for the purchase and displays it for the user. It then reduces the stock by the amount purchased.

### bamazonManager.js

This file does four different things, depending on what the user chooses. The user is prompted to select one of four options: 

* View products for sale
* View low inventory
* Add to inventory
* Add new product

The first choice displays a list of the products, including their id's, price, and quantity.

The second choice displays a list of items who's quantity is less than 5.

The third option lets the user add an amount they choose to an item they choose.

The fourth option lets the user add a new product to the list of products.

### Video

![bamazon Video](/bamazon_video.gif)

