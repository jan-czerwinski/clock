#!/bin/sh

SCRIPTPATH="$( cd "$(dirname "$0")" ; pwd -P )"

cd $SCRIPTPATH
./stop.sh

cd clock-ble/src
nohup node main.js > $SCRIPTPATH/logs/clock-ble.log 2>&1 & sudo echo $! > $SCRIPTPATH/logs/pids

cd $SCRIPTPATH
cd clock-logic
nohup python3 main.py > $SCRIPTPATH/logs/clock-logic.log 2>&1 & sudo echo $! >> $SCRIPTPATH/logs/pids

echo Clock started, output in $SCRIPTPATH/logs
