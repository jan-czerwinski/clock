#!/bin/sh

SCRIPTPATH="$( cd "$(dirname "$0")" ; pwd -P )"

cd $SCRIPTPATH
cd clock-ble/src
nohup node main.js > ../../logs/clock-ble.log 2>&1 & echo $! > ../../logs/pids

cd $SCRIPTPATH
cd clock-logic
nohup python3 main.py > ../logs/clock-logic.log 2>&1 & echo $! >> ../logs/pids

echo Clock started, output in $SCRIPTPATH/logs