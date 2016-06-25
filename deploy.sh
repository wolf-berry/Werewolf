#! /bin/sh

# build install packages
gulp build && cd dist && npm install --production && cd .. || exit

# zip and upload
filename="compressed_werewolf.zip"
rm -f $filename && zip -r $filename dist && scp $filename lishunyang@112.74.81.37:~/ || exit

# pass a argument and run remote script
# ssh lishunyang@112.74.81.37 "nohup ./deploy_remote.sh ${filename}"
