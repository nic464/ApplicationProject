#!/bin/bash
#creates the log of orders from the bitfinex websocket
node bitfinexConnector.js $1 > data/$1Data.csv &

#Creates the localhost webpage
node index.js
