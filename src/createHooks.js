export function createHooks(callback) {
  function useState(value) {
    let state;

    // initialize
    if (value) {
      state = value;
    }

    const setState = () => {
      callback();
    };

    return [state, setState];
  }

  function resetContext() {}

  return { useState, resetContext };
}
