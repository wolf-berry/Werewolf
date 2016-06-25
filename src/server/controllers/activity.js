import db from '../db';

function createActivity({
  gameId,
  type,
  content,
  startTime = new Date(),
  endTime = new Date(),
  },
  trx = null,
) {
  return db.insert({
    gameId,
    type,
    content,
    startTime,
    endTime,
  })
  .into('activities')
  .transacting(trx);
}

function updateActivity(activityId, activity, trx = null) {
  return db.update(activity)
    .where('id', activityId)
    .transacting(trx);
}

export default {
  createActivity,
  updateActivity,
};
