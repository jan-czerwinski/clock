const axios = require("axios");

const url = "http://127.0.0.1:5000/hello";

function dataHandler(Clock) {
  Clock.on("clockChanged", clock => {
    axios.post(url, clock); //add error handling
  });
}

module.exports = dataHandler;
