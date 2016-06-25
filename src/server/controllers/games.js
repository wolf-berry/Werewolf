import Promise from 'bluebird';

import db from '../db';
import { snakizeKeys } from '../util';
import socket from '../socket';

function addUserToGameHelper(gameId, userId) {
  return db
    .insert(snakizeKeys({
      gameId,
      userId,
    }))
    .into('games');
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
  return addUserToGameHelper(gameId, userId);
    //.then(() => )
}

function viewGames(req, res) {
  const userId = req.user.id;
  let promise;
  const games = {};
  if (req.params.gameId) {
    promise = Promise.resolve([req.params.gameId]);
  } else {
    /*promise = db.select()
      .from('game_user')
      .where('user_id', userId)
      .then((rows) => rows.map((row) => {
        const gameId = row.game_id;
        games[gameId].user
        return row.game_id;
      }));*/
  }
  return promise
    .then((gameIds) => db
      .select()
      .from('activities')
      .whereIn('game_id', gameIds)
    )
    .then((rows) => {
      rows.forEach((row) => {
        const gameId = row.game_id;
        if (games[gameId]) {
          games[gameId].activities = [row];
        }
      });
    });
}
