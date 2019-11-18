const EventEmmiter = require("events");
const fs = require("fs");

class Clock extends EventEmmiter {
  constructor() {
    super();
    this.data = JSON.parse(
      fs.readFileSync("../../clock-settings.json", "utf8")
    );
  }
  dataChanged() {
    this.emit("clockChanged", this.data);
  }
}

module.exports = Clock;
