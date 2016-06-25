/* eslint-disable no-invalid-this */
import db from './db';

let ioInstance;
const userIdIndexSockets = {};

function initSocket(http) {
  const io = require('socket.io')(http);
  ioInstance = io;
  io.on('connection', (socket) => {
    console.log('socket connection constructed!');
    socket.on('register', (data) => {
      const { userId } = data;
      console.log(`user ${userId} connected`);
      userIdIndexSockets[userId] = socket;
      socket.userId = userId;
    });
    socket.on('disconnect', function() {
      delete userIdIndexSockets[this.userId];
      db('game_user').update('result', 0)
      .where('user_id', this.userId)
      .whereNotNull('result');
      console.log(`user ${this.userId} disconnected`);
    });
  });
}

function emit(name, data, userIds = []) {
  userIds.forEach((userId) => {
    const socket = userIdIndexSockets[userId];
    if (socket) {
      ioInstance.to(socket.id).emit(name, data);
    } else {
      console.error(`${userId} is not existed`);
    }
  });
}

export default {
  initSocket,
  emit,
};
