function create(key, value) {
  // or it could be front loaded
}

function set(key, value) {
  // Validate the type
  const typeObj = JSON.parse(type);
  const typeOfValue = typeof value;
  if (typeObj[key] !== typeOfValue) {
    console.log(`Expected ${typeObj[key]} but got ${typeOfValue}`);
    // can't throw error, but could return or display something on screen
    // handle error?
  }

  Social.set({
    thing: {
      [key]: {
        "": JSON.stringify(value),
      },
    },
    // and index?
  });
}

function get(key) {
  return JSON.parse(Social.get(key, "final") || "null");
}

function view() {
  // check Type for default view, or use a Template
}

return { create, set, get, view };
