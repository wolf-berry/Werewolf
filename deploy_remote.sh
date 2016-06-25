#! /bin/sh

# delete old werewolf
pm2 stop werewolf && rm -rf werewolf || exit 1

# unzip new werewolf
mkdir werewolf && mv "$1" ./werewolf/ && cd werewolf && unzip "$1" && mv ./dist/* ./ || exit 1

# start new werewolf
pm2 start ~/pm2/config.json --only werewolf  -f
