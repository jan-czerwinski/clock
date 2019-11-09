const EventEmmiter = require("events");

//tutaj zaladowac dane z pamieci, teraz dalem przykladowe
class Clock extends EventEmmiter {
  constructor() {
    super();
    this.switch = true;
    this.brigtness = {
      day: 255,
      nightMode: true,
      night: 150,
      startTime: "22:00",
      endTime: "06:00"
    };
    this.color = {
      r: 50,
      g: 168,
      b: 141
    };
  }
  switchChanged() {
    this.emit("switchChanged", this.switch);
  }
}

module.exports = Clock;
