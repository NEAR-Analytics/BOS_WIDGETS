function generateUUID() {
  return (
    Math.random().toString(16).slice(2) +
    Date.now().toString(36) +
    Math.random().toString(16).slice(2)
  );
}

function createThing({ data, type, thingId, onCommit, onCancel }) {
  thingId = generateUUID();
  const save = {
    thing: {
      [thingId]: JSON.stringify(data),
    },
    index: {
      every: JSON.stringify({
        key: type,
        value: {
          thingId,
          type,
        },
      }),
    },
  };
  Social.set(save, {
    onCommit,
    onCancel,
  });
}

function updateThing({ thingId, data, onCommit, onCancel }) {
  const save = {
    thing: {
      [thingId]: data,
    },
  };
  Social.set(save, {
    onCommit,
    onCancel,
  });
}

return { generateUUID, createThing, updateThing };
