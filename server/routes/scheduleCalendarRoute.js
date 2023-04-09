const express = require("express");
const scheduleCalendarController = require("../controllers/scheduleCalendar.controller");
const router = express.Router();

//api/scheduleCalendar/generateSchedule
router
  .route("/generateSchedule")
  .post(scheduleCalendarController.scheduleCalendar);

//api/scheduleCalendar/getSchedule
router.route("/getSchedule").get(scheduleCalendarController.getSchedule);

module.exports = router;
