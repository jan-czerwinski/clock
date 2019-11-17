const bleno = require("bleno");

const parseBrightness = data => {
  return {
    day: parseInt(data.slice(0, 3).toString()),
    nightMode: data.slice(3, 4).toString() === "1",
    night: parseInt(data.slice(4, 7).toString()),
    startTime: data.slice(7, 11).toString(),
    endTime: data.slice(11, 15).toString()
  };
};

const bufferBrightness = obj => {
  const str =
    obj.day.toString() +
    (obj.nightMode ? "1" : "0") +
    obj.night.toString() +
    obj.startTime +
    obj.endTime;
  return Buffer.from(str);
};

class Brightness extends bleno.Characteristic {
  constructor(Clock) {
    super({
      uuid: "0002",
      properties: ["read", "write"],
      value: null
    });
    this.Clock = Clock;
    this._value = bufferBrightness(this.Clock.data.brightness);
  }
  onReadRequest(offset, callback) {
    callback(this.RESULT_SUCCESS, this._value);
  }
  onWriteRequest(data, offset, withoutResponse, callback) {
    if (offset) {
      callback(this.RESULT_ATTR_NOT_LONG);
    } else if (data.length !== 15) {
      callback(this.RESULT_INVALID_ATTRIBUTE_LENGTH);
    } else {
      this._value = data;
      this.Clock.data.brightness = parseBrightness(data);
      this.Clock.dataChanged();
      callback(this.RESULT_SUCCESS);
    }
  }
}

module.exports = Brightness;
