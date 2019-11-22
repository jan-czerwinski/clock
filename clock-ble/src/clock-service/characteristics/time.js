const bleno = require("bleno");

class TimeCharacteristic extends bleno.Characteristic {
  constructor(Clock) {
    super({
      uuid: "3cefb004-82c1-4929-8021-6d793424227c",
      properties: ["write"],
      value: null
    });
    this.Clock = Clock;
  }
  onWriteRequest(data, offset, withoutResponse, callback) {
    if (offset) {
      callback(this.RESULT_ATTR_NOT_LONG);
    } else if (data.length !== 4) {
      callback(this.RESULT_INVALID_ATTRIBUTE_LENGTH);
    } else {
      let rawTime = data.readUInt32LE();
      const time = {
        // DDMMhhmm
        day: (rawTime - (rawTime % 1000000)) / 1000000,
        month: ((rawTime % 1000000) - (rawTime % 10000)) / 10000,
        hour: ((rawTime % 10000) - (rawTime % 100)) / 100,
        minute: rawTime % 100
      };
      this.Clock.timeChanged(time);
      callback(this.RESULT_SUCCESS);
    }
  }
}

module.exports = TimeCharacteristic;
