export function createHooks(callback) {
  let currentState = [];
  let nextState = [];
  let order = 0;

  function useState(value) {
    const thisOrder = order++;

    // initialize
    if (value && !currentState[thisOrder]) {
      currentState[thisOrder] = value;
    }

    const setState = (value) => {
      if (nextState[thisOrder] === value || currentState[thisOrder] === value)
        return;
      nextState[thisOrder] = value;
      callback();
    };

    return [currentState[thisOrder], setState];
  }

  function resetContext() {}

  return { useState, resetContext };
}
