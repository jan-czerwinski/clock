const EventEmmiter = require("events");

//tutaj zaladowac dane z pamieci, teraz dalem przykladowe
class Clock extends EventEmmiter {
  constructor() {
    super();
    this.data = {
      switch: true,
      brightness: {
        day: 255,
        nightMode: true,
        night: 150,
        startTime: "2200",
        endTime: "0600"
      },
      color: {
        r: 50,
        g: 168,
        b: 141
      }
    };
  }
  dataChanged() {
    this.emit("clockChanged", this.data);
  }
}

module.exports = Clock;
