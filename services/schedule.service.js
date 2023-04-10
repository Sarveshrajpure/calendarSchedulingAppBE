const { Schedule } = require("../models/schedule");
const { ApiError } = require("../middlewares/apiError");

const createSchedule = async (hours, enrollDate, schedule) => {
  try {
    let scheduleExits = await Schedule.scheduleExists(hours, enrollDate);
    if (!scheduleExits) {
      let newSchedule = new Schedule({
        hours: hours,
        enrollDate: enrollDate,
        schedule: schedule,
      });
      await newSchedule.save();

      return newSchedule;
    }
    return scheduleExits;
  } catch (error) {
    throw error;
  }
};

const getSchedule = async (hours, enrollDate) => {
  try {
    let findSchedule = await Schedule.findOne({
      hours,
      enrollDate,
    });
    return findSchedule;
  } catch (error) {
    throw error;
  }
};

const formatDate = (date) => {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};
module.exports = { createSchedule, getSchedule, formatDate };
