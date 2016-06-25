import activity from './activity';
import socket from '../socket';


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
  const gameId = req.params.gameId;
  
}

function save(req, res) {
  const gameId = req.params.gameId;
  
}

function kill(req, res) {
  const gameId = req.params.gameId;
}

function speak(req, res) {
  const gameId = req.params.gameId;
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
