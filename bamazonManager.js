const mysql = require("mysql");
const inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazonDB"
});

function showStock(res){
    for (let i = 0; i < res.length; i++){
        console.log("~~~~~~~~~~~~~~~");
        console.log("Item id: " + res[i].item_id);
        console.log(res[i].product_name);
        console.log("Price: $" + res[i].price);
        console.log("Quantity: " + res[i].stock_quantity);
    };
}

connection.connect(function(err){
    if(err) throw err;
    console.log("Connected");

    inquirer.prompt({
        name: "choice",
        type: "list",
        message: "What would you like to do?",
        choices: 
            ["View products for sale",
            "View low inventory",
            "Add to inventory",
            "Add new product"]
    }).then(function(answer){
        console.log(answer.choice);
        if (answer.choice === "View products for sale"){
            connection.query("SELECT * FROM products", function(err, res){
                if(err) throw err;
                showStock(res);
                connection.end();
            })
        }else if (answer.choice === "View low inventory"){
            connection.query("SELECT * FROM products WHERE stock_quantity < 5", function(err,res){
                if(err) throw err;
                showStock(res);
                connection.end();
            });

        }else if(answer.choice === "Add to inventory"){
            inquirer.prompt([
                {
                    name: "choice",
                    type: "input",
                    message: "Enter id of item you would like to add inventory to."
                },
                {
                    name: "amount",
                    type: "input",
                    message: "Enter amount to add"
                }

            ]).then(function(answer){
                var addAmount = parseInt(answer.amount);
                connection.query("SELECT * FROM products WHERE item_id = ?", answer.choice, function(err,res){
                    var newStock = addAmount + res[0].stock_quantity;
                    connection.query("UPDATE products SET stock_quantity = ? WHERE item_id = ?", [newStock, answer.choice], function(err){
                        if (err) throw err;
                        console.log("Stock updated");
                        connection.end();
                    })
                })
            })

        }else{
            inquirer.prompt([
                {
                    name: "name",
                    type: "input",
                    message: "Enter name of product"
                },
                {
                    name: "department",
                    type: "input",
                    message: "Enter department of product"
                },
                {
                    name: "price",
                    type: "input",
                    message: "Enter price of product"
                },
                {
                    name: "stock",
                    type: "input",
                    message: "Enter stock of product"
                },
            ]).then(function(answer){
                priceInt = parseInt(answer.price);
                stockInt = parseInt(answer.stock);
                connection.query("INSERT INTO products SET product_name = ?, department_name = ?, price = ?, stock_quantity = ?", [answer.name, answer.department, priceInt, stockInt], function(err){
                    if (err) throw err;
                    console.log("New product added");
                    connection.end();
                })
            })
        }
        
    })
})