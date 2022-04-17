const computeList = [];

export function observe(compute) {
  computeList.push(compute);
  publish();
}

export function observable(target) {
  const PREFIX = "_";
  const targetEntries = Object.entries(target);

  const state = targetEntries.reduce((acc, [key, value]) => {
    acc[PREFIX + key] = value;
    return acc;
  }, {});

  targetEntries.forEach(([key]) => {
    Object.defineProperty(state, key, {
      get: function () {
        return state[PREFIX + key];
      },
      set: function (value) {
        state[PREFIX + key] = value;
        publish();
      },
    });
  });

  return state;
}

function publish() {
  computeList.forEach((item) => {
    if (typeof item === "function") {
      item();
    }
  });
}
