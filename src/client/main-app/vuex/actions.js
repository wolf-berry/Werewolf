function makeAction (type) {
  return ({ dispatch }, ...args) => dispatch(type, ...args);
}

export const kill = makeAction('KILL');
