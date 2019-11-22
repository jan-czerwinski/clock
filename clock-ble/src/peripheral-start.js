const bleno = require("bleno");
const ClockService = require("./clock-service/clock-service");

function peripheralStart(clock) {
  bleno.on("stateChange", function(state) {
    console.log("state: ", state);

    if (state === "poweredOn") {
      bleno.startAdvertising("Zegar", ["TODO"]);
      console.log("Started Advertising");
    } else {
      bleno.stopAdvertising();
      console.log("Stopped Advertising");
    }
  });

  bleno.on("advertisingStart", function(error) {
    if (error) {
      console.log("Advertising Start error: ", error);
    } else {
      bleno.setServices([new ClockService(clock)]);
      console.log("Service Started");
    }
  });
}
module.exports = peripheralStart;
