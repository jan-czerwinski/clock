const axios = require("axios");

const url = "http://127.0.0.1:5000/clock";

function dataClient(Clock) {
  Clock.on("clockChanged", clock => {
    console.log(clock);
    axios.post(url, clock).then(
      response => console.log("to python: ", response.status, response.data),
      error => {
        console.log("TO PYTHON ERROR:");
        console.error(error);
      }
    );
  });
}

module.exports = dataClient;
