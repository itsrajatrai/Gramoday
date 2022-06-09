# Gramoday

### Content
- Problem Statement
- Dependencies
- Instructions to run the application
- Database
- Ideal Request and Response


## Problem Statement
To build an express JS API web-service which captures user contributed
reports and returns an aggregate report in response.

### The algorithm to generate the aggregate report is as below:
<pre>
1. Look for an existing report with marketID-cmdtyID in the DB [1].
2. Convert the prices into base price based on the base unit [2]
3. Calculate the mean of prices.
4. Save the aggregated report with price per Kg.
5. Return the reportID of the generated report.
</pre>

## Dependencies
The following dependencies has been used :
<pre> 
"dependencies": {
    "body-parser": "^1.20.0",
    "express": "^4.18.1",
    "pg": "^8.7.3"
  }
</pre>

These can be installed using <b> npm </b> or <b>yarn</b>.

## Instructions to run the appliaction
- Install Node.js
- Clone the repository to somewhere on your hard drive
- Open a command prompt and go to that directory
- Type npm install to install any dependencies
- Type npm start

## Database

### Relation Schema
![Table Report](https://user-images.githubusercontent.com/61858752/172762538-34cb0906-4aa7-41a8-b544-4fa697dd3a98.png)

### SQL to create the table

<pre>
Create table report(
userID varchar(50) Primary key Not null,
marketId varchar(50) not null,
marketName varchar(90) not null,
cmdtyID varchar(50) not null,
marketType varchar(50) not null,
cmdtyName varchar(50) not null,
priceUnit varchar(50) not null,
convFctr int not null,
price numeric not null,
id varchar(50) not null,
ti timestamp not null
);
</pre>

## Ideal Request and Response

### Platform used for Testing : Postman

### /reports POST
- Url: http://localhost:8000/reports
- Request : <pre> {
    "userID": "user-9",
    "marketID": "market-2",
    "marketName": "Vashi Navi Mumbai",
    "cmdtyID": "cmdty-3",
    "marketType": "Mandi",
    "cmdtyName": "Peas",
    "priceUnit": "Bag",
      "convFctr": 50,
      "price": 852


  }
  </pre>
- Response : <pre>
{
    "status": "success",
    "reportid": "r8n3l"
}
</pre>
