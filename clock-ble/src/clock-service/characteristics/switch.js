const bleno = require("bleno");

class Switch extends bleno.Characteristic {
  constructor(Clock) {
    super({
      uuid: "3cefb001-82c1-4929-8021-6d793424227c",
      properties: ["read", "write"],
      value: null
    });
    this.Clock = Clock;
  }
  onReadRequest(offset, callback) {
    callback(this.RESULT_SUCCESS, this.Clock.data.switch);
  }
  onWriteRequest(data, offset, withoutResponse, callback) {
    if (offset) {
      callback(this.RESULT_ATTR_NOT_LONG);
    } else if (data.length !== 1) {
      callback(this.RESULT_INVALID_ATTRIBUTE_LENGTH);
    } else {
      this.Clock.data.switch = 1 === data.readUInt8(0);
      this.Clock.dataChanged();
      callback(this.RESULT_SUCCESS);
    }
  }
}

module.exports = Switch;
