<template>
<div>
  <div>{{errorMessage}}</div>
  <button @click="createGame">创建游戏</button>
</div>
</template>

<script>
import AgoraRTC from 'agora-rtc';

import { generateVideoProfile } from '../../libs/agora_utils';
import {
  addOneUser,
  removeUserStream,
  setUserStream,
} from '../../vuex/actions';

export default {
  name: 'GameHall',

  vuex: {
    actions: {
      addOneUser,
      removeUserStream,
      setUserStream,
    },
    getter: {
      currentUser: (state) => state.users[state.currentUserId],
    },
  },

  data() {
    return {
      uid: 0,
      resulution: '480p',
      maxFrameRate: 15,
      key: '0d592690c25548cf8b79643d2b7e4bb3',
      channel: '123',
      localStreamId: null,
      errorMessage: '',
    };
  },

  ready() {
    this.client = AgoraRTC.createRtcClient();
    this.init();
  },

  beforeDestroy() {
    if (this.currentUser.stream) {
      this.client.unpublish(this.currentUser.stream, (err) => {
        this.removeUserStream(this.currentUser.id);
        console.log('Unpublish failed with error: ', err);
      });
    }
  },

  methods: {
    init() {
      this.client.init(this.key, () => {
        console.log('AgoraRTC client initialized');
      }, (err) => {
        console.error('Failed to initialize AgoraRTC client: ', err);
        if (err) {
          switch (err.reason) {
          case 'CLOSE_BEFORE_OPEN':
            this.errorMessage = 'to use voice/video functions, you need to run Agora Media Agent first, if you do not have it installed, please visit url(' + err.agentInstallUrl + ') to install it.';
            break;
          case 'ALREADY_IN_USE':
            this.errorMessage = 'Agora Video Call is running on another tab already.';
            break;
          case 'INVALID_CHANNEL_NAME':
            this.errorMessage = 'Invalid channel name, Chinese characters are not allowed in channel name.';
            break;
          default:
            this.errorMessage = '未知错误';
          }
        }
      });
    },

    createGame() {
      this
      .createGameRoom(this.channel)
      .then(this.createLocalStream)
      .then(this.initLocalStream)
      .then(this.publishLocalStream)
      .then(() => {
        this.$route.router.go({
          name: 'game-room',
          params: { roomId: this.channel },
        });
      })
      .catch((err) => {
        this.errorMessage = err;
      });
    },

    createGameRoom(roomId) {
      return new Promise((resolve, reject) => {
        this.client.join(
          this.key,
          this.currentUser.id,
          roomId,
          (uid) => {
            console.log('User ' + uid + ' join channel successfully');
            console.log('Timestamp: ' + Date.now());
            resolve();
          },
          () => {
            reject('创建房间失败');
          });
      });
    },

    createLocalStream(uid) {
      this.setUserStream(uid, AgoraRTC.createStream({
        streamID: uid,
        audio: true,
        video: true,
        screen: false,
        local: true,
      }));
      return Promise.resolve();
    },

    initLocalStream() {
      const videoProfile = generateVideoProfile(this.resolution, this.maxFrameRate);
      this.currentUser.stream.setVideoProfile(videoProfile);

      return new Promise((resolve, reject) => {
        this.currentUser.stream.init(() => {
          console.log('Get UserMedia successfully');
          resolve();
          // console.log(this.localStream);

          // this.localStreamId = this.localStream.getId();

          // const size = agora.calculateVideoSize(false, window.width, window.height, this.resolution);
          // this.displayStream(this.localStream);
        }, (err) => {
          console.log('Local stream init failed.', err);
          reject('Please check camera or audio devices on your computer, then try again.');
        });
      });
    },

    publishLocalStream() {
      return new Promise((resolve, reject) => {
        this.client.publish(this.localStream, (err) => {
          console.log('Timestamp: ' + Date.now());
          reject('Publish local stream error: ' + err);
        });

        this.client.on('stream-published', () => {
          console.log('Local stream published');
          resolve();
        });
      });
    },

  },
};
</script>
