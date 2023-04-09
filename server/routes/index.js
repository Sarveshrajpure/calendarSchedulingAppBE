const express = require("express");
const scheduleCalendarRoute = require("./scheduleCalendarRoute");
const router = express.Router();

const routesIndex = [
  { path: "/scheduleCalendar", route: scheduleCalendarRoute },
];

routesIndex.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
