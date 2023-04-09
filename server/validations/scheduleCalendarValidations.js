const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

const scheduleCalendarSchema = Joi.object({
  course: Joi.string(),
  enrollDate: Joi.date(),
  hoursWillingToCommit: Joi.number(),
});

const getScheduleSchema = Joi.object({
  enrollDate: Joi.date(),
  hoursWillingToCommit: Joi.number(),
});

module.exports = {
  scheduleCalendarSchema,
  getScheduleSchema,
};
