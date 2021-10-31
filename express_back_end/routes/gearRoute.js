const Express = require('express');
const morgan = require('morgan');
const router = require("express").Router();
const App = Express();
App.use(morgan('dev'));


module.exports = (db) => {


  // Sample GET route
  // App.get('/api/data', (req, res) => res.json({
  //   message: "Seems to work!",
  // }));

  // router.get('/api/activities', (req, res) => {
  //   db.query(
  //     `
  //     SELECT
  //       *
  //     FROM
  //     gear_checklist;
  //   `
  //   ).then((newRes) => {
  //     console.log("newRes:::", newRes);
  //   });
  // });

  return App;
};
