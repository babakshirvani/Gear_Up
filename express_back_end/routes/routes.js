const express = require("express");
const router = express.Router();

const routes = (db) => {
  //GET landingpage
  router.get("/", (req, res) => {
  });

  //GET dashboard
  router.get("/dashboard", (req, res) => {
    //select trips
    //select friends
    //weather
  });

  //GET calendar
  router.get("/calendar", (req, res) => {
    // select trips
  });

  //GET new trip
  router.get("/new", (req, res) => {
  });

  //POST save new trip
  router.post("/new", (req, res) => {
     //return primarykey
  });

  //POST save user gear     
  router.post("/usergear", (req, res) => {
    //return primarykey
 });


  return router;
}

module.exports = routes;