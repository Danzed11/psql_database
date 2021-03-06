const settings = require("./settings"); // settings.json

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
firstname = process.argv[2];
knex.select().from('famous_people').where('first_name', firstname).asCallback(function(err, result) {
  if (err) {
    return console.log("Connection Error", err);
  }
  console.log(result);
})

