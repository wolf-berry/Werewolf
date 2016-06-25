import activity from './activity';
import socket from '../socket';
import db from '../db';

function isDayCome(req) {
  const gameId = req.user.game.id;
  return db.select()
    .from('activities')
    .where('gameId', gameId)
    .whereIn('type', [2, 3, 4, 5])
    .then((rows) => rows.length === 4
      && socket.emit(
        'game',
        {
          type: 5,
        }
      )
    );
}

function vote(req, res) {
  const gameActivityId = req.params.gameActivityId;
  const { userId, type } = req.body;
  const voteUserId = req.user.id;
  let votedLength = 0;
  return activity.getActivityAndJSONContent(gameActivityId)
    .then((rows) => {
      if (!rows.length) {
        const err = new Error('投票失败');
        err.status = 403;
        throw err;
      }
      const content = rows[0].content.push({ voteUserId, userId, voteTime: new Date() });
      votedLength = content.length;
      return activity.updateActivityAndStringifyContent(gameActivityId, { content });
    })
    .then(() => {
      // wolf vote for killing
      if (type === 1) {
        socket.emit();
      }
    });
}

function check(req, res) {
  const userId = req.body.userId;
  const gameId = req.user.game.id;
  return activity.createActivityAndStringifyContent({
    gameId,
    type: 5,
    content: {
      userId,
    },
    startAt: new Date(),
  })
  //.then(())
  .then(() => isDayCome(req));
  //.then((boolean) => );
}

function save(req, res) {
  const userId = req.body.userId;
  const gameId = req.user.game.id;
  return activity.createActivityAndStringifyContent({
    gameId,
    type: 3,
    content: {
      userId,
    },
    startAt: new Date(),
  });
}

function kill(req, res) {
  const userId = req.body.userId;
  const gameId = req.user.game.id;
  return activity.createActivityAndStringifyContent({
    gameId,
    type: 4,
    content: {
      userId,
    },
    startAt: new Date(),
  })
  .then(() => isDayCome(gameId))
  .then((boolean) => boolean);
}

function speak(req, res) {
  const gameId = req.user.game.id;
  const userId = req.user.id;
  return activity.createActivityAndStringifyContent(
    {
      gameId,
      type: 6,
      content: {
        userId,
      },
      startAt: new Date(),
    }
  )
  .then((insertIds) => res.status(200).json({ gameActivityId: insertIds[0] }));
}

function speakDone(req, res) {
  const gameActivityId = req.params.gameActivityId;
  return activity.updateActivityAndStringifyContent(gameActivityId, { endAt: new Date() });
    //.then(() => );
}
