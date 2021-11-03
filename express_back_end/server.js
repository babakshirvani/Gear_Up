const Client = require('pg').Client;
const { development } = require('./knexfile');
const db = new Client(development['connection']);
db.connect();

const fs = require("fs");
const path = require("path");
const helmet = require("helmet");
const cors = require("cors");

const Express = require('express');
const App = Express();
const BodyParser = require('body-parser');
const PORT = 8080;
const morgan = require('morgan');

App.use(morgan('dev'));

// Express Configuration
App.use(cors());
App.use(helmet());
App.use(BodyParser.urlencoded({ extended: false }));
App.use(BodyParser.json());
App.use(Express.static('public'));

const routespath = require("./routes/routes");
const routesCalendar = require("./routes/gearRoute");
App.use("/", routesCalendar(db));
App.use("/api", routespath(db));


function read(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(
      file,
      {
        encoding: "utf-8"
      },
      (error, data) => {
        if (error) return reject(error);
        resolve(data);
      }
    );
  });
}

Promise.all([
  read(path.resolve(__dirname, `db/migrations.sql`)),
  read(path.resolve(__dirname, `db/seeds.sql`))
])
  .then(([create, seed]) => {
    App.get("/api/debug/reset", (request, response) => {
      db.query(create)
        .then(() => db.query(seed))
        .then(() => {
          console.log("Database Reset");
          response.status(200).send("Database Reset");
        });
    });
  })
  .catch(error => {
    console.log(`Error setting up the reset route: ${error}`);
  });


App.close = function() {
  return db.end();
};



// Sample GET route
App.get('/api/data', (req, res) => res.json({
  message: "Seems to work!",
}));

App.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Express seems to be listening on port ${PORT} so that's pretty good 👍`);
});