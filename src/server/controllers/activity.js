import db from '../db';
import { camelizeKeys, snakizeKeys } from '../util';

function createActivityAndStringifyContent({
  gameId,
  type,
  content,
  startAt,
  endAt,
  },
  trx = null
) {
  content = content && JSON.stringify(content);
  return db.insert(snakizeKeys({
    gameId,
    type,
    content,
    startAt,
    endAt,
  }))
  .into('activities')
  .transacting(trx);
}

function updateActivityAndStringifyContent(activityId, activity, trx = null) {
  activity.content = activity.content && JSON.stringify(activity.content);
  return db.update(snakizeKeys(activity))
    .where('id', activityId)
    .transacting(trx);
}

function getActivityAndJSONContent(activityId) {
  return db.select()
    .from('activity')
    .where('id', activityId)
    .then(camelizeKeys)
    .then((rows) => rows.map((row) => {
      row.content = JSON.parse(row.content);
      return row;
    }));
}

export default {
  createActivityAndStringifyContent,
  updateActivityAndStringifyContent,
  getActivityAndJSONContent,
};
