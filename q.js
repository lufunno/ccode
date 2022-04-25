//const Pool = require("pg").Pool;
const {client} = require("./pool");

/*require('dotenv').config();
const client = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: 5432,
    database:  process.env.DB_DATABASE
});

client.connect();
//console.log("connected succesfully");*/


async function createTable(){
  const results = await  client.query(`CREATE TABLE IF NOT EXISTS Visitors(
        ID SERIAL,
        Name varchar(50),
        Age int,
        dateofvisit DATE,
        timeOfVisit TIME,
        assistedBy varchar(50),
        comments varchar(100)
    )`);
  
    return results.rows;
    //setTimeout(createTable, 3000);
  }

 createTable().then((res)=> console.log(res));;

async function  addNewVisitor(fullname, Age, dateOfVisit, timeOfVisit, assistedBy, comments){
  const results = await client.query(`INSERT INTO Visitors(Name, Age, dateOfVisit, timeOfVisit, assistedBy, comments)
    VALUES($1,$2,$3,$4,$5,$6)`,[fullname, Age, dateOfVisit, timeOfVisit, assistedBy, comments]); 
  //  console.log(results)
   return results;
}

// addNewVisitor('shawn carter', 25, '2020-09-10', '16:01', 'thembi khwanazi', 'Services');
// addNewVisitor('Lufuno mbedzi', 21, '2021-09-10', '16:01', 'johan carter', 'awesome');

async function listAllVisitors() {
  const result = await  client.query('SELECT Name, ID FROM Visitors;')
    return result.rows
}

// listAllVisitors().then((res)=> console.log(res));

async function    deleteAVisitor(fullname){
    const results = await  client.query(`DELETE FROM Visitors WHERE Name = $1;`,[fullname]);
    return results.rows;
}

// deleteAVisitor('shawn carter').then((res) => console.log(res));

function updateVisitor(id, newValue, column, ){
    client.query(`UPDATE Visitors SET ${column} = $1 WHERE ID = $2`, [newValue, id], (err, res) => {
        if(err){
            throw err;
        }
      //  console.log('data updated successfully', res.rowCount);
      return ('data updated successfully', res.rowCount)
    });
}

// updateVisitor(1, '12:32', 'timeOfVisit');

async function    viewVisitor(id){
 const results = await client.query(`SELECT * FROM Visitors WHERE ID = $1`, [id]);
 return results.rows
}
// viewVisitor(3).then((res) => console.log(res));
 

async function  deleteAllVisitors(){
   const result = await client.query(`DELETE FROM Visitors`);
   return result.rows     
}

// deleteAllVisitors().then((res) => console.log(res));

async function lastVisitor(){
 const result = await  client.query(`SELECT * FROM Visitors;`)
    return result.rows[result.rows.length -1].id
}

//lastVisitor().then((res) => console.log(res))

module.exports = { addNewVisitor, updateVisitor, deleteAVisitor, deleteAllVisitors, viewVisitor, listAllVisitors, lastVisitor };