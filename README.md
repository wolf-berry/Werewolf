# Werewolf
online video-able werewolf game (creation for HACKATHON RENAISSANCE)


## setup

    mysql -u root

    mysql> create database wolf;
    mysql> create database wolf_session;

    npm install
    # insert table fields
    ./node_modules/.bin/babel-node src/server/bin/createTable.js

## run in locale env

    npm run dev

## generate hashed password and salt

    ./node_modules/.bin/babel-node src/server/bin/gen.js yourpassword
