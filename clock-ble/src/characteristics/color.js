const bleno = require("bleno");

const parseColor = data => {
  data = data.readUInt32LE(0);
  color = {
    r: Math.floor(data / 1000000),
    g: Math.floor((data % 1000000) / 1000),
    b: data % 1000
  };
  return color;
};

class Color extends bleno.Characteristic {
  constructor(Clock) {
    super({
      uuid: "0003",
      properties: ["read", "write"],
      value: null
    });
    this.Clock = Clock;
    this._value = null;
  }
  onReadRequest(offset, callback) {
    callback(this.RESULT_SUCCESS, this._value);
  }
  onWriteRequest(data, offset, withoutResponse, callback) {
    if (offset) {
      callback(this.RESULT_ATTR_NOT_LONG);
    } else if (data.length === 9) {
      callback(this.RESULT_INVALID_ATTRIBUTE_LENGTH);
    } else {
      this._value = data;
      console.log(parseColor(data));
      this.Clock.data.color = parseColor(data);
      this.Clock.dataChanged();
      callback(this.RESULT_SUCCESS);
    }
  }
}

module.exports = Color;
