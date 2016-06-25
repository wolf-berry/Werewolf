import _ from 'lodash';

import log from './log';
import { INTERNAL_SERVER_ERROR_MSG } from './constants';

/**
 * Convert all first level property names of obj from
 * what ever_case to camelCase.
 *
 * @param {Object} obj - the original object with snake_case properties
 * @return {Object} returns a object with camelCase properties
 */
function camelizeKeys(obj) {
  return _.reduce(obj, (result, val, key) => {
    result[_.camelCase(key)] = val;
    return result;
  }, {});
}

/**
 * Default error handler for API controllers.
 * If error has no `status` field, it will be treated as internal server error.
 *
 * *** DON'T USE THIS TO HANDLE non-API CONTROLLER ERRORS (i.e. if you want to
 * return a rendered page, don't use this) ***
 *
 * @param {Error} err
 * @param {Response} res - express response
 * @param {Boolean} messageOnly - indicate whether to response
 *  JSON with error message only or the entire error.
 */
function defaultErrorHandler(err, res, messageOnly = true) {
  if (!err.status) {
    log.error(err);
    err.status = 500;
    err.message = INTERNAL_SERVER_ERROR_MSG;
  }
  res.status(err.status).json(
    messageOnly
      ? { message: err.message }
      : err
  );
}

export default {
  camelizeKeys,
  defaultErrorHandler,
};
