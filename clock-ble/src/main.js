const Clock = require("./clock");
const clock = new Clock();

const dataClient = require("./data-client");
dataClient(clock);

const serviceStart = require("./service");
serviceStart(clock);
