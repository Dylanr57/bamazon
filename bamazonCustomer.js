const mysql = require("mysql");
const inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazonDB"
});

connection.connect(function(err){
    if(err) throw err;
    console.log("Connected");
    showStock();
    inquirer.prompt([
        {
        name: "choice",
        type: "input",
        message: "What would you like to buy? Enter the items id.",
        },
        {
        name: "amount",
        type: "input",
        message: "How many would you like to buy?"
        }
    ]).then(function(answer){

        connection.query("SELECT * FROM products WHERE item_id = ?", answer.choice, function(err,res){
            var order = parseInt(answer.amount);
         
            if (order > res[0].stock_quantity){
                console.log("Insufficient quantity!")
                connection.end();
            }
            else{
                var totalCost = order * res[0].price;
                console.log("The Cost of your order is $" + totalCost);

                var newStock = res[0].stock_quantity - order;
                connection.query("UPDATE products SET stock_quantity = ? WHERE item_id = ?", [newStock, answer.choice], function(err){
                    if (err) throw err;
                    console.log("Stock updated");
                });

                connection.end();
            }
        })

    })
})

function showStock(){
    connection.query("SELECT * FROM products", function(err, res){
        console.log(res);
    })
}

