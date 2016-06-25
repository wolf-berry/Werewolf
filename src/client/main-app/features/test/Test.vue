<template>
  <div>
    Test Agora SDK!
    <button @click="initAgoraRTC">Testing</button>
    <div id="{{localStreamId}}" v-if="localStreamId"></div>
  </div>
</template>

<script>
import Vue from 'vue';
import AgoraRTC from 'agora-rtc';

import agora from '../../libs/agora';

export default {
  name: 'Test',

  data () {
    return {
      uid: 0,
      resulution: '480p',
      maxFrameRate: 15,
      key: '0d592690c25548cf8b79643d2b7e4bb3',
      channel: '123',
      localStreamId: null,
    };
  },

  ready() {
    this.client = AgoraRTC.createRtcClient();
    this.localStream = null;
  },

  methods: {
    initAgoraRTC() {
      console.log('boring', this.key);
      this.client.init(this.key, () => {
        console.log('AgoraRTC client initialized');
        this.client.join(this.key, this.channel, null, (uid) => {
          console.log('User ' + uid + ' join channel successfully');
          console.log('Timestamp: ' + Date.now());
          this.initLocalStream(uid);
          this.lastLocalStreamId = this.localStream.getId();
        });
      }, (err) => {
        console.error('Failed to initialize AgoraRTC client: ', err);
        if (err) {
          switch (err.reason) {
          case 'CLOSE_BEFORE_OPEN':
            const message = 'to use voice/video functions, you need to run Agora Media Agent first, if you do not have it installed, please visit url(' + err.agentInstallUrl + ') to install it.';
            console.error(message);
            break;
          case 'ALREADY_IN_USE':
            console.error('Agora Video Call is running on another tab already.');
            break;
          case 'INVALID_CHANNEL_NAME':
            console.error('Invalid channel name, Chinese characters are not allowed in channel name.');
            break;
          }
        }
      });
    },

    initLocalStream(id) {
      this.uid = id;
      if (this.localStream) {
        this.client.unpublish(this.localStream, (err) => {
          console.log('Unpublish failed with error: ', err);
        });
        this.localStream.close();
      }

      this.localStream = AgoraRTC.createStream({
        streamID: this.uid,
        audio: true,
        video: true,
        screen: false,
        local: true,
      });

      const videoProfile = agora.generateVideoProfile(this.resolution, this.maxFrameRate);
      this.localStream.setVideoProfile(videoProfile);

      this.localStream.init(() => {
        console.log('Get UserMedia successfully');
        console.log(this.localStream);

        this.localStreamId = this.localStream.getId();

        // const size = agora.calculateVideoSize(false, window.width, window.height, this.resolution);
        this.displayStream(this.localStream);

        this.client.publish(this.localStream, (err) => {
          console.log('Timestamp: ' + Date.now());
          console.log('Publish local stream error: ' + err);
        });

        this.client.on('stream-published', () => {
          console.log('Local stream published');
        });
      }, (err) => {
        console.log('Local stream init failed.', err);
        this.errorMessage = 'Please check camera or audio devices on your computer, then try again.';
      });
    },

    displayStream(stream) {
      Vue.nextTick(() => stream.play(stream.getId()));
    },
  },
};
</script>
