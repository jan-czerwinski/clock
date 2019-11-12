const EventEmmiter = require("events");

//tutaj zaladowac dane z pamieci, teraz dalem przykladowe
class Clock extends EventEmmiter {
  constructor() {
    super();
    this.switch = true;
    this.brightness = {
      day: 255,
      nightMode: true,
      night: 150,
      startTime: "2200",
      endTime: "0600"
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
  brightnessChanged() {
    this.emit("brightnessChanged", this.brightness);
  }
  colorChanged() {
    this.emit("colorChanged", this.color);
  }
}

module.exports = Clock;
