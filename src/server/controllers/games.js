import Promise from 'bluebird';

import db from '../db';
import { camelizeKeys, snakizeKeys } from '../util';
import socket from '../socket';
import gameController from './game';

function getDeadUserIds(gameId) {
  return db.select()
    .from('game_user')
    .where({
      game_id: gameId,
      result: 0,
    })
    .then((rows) => rows.map((row) => row.user_id));
}

function isEnd(gameId) {
  return db.select()
    .from('game_user')
    .where('game_id', gameId)
    .then((rows) => {
      let wolfDeadCount = 0;
      let personDeadCount = 0;
      rows.forEach((row) => {
        if (row.result === 0) {
          if (row.role === 2) {
            wolfDeadCount++;
          } else {
            personDeadCount++;
          }
        }
      });
      return (wolfDeadCount === 2) || (personDeadCount === 3);
    });
}

function addUserToGameHelper(gameId, userId) {
  return db
    .insert(snakizeKeys({
      gameId,
      userId,
    }))
    .into('game_user');
}

function updateUserFromGameHelper(gameId, userId, updateData) {
  return db('game_user')
    .update(snakizeKeys(updateData))
    .where({
      game_id: gameId,
      user_id: userId,
    });
}

function createGame(req, res) {
  let gameId;
  const userId = req.user.id;
  return db.insert('status', 'waiting')
    .into('games')
    .then((insertIds) => gameId = insertIds[0])
    .then(() => addUserToGameHelper(gameId, userId))
    .then(() => res.status(200).json({ gameId }));
}

function addUserToGame(req, res) {
  const gameId = req.params.gameId;
  const userId = req.user.id;
  return addUserToGameHelper(gameId, userId)
    .then(() => gameController.getUserGameHelper(userId))
    .then((game) => socket.emit(
      'users',
      {
        type: 1,
        user: {
          id: userId,
          name: req.user.username,
        },
      },
      game.users.filter((user) => user.id !== userId)
      .map((user) => user.id)
    ))
    .then((game) => res.status(200).json({
      channelId: null,
      game,
    }));
}

function viewGame(req, res) {
  const gameId = req.params.gameId;
  return Promise.all([
    db.select()
    .from('activities')
    .whereIn('game_id', gameId),
    db.select()
    .from('games')
    .where('id', gameId),
  ])
  .spread((aRows, gRows) => res.status(200).json({
    id: gRows[0].id,
    status: gRows[0].status,
    activities: aRows.map(camelizeKeys),
  }));
}

function viewGames(req, res) {
  const userId = req.user.id;
  return db.select()
    .from('game_user')
    .where('user_id', userId)
    .then((rows) => db
      .select()
      .from('games')
      .whereIn('id', rows.map((row) => row.game_id))
    )
    .then((rows) => rows.map(camelizeKeys))
    .then((rows) => res.status(200).json(rows));
}

export default {
  addUserToGameHelper,
  createGame,
  addUserToGame,
  viewGame,
  viewGames,
  updateUserFromGameHelper,
  isEnd,
  getDeadUserIds,
};
