const Express = require('express');
const router = require("express").Router();
const App = Express();


module.exports = (db) => {


  // GET user gear list: BABAK DONT REMOVE
  App.get('/calendar/userGearList/:trip_id', (req, res) => {
    const trip_id = req.params.trip_id;

    db.query(
      `
    SELECT
      *
    FROM
    user_checklist
    JOIN gear_checklist on user_checklist.type_id = gear_checklist.id
    WHERE trip_id = $1;
  `, [trip_id]
    ).then((dbResponse) => {
      console.log("newRes:::", dbResponse.rows);
      res.json(dbResponse.rows)

    });
  });

  return App;
};
