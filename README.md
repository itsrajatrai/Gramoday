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
price numeric not null,
id varchar(50) not null,
ti timestamp not null
);
</pre>

![Table Report](https://user-images.githubusercontent.com/61858752/172762538-34cb0906-4aa7-41a8-b544-4fa697dd3a98.png)
