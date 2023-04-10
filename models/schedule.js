const mongoose = require("mongoose");
const { scheduleService } = require("../services/schedule.service");

const scheduleDetails = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
});

const scheduleSchema = mongoose.Schema({
  hours: { type: Number },
  enrollDate: { type: Date },
  schedule: [scheduleDetails],
});

scheduleSchema.statics.scheduleExists = async function (hours, enrollDate) {
  // let enrolldate = scheduleService.formatDate(enrollDate);
  const schedule = await this.findOne({ hours, enrollDate });

  return schedule;
};

const Schedule = mongoose.model("Schedule", scheduleSchema);

module.exports = { Schedule };
