// postgres database pool connection
const { json } = require('express/lib/response');
const { Pool } = require('pg');
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '0000',
    port: 5432,
});

//function to generate random report id
function generateReportId() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    
    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    
    return text;
}


// insert data into the database
const insertData = (req, res) => {
    var timestamp = new Date().toISOString();
    var reportid = generateReportId();
    var { userID,marketID,marketName,cmdtyID,marketType,cmdtyName,priceUnit,convFctr,price} = req.body;
    price=price/convFctr;
    priceUnit="kg"
    console.log(price);
    //check if cmdtyID and marketID are unique
    pool.query('SELECT * FROM report WHERE cmdtyId = $1 AND marketId = $2', [cmdtyID,marketID], (error, results) => {
        if (error) {
            throw error
        }
        if (results.rowCount > 0) {
            //find the report id for the report that already exists
            pool.query('SELECT id FROM report WHERE cmdtyId = $1 AND marketId = $2', [cmdtyID,marketID], (error, results) => {        
                if (error) {
                    throw error
                }
                //save the report id to a variable
                reportid = results.rows[0].id;
                //insert the new data into the report table
                pool.query('INSERT INTO report(userId,marketId,marketName,cmdtyId,marketType,cmdtyName,priceUnit,convFctr,price,ti,id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)', [userID,marketID,marketName,cmdtyID,marketType,cmdtyName,priceUnit,convFctr,price,timestamp,reportid], (error, results) => {

                    if (error) {
                        throw error
                    }
                    res.status(200).json({
                        status: 'success',
                        reportid: reportid
                    }
                    )
                })

            })
        }


            else {
            pool.query('INSERT INTO report(userID,marketId,marketName,cmdtyId,marketType,cmdtyName,priceUnit,convFctr,price,ti,id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)', [userID,marketID,marketName,cmdtyID,marketType,cmdtyName,priceUnit,convFctr,price,timestamp,reportid], (error, results) => {
                if (error) {
                    throw error
                }
                res.status(200).json({
                    status: 'success',
                    reportid: reportid
                }
                )
        
            })
        }

    })
}


// get all data from the database where id=reportid
const getData = (req, res) => {
    const { reportID } = req.query;
   // display all userid and reportid where id=reportid
    pool.query('SELECT avg(price)::numeric(10,2)  AS price FROM report  WHERE id = $1 GROUP BY id  ORDER BY id DESC', [reportID], (error, results) => {
        if (error) {
            throw error
        }
        //save the results to a variable
        var result1 = results.rows;
    
   //another query to get the market name and cmdty name where id=reportid
   
        pool.query('SELECT id,marketName,cmdtyName,cmdtyID,marketID,priceUnit FROM report WHERE id = $1', [reportID], (error, results) => {
                
            if (error) {
                throw error
            }
            //save the results to a variable
            var result2 = results.rows[0];

// another query to get the =userid where id=reportid
            pool.query('SELECT userID FROM report WHERE id = $1', [reportID], (error, results) => {
                if (error) {
                    throw error
                }
                //save the results to a variable
                var result3 = results.rows;
              // join the results from the three queries
                var result = [result1, result3, result2];
// send the results to the client
                res.status(200).json({
                    status: 'success',
                    data: result
                }
                )
            }
            )
        }
        )
    }
    )
}












//export the function
module.exports = {
    insertData,
    getData

}   //end of module.exports


