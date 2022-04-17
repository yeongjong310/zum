export function createHooks(callback) {
  let currentState = [];
  let order = 0;

  function useState(value) {
    const thisOrder = order++;

    // initialize
    if (value && !currentState[thisOrder]) {
      currentState[thisOrder] = value;
    }

    const setState = (value) => {
      callback();
    };

    return [currentState[thisOrder], setState];
  }

  function resetContext() {}

  return { useState, resetContext };
}
