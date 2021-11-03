const { response } = require("express");
const express = require("express");
//const cookieSession = require("cookie-session");
const router = express.Router();

const routes = (db) => {

  router.get("/login/:username", (req, res) => {
    db.query(`SELECT * FROM users WHERE user_name=$1`, [req.params.username])
      .then((response) => {

        res.send(response.rows);
      })
      .catch((err) => console.log(err));
  })


  router.get("/friendlist/:id", (req, res) => {
    db.query(`select users.id, users.user_name, users.avatar from friendship 
join users on friendship.user_id2=users.id where friendship.user_id1=${req.params.id}

union 

select users.id, users.user_name, users.avatar from friendship 
join users on friendship.user_id1=users.id where friendship.user_id2=${req.params.id}`)
      .then((response) => {
        res.send(response.rows)
      })
      .catch((err) => console.log(err))

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

  // POST new trip:
  router.post('/newTrip', (req, res) => {
    // const creator_id = req.session.user_id;
    const creator_id = req.body.creator_id;
    const title = req.body.title;
    const description = req.body.description;
    const start_date = req.body.start_date;
    const end_date = req.body.end_date;
    const activity = req.body.activity;
    const longitude = req.body.longitude;
    const latitude = req.body.latitude;
    const image = req.body.image;

    db.query(`
    INSERT INTO trips (creator_id, title, description,
      start_date, end_date, activity, longitude, latitude, image)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [creator_id, title, description, start_date, end_date, activity, longitude, latitude, image]
    ).then((data) => {
      return res.json(data.rows[0]);
    });
  });

  // POST Create a user gear list:
  router.post('/newGearList', (req, res) => {

    const trip_id = req.body.trip_id;
    const type_id = req.body.type_id;
    const checked = req.body.checked;
    db.query(`
    INSERT INTO user_checklist (trip_id,type_id, checked)
      VALUES ($1,$2, $3) RETURNING *`,
      [trip_id, type_id, checked]
    ).then((data) => {
      return res.json(data.rows[0]);
    });
  });


  //// trips ////

  // PUT, Edit the trip:
  router.put('/trips/edit/:trip_id', (req, res) => {
    const id = req.params.trip_id;
    const title = req.body.title;
    const description = req.body.desc;
    const start_date = req.body.start_date;
    const end_date = req.body.end_date;
    const activity = req.body.activity;
    const longitude = req.body.longitude;
    const latitude = req.body.latitude;

    db.query(
      `
      UPDATE trips SET title=$1, description=$2,
      start_date=$3, end_date=$4,activity_category=$5,
      longitude=$6, latitude=$7
      WHERE id=$8 RETURNING *;`,
      [title, description, start_date, end_date, activity, longitude, latitude, id]
    ).then(() => {
      res.status(200).send("updated Trip");
    }).catch((err) => {
      res.status(500).json({ error: err.message });
    });
  });


  // DELETE, delete the trip:
  router.delete('/trips/delete/:trip_id', (req, res) => {
    const id = req.params.trip_id;
    db.query(`
    DELETE FROM trips
    WHERE id=$1;
    `, [id]
    ).then(() => {
      res.status(200).send("Deleted Trip");
    }).catch((err) => {
      res.status(500).json({ error: err.message });
    });
  });

  // Displays user's completed trips in Trips (aka Calendar) page
  router.get('/trips/completed/:user_id', (req, res) => {
    const user_id = req.params.user_id;
    db.query(
      `
      SELECT * FROM trips
      WHERE end_date < CURRENT_DATE AND creator_id = $1
    `, [user_id]
    ).then(({ rows: dbResponse }) => {
      res.json(dbResponse);
    });
  });

  // Displays user's planned trips in Trips (aka Calendar) page
  router.get('/trips/planned/:user_id', (req, res) => {
    const user_id = req.params.user_id;
    db.query(
      `
      SELECT * FROM trips
      WHERE start_date >= CURRENT_DATE AND creator_id = $1
    `, [user_id]
    ).then(({ rows: dbResponse }) => {
      res.json(dbResponse);
    });
  });

  // Display user's friend trips in Trips (aka Calendar) page
  router.get('/trips/friends/:user_id', (req, res) => {
    const user_id = req.params.user_id;
    db.query(
      `
        SELECT * FROM trips
        WHERE creator_id IN
          (
            SELECT users.id FROM friendship 
            JOIN users ON friendship.user_id2 = users.id
            WHERE friendship.user_id1 = $1
          
            UNION
          
            SELECT users.id FROM friendship 
            JOIN users ON friendship.user_id1 = users.id
            WHERE friendship.user_id2 = $1
          )
      `, [user_id]
      ).then(({ rows: dbResponse }) => {
        res.json(dbResponse);
      });
    });







  //Get All gear list
  router.get('/allGear', (req, res) => {
    db.query(
      `
      SELECT
        *
      FROM
      gear_checklist;
    `
    ).then(({ rows: dbResponse }) => {
      // console.log("newRes:::", dbResponse);
      res.json(dbResponse)

    });
  });

  router.get('/trips/:trip_id', (req, res) => {
    const { trip_id } = req.params;
    db.query(
      `
      SELECT *
      FROM trips
      WHERE id = $1;
    `, [trip_id]
    ).then(({ rows: dbResponse }) => {
      // console.log("newRes:::", dbResponse);
      res.json(dbResponse);

    });
  });

  //// dashboard ////

  // Displays user's upcoming trips as well as their friend's
  router.get('/trips/dashboard/:user_id', (req, res) => {
    const user_id = req.params.user_id;
    db.query(
      `
      SELECT * FROM trips
      WHERE start_date >= CURRENT_DATE AND (creator_id = $1 OR creator_id IN
        (
          SELECT users.id FROM friendship 
          JOIN users ON friendship.user_id2 = users.id
          WHERE friendship.user_id1 = $1
        
          UNION
        
          SELECT users.id FROM friendship 
          JOIN users ON friendship.user_id1 = users.id
          WHERE friendship.user_id2 = $1
        )
      )
      ORDER BY start_date ASC
      LIMIT 9
    `, [user_id]
    ).then(({ rows: dbResponse }) => {
      res.json(dbResponse);
    });
  });
  
  // Displays number of user completed trips, that of planend, and that of friends' trips
  router.get('/trips/dashboard/stats/:user_id', (req, res) => {
    const user_id = req.params.user_id;
    db.query(
      `
      SELECT
      SUM (CASE WHEN start_date >= CURRENT_DATE AND creator_id = $1 THEN 1 ELSE 0 END) AS planned,
      SUM (CASE WHEN end_date < CURRENT_DATE AND creator_id = $1 THEN 1 ELSE 0 END) AS completed,
      SUM (CASE WHEN creator_id != $1 THEN 1 ELSE 0 END) AS friends        
      FROM trips
      WHERE creator_id = $1 OR creator_id IN
        (
          SELECT users.id FROM friendship 
          JOIN users ON friendship.user_id2 = users.id
          WHERE friendship.user_id1 = $1
        
          UNION
        
          SELECT users.id FROM friendship 
          JOIN users ON friendship.user_id1 = users.id
          WHERE friendship.user_id2 = $1
        )
    `, [user_id]
    ).then(({ rows: dbResponse }) => {
      res.json(dbResponse);
    });
  });




  //Get gear base on Activity
  router.get('/activities/:activityName', (req, res) => {
    const { activityName } = req.params;
    db.query(
      `
      SELECT
        *
      FROM
      gear_checklist
      WHERE activity = $1
    `, [activityName]
    ).then((dbResponse) => {
      // console.log("newRes:::", dbResponse.rows);
      res.json(dbResponse.rows)

    });
  });

  // // GET user gear list: BABAK DONT REMOVE
  router.get('/calendar/userGearList/:trip_id', (req, res) => {
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




  // PUT, Edit the trip:
  router.put('/userGear/update/:trip_id', (req, res) => {
    const checked = req.body.checked;
    const trip_id = req.params.trip_id;
    const type_id = req.body.type_id;
    db.query(
      `
    UPDATE user_checklist SET checked=$1
    WHERE trip_id=$2 AND type_id=$3 RETURNING *;`,
      [checked, trip_id, type_id]
    ).then(() => {
      res.status(200).send("updated checked status");
    }).catch((err) => {
      res.status(500).json({ error: err.message });
    });
  });



  // GET popular Trips:
  router.get('/recommendations', (req, res) => {
    db.query(
      `
      SELECT
        *
      FROM
      recommendations;
    `
    ).then(({ rows: dbResponse }) => {
      // console.log("recommendations:::", dbResponse);
      res.json(dbResponse)

    });
  });

  // Displays user's completed trips in Trips (aka Calendar) page
  router.get('/trips/completed/:user_id', (req, res) => {
    const user_id = req.params.user_id;
    db.query(
      `
    SELECT * FROM trips
    WHERE end_date < CURRENT_DATE AND creator_id = $1
  `, [user_id]
    ).then(({ rows: dbResponse }) => {
      res.json(dbResponse);
    });
  });

  // Displays user's planned trips in Trips (aka Calendar) page
  router.get('/trips/planned/:user_id', (req, res) => {
    const user_id = req.params.user_id;
    db.query(
      `
    SELECT * FROM trips
    WHERE start_date >= CURRENT_DATE AND creator_id = $1
  `, [user_id]
    ).then(({ rows: dbResponse }) => {
      res.json(dbResponse);
    });
  });


  //POST save user gear     
  router.post("/usergear", (req, res) => {
    //return primarykey
  });

  router.get("/activity/:activityname", (req, res) => {

    db.query(`select * from gear_checklist where activity='${req.params.activityname}';`)
      .then((response) => {
        const checklist_category = [];
        for (let activity of response.rows) {
          if (!checklist_category.includes(activity.category)) {
            checklist_category.push(activity.category)
          }
        }
        const gear_checklist = []

        for (let activity1 of checklist_category) {
          const checklist = {}
          checklist["name"] = activity1;
          checklist["children"] = [];
          for (let activity2 of response.rows) {
            if (activity1 === activity2.category) {
              checklist["children"].push({ "id": activity2.id, "name": activity2.type });
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