const bleno = require("bleno");
const ServiceUuid = "3cefb000-82c1-4929-8021-6d793424227c";

const SwitchCharacteristic = require("./characteristics/switch");
const BrightnessCharacteristic = require("./characteristics/brightness");
const ColorCharacteristic = require("./characteristics/color");

function serviceStart(clock) {
  bleno.on("stateChange", function(state) {
    console.log("state: ", state);

    if (state === "poweredOn") {
      bleno.startAdvertising("Zegar", [ServiceUuid]);
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
      const Switch = new SwitchCharacteristic(clock);
      const Brightness = new BrightnessCharacteristic(clock);
      const Color = new ColorCharacteristic(clock);

      bleno.setServices([
        new bleno.PrimaryService({
          uuid: ServiceUuid,
          characteristics: [Switch, Brightness, Color]
        })
      ]);
      console.log("Service Started");
    }
  });
}
module.exports = serviceStart;
