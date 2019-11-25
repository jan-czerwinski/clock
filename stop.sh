#!/bin/sh

SCRIPTPATH="$( cd "$(dirname "$0")" ; pwd -P )"
cd $SCRIPTPATH

input="./logs/pids"
while IFS= read -r line
do
  kill $line
done < "$input"

rm $input

echo Stopped clock