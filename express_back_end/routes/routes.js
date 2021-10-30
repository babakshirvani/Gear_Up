const { response } = require("express");
const express = require("express");
//const cookieSession = require("cookie-session");
const router = express.Router();

const routes = (db) => {
  

  router.get("/login/:username",(req, res) => {
    db.query(`select * from users where user_name='${req.params.username}'`)
    .then((response) => {
      
      res.send(response.rows);
    })
    .catch((err) => console.log(err));
  })

  router.get("/friendlist/:id",(req, res) => {
    db.query(`select users.user_name,users.avatar from friendship join users on friendship.user_id2=users.id where friendship.user_id1=${req.params.id};`)
    .then((response) => {
      res.send(response.rows)
    })
    .catch((err)=>console.log(err))
  })
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
   
    db.query(`select * from gear_checklist where activity='${req.params.activityname}';`)
      .then((response) => {
        const checklist_category = [];
        for(let activity of response.rows) {
          if(!checklist_category.includes(activity.category))
          {
            checklist_category.push(activity.category)
          }    
        }
        const gear_checklist = []
      
        for(let activity1 of checklist_category) {
          const checklist = {}
          checklist["name"] = activity1;
          checklist["children"] = [];
          for(let activity2 of response.rows) {
            if(activity1 === activity2.category) {
              checklist["children"].push({"id": activity2.id, "name": activity2.type});
            }
          }
          gear_checklist.push(checklist);
        }
        res.send(gear_checklist);
      })
      .catch((err) => console.log(err));

  
  })
  return router;
}

module.exports = routes;