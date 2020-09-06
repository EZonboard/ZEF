const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/**
 * GET all devices, based on organization id.
 */
router.get("/:id", rejectUnauthenticated, (req, res) => {
    const queryString = `
    SELECT "device"."name",  
	"device"."install_date",
	"device"."serial_number",
	"device"."id",
	"device"."breaker_id",
	"breaker"."name",
	"breaker"."limit",
	"breaker"."description",
	"site"."address",
	"site"."first_name",
	"site"."second_name",
	"site"."email",
	"site"."phone",
	ARRAY_AGG ("device_type"."head" || '-Head ' || "device_type"."name") as "type_name" 
FROM "device"
JOIN "device_type" ON "type_id" = "device_type"."id"
JOIN "breaker" ON "breaker_id" = "breaker"."id"
JOIN "site" ON "site_id" = "site"."id"
WHERE "organization_id" = $1
GROUP BY "device"."id",
	"breaker"."name", 
	"breaker"."limit", 
	"breaker"."description",
	"site"."address",
	"site"."first_name",
	"site"."second_name",
	"site"."email",
	"site"."phone"
ORDER BY "device"."id" ASC;`;
    const queryValue = [req.params.id];
    //console.log('in/api/organization', req.params.id)
    pool
      .query(queryString, queryValue)
      .then((result) => {
        res.send(result.rows);
      })
      .catch((error) => {
        res.sendStatus(500);
        console.log(error);
      });
  });

/**
 * POST new device
 */
router.post('/', rejectUnauthenticated, (req, res) => {
    const queryString = `INSERT INTO "device"
    ("type_id", "breaker_id", "serial_number", "name", "install_date")
    VALUES($1, $2, $3, $4, $5);`;
    const postValues = [
        req.body.type_id,
        req.body.breaker_id,
        req.body.serial_number,
        req.body.name,
        req.body.installation_date
    ]
    pool.query(queryString, postValues)
    .then(()=>{res.sendStatus(201)})
    .catch((error)=>{
     res.sendStatus(500)
     console.log( 'error on POST /api/device/', error);
   })
});

module.exports = router;