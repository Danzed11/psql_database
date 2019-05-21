
const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

const query = function(name){
  client.connect((err) => {
    if (err) {
      return console.error("Connection Error", err);
    }
    client.query("SELECT * FROM famous_people WHERE first_name = $1::text OR last_name = $1::text", [name], (err, result) => {
      if (err) {
        return console.error("error running query", err);
      }
console.log(`Found ${result.rows.length} person(s) by the name '${name}'`);
    for (let entry in result.rows) {
      let index = Number(entry) + 1;
      console.log (`- ${index}: ${result.rows[entry].first_name} ${result.rows[entry].last_name}, born ${result.rows[entry].birthdate}`);
    } 
      client.end();
    });
  });
}

const name = process.argv[2];

query(name);

// client.connect((err) => {
//   if (err) {
//     return console.error("Connection Error", err);
//   }
// const queryType = process.argv.slice(2)[0];
// const first_name = process.argv.slice(2)[1];
// let id = process.argv.slice(2)[1];
//   if (queryType === "read" || queryType ==='delete' || queryType === "update'") {
//   client.query("SELECT * FROM famous_people WHERE first_name = $1", [queryType], (err, res) => {
//     if (err) {
//       return console.error("error running query", err);
//     }
//     console.log(res.rows);
//     client.end();
//     });
//   }
// });

// function read(input, cb) {
//   client.query(`SELECT * FROM famous_people WHERE", ${input} =$1 ${input}`, cb)
// }