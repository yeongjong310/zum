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
        if (Array.isArray(value)) {
          let isSameArray = true;
          for (let i = 0; i < value.length; i++) {
            if (value[i] !== state[PREFIX + key][i]) {
              isSameArray = false;
              break;
            }
          }
          if (isSameArray) return;
        }

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
