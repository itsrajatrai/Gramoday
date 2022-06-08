# Gramoday

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
price int not null
);
</pre>
