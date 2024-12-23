#!/bin/bash

exit_with_error() {
   echo "Deployment ERROR: $1"
   exit 1
}

echo $1

cd /home/tope/THEVARTECH_APPS/RCCG_Lagos_Provice_48/$1/server
npm install --silent
cd ..
cd startup
pm2 startOrRestart $1.config.js
if [ "$?" == "1" ]; then
    exit_with_error "Application restart failure"
fi
