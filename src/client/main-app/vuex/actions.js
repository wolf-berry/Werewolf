function makeAction (type) {
  return ({ dispatch }, ...args) => dispatch(type, ...args);
}

export const setFocusedUserId = makeAction('SET_FOCUSED_USER_ID');
export const addOneUser = makeAction('ADD_USER');
export const removeUserStream = makeAction('REMOVE_USER_STREAM');
export const setUserStream = makeAction('SET_USER_STREAM');
