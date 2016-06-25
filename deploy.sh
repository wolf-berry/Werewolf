#! /bin/sh

# build install packages
gulp build && cd dist && npm install --production && cd .. || exit

# zip and upload
filename="compressed_werewolf.zip"
rm -f $filename && zip -r $filename dist && scp $filename root@127.0.0.1:~/ || exit

# pass a argument and run remote script
ssh root@127.0.0.1 "nohup ./deploy_remote.sh ${filename}"
