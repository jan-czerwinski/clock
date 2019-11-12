const bleno = require("bleno");

class Switch extends bleno.Characteristic {
  constructor(Clock) {
    super({
      uuid: "0001",
      properties: ["read", "write"],
      value: null
    });
    this.Clock = Clock;
  }
  onReadRequest(offset, callback) {
    console.log("switch read request: " + this.Clock.switch);
    callback(this.RESULT_SUCCESS, this.Clock.switch); //TODO
  }
  onWriteRequest(data, offset, withoutResponse, callback) {
    if (offset) {
      callback(this.RESULT_ATTR_NOT_LONG);
    } else if (data.length !== 1) {
      callback(this.RESULT_INVALID_ATTRIBUTE_LENGTH);
    } else {
      this.Clock.switch = 1 === data.readUInt8(0);
      this.Clock.switchChanged();
      callback(this.RESULT_SUCCESS);
    }
  }
}

module.exports = Switch;
