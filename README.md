# Introduction:

This project recieves led settings (colour, brightness, on/off, time) from a mobile app via Bluetooth and applies it to a word clock. It was made to run on a raspberry pi using nodejs and python.

# Installation:

This disables Raspi syncing time

I tested it on Rpi 0 w with raspbian buster. I used node 8 because newer versions had compatibility issues with the **[Bleno](https://github.com/noble/bleno)** library.

```
# systemctl disable systemd-timesyncd.service
```

```
clock/clock-ble$ npm install
clock/clock-logic$ pip3 install flask
```

Start and stop (for development):

```
clock$ ./start.sh
clock$ ./stop.sh
```
