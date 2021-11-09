let mysql = require('mysql');

let con = mysql.createConnection({
  host: "localhost",
  user: "yourusername",
  password: "yourpassword",
  //database: "mydb" //uncomment to use the database as default and no need to declare below
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE DATABASE mydb", function (err, result) {
    if (err) throw err;
    console.log("Database created");
    con.query("USE mydb",function (err, result) {
        console.log("Using database");
        var sql = "CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))";
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log("Table created");
          sql = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";
          con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
          });
            sql = "INSERT INTO customers (name, address) VALUES ?";
            var values = [
                ['John', 'Highway 71'],
                ['Peter', 'Lowstreet 4'],
                ['Amy', 'Apple st 652'],
                ['Hannah', 'Mountain 21'],
                ['Michael', 'Valley 345'],
                ['Sandy', 'Ocean blvd 2'],
                ['Betty', 'Green Grass 1'],
                ['Richard', 'Sky st 331'],
                ['Susan', 'One way 98'],
                ['Vicky', 'Yellow Garden 2'],
                ['Ben', 'Park Lane 38'],
                ['William', 'Central st 954'],
                ['Chuck', 'Main Road 989'],
                ['Viola', 'Sideway 1633']
            ];
            con.query(sql, [values], function (err, result) {
                if (err) throw err;
                console.log("Number of records inserted: " + result.affectedRows);
            });
            /* sample: QUERY using group by, having, union
            SELECT * FROM store_sku_monthlysales;
            #Sales in dollars

            #SUM
            SELECT Store, SUM(Units_sold*Unit_price) FROM store_sku_monthlysales
            GROUP BY Store
            HAVING Store='D';
            
            #Lost Sales
            SELECT Store_location, SKU, SUM(Demand-Units_sold) as Lost_Sale
            FROM store_sku_monthlysales
            GROUP BY SKU,Store_location
            HAVING SKU=1 AND Store_location='MA';
            #Profit in dollars
            
            #Profit
            SELECT Month, SUM(Units_sold*Unit_Price - (Demand-Units_sold)*2*Unit_Price) as Profit
            FROM store_sku_monthlysales
            GROUP BY Month
            HAVING Month='May';
            
            #Count
            SELECT Customer_Name, COUNT(*)
            FROM customers, orders 
            WHERE customers.Customer_ID = orders.Customer_ID
            group by Customer_Name
            having Customer_Name='Forde';

            */

        });
    });
  });
});