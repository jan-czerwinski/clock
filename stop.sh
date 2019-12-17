#!/bin/sh

SCRIPTPATH="$( cd "$(dirname "$0")" ; pwd -P )"
cd $SCRIPTPATH

input="./logs/pids"
while IFS= read -r line
do
  sudo kill $line
done < "$input"

echo Killed or didnt kill previous clock instance
