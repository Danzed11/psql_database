const settings = require("./settings"); // settings.json
const pg = require("pg");

var knex = require('knex')({
  client: 'pg',
  connection: {
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
  
  }
});

const query = function(new_person){ 
  knex('famous_people').insert(new_person)
  .finally(function() { knex.destroy(); });
}

const newPerson =
  {
    first_name : process.argv[2],
    last_name : process.argv[3],
    birthdate : process.argv[4]
  }


console.log(query(newPerson));
