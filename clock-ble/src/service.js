const bleno = require("bleno");
const ServiceUuid = "3cefb000-82c1-4929-8021-6d793424227c";

const SwitchCharacteristic = require("./characteristics/switch");

function serviceStart(clock) {
  bleno.on("stateChange", function(state) {
    console.log("on -> stateChange: " + state);

    if (state === "poweredOn") {
      bleno.startAdvertising("echo", [ServiceUuid]);
    } else {
      bleno.stopAdvertising();
    }
  });

  bleno.on("advertisingStart", function(error) {
    console.log(
      "on -> advertisingStart: " + (error ? "error " + error : "success")
    );

    if (!error) {
      const Switch = new SwitchCharacteristic(clock);
      bleno.setServices([
        new bleno.PrimaryService({
          uuid: ServiceUuid,
          characteristics: [Switch]
        })
      ]);
    }
  });
}
module.exports = serviceStart;
