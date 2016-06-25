import activity from './activity';

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
    });
    //.then(() => );
}
