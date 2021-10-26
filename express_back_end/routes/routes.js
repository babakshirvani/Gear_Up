const { response } = require("express");
const express = require("express");
const router = express.Router();

const routes = (db) => {
  //GET landingpage
  // router.get("/", (req, res) => {
  // });

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

 router.get("/activity/:activityname", (req, res) => {
  if(req.params.activityname === "Backpacking") {
    db.query('select * from backpacking_checklist;')
      .then((response) => {
        const backpacking = [];
        for(let activity of response.rows) {
          if(!backpacking.includes(activity.category))
          {
            backpacking.push(activity.category)
          }    
        }
        const backpacking_checklist = []
      
        for(let activity1 of backpacking) {
          const checklist = {}
          checklist["name"] = activity1;
          checklist["children"] = [];
          for(let activity2 of response.rows) {
            if(activity1 === activity2.category) {
              checklist["children"].push({"id": activity2.id, "name": activity2.type});
            }
          }
          backpacking_checklist.push(checklist);
        }
        res.send(backpacking_checklist);
      })
      .catch((err) => console.log(err));
  }

  if(req.params.activityname === "Day Hiking") {
    
    db.query('select * from day_hiking_checklist;')
      .then((response) => {

        const dayhiking = [];
        for(let activity of response.rows) {
          if(!dayhiking.includes(activity.category))
          {
            dayhiking.push(activity.category)
          }    
        }
        const dayhiking_checklist = []
      
        for(let activity1 of dayhiking) {
          const checklist = {}
          checklist["name"] = activity1;
          checklist["children"] = [];
          for(let activity2 of response.rows) {
            if(activity1 === activity2.category) {
              checklist["children"].push({"id": activity2.id, "name": activity2.type});
            }
          }
          dayhiking_checklist.push(checklist);
        }
        res.send(dayhiking_checklist);
        
      })
      .catch((err) => console.log(err));
  }
  if(req.params.activityname === "Car Camping") {
    
    db.query('select * from car_camping_checklist;')
      .then((response) => {
        const carcamping = [];
        for(let activity of response.rows) {
          if(!carcamping.includes(activity.category))
          {
            carcamping.push(activity.category)
          }    
        }
        const carcamping_checklist = []
      
        for(let activity1 of carcamping) {
          const checklist = {}
          checklist["name"] = activity1;
          checklist["children"] = [];
          for(let activity2 of response.rows) {
            if(activity1 === activity2.category) {
              checklist["children"].push({"id": activity2.id, "name": activity2.type});
            }
          }
          carcamping_checklist.push(checklist);
        }
        res.send(carcamping_checklist);
        
      })
      .catch((err) => console.log(err));
  }
  
  })
  return router;
}

module.exports = routes;