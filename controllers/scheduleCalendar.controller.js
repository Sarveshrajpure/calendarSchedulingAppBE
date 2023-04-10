const httpStatus = require("http-status");
const {
  scheduleCalendarSchema,
  getScheduleSchema,
} = require("../validations/scheduleCalendarValidations");
const constants = require("../constants/constants");
const { scheduleService } = require("../services");

const scheduleCalendar = async (req, res, next) => {
  try {
    let values = await scheduleCalendarSchema.validateAsync(req.body);

    let events = constants.courseDetails;

    let willingHours = values.hoursWillingToCommit;

    let enrollDate = scheduleService.formatDate(values.enrollDate);

    let willingMinutes = willingHours * 60;

    let schedule = [];

    const getNextDay = (index) => {
      let nextDate = new Date();

      nextDate.setDate(nextDate.getDate() + index);
      if (nextDate.getDay() % 6 === 0) {
        // check for saturday & sunday
        if (nextDate.getDay() === 0) {
          nextDate.setDate(nextDate.getDate() + 1);
        } else {
          nextDate.setDate(nextDate.getDate() + 2);
        }
      }

      return nextDate;
    };
    let dateCounter = 1;
    for (let i = 0; i < events.length; i++) {
      schedule.push({
        title: events[i].title,
        duration: events[i].duration,
        start: getNextDay(dateCounter),
        end: getNextDay(dateCounter),
      });

      willingMinutes = willingMinutes - events[i].duration;

      if (willingMinutes <= 0) {
        dateCounter++;
        willingMinutes = willingHours * 60;
      }
    }

    let generateSchdule = await scheduleService.createSchedule(
      willingHours,
      enrollDate,
      schedule
    );

    if (generateSchdule) {
      res.status(httpStatus.OK).send({ message: "Enrollment Successfull!" });
    }
  } catch (error) {
    next(error);
  }
};

const getSchedule = async (req, res, next) => {
  try {
    let values = await getScheduleSchema.validateAsync({
      enrollDate: req.query.enrollDate,
      hoursWillingToCommit: req.query.hoursWillingToCommit,
    });

    let date = new Date(values.enrollDate);

    let dataToBeSent = {
      hours: values.hoursWillingToCommit,
      enrollDate: values.enrollDate,
    };
    let schedule = await scheduleService.getSchedule(
      dataToBeSent.hours,
      dataToBeSent.enrollDate
    );

    res.status(httpStatus.OK).send(schedule);
  } catch (error) {
    next(error);
  }
};

module.exports = { scheduleCalendar, getSchedule };
