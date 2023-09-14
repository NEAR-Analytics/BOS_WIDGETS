const UUID = {
  generate: (template) => {
    if (typeof template !== "string") {
      template = "xxxxxxxx-xxxx-xxxx-yxxx-xxxxxxxxxxxx";
    }
    return template.replace(/[xy]/g, (c) => {
      var r = (Math.random() * 16) | 0;
      var v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  },
};

const accountId = context.accountId;

if (!accountId) {
  return "Please connect your NEAR account";
}

const addSubstance = (target) => {
  const thingId = target.data.id;

  // index new substance
  Social.set({
    thing: {
      [thingId]: target,
    },
    index: {
      every: JSON.stringify({
        key: "every.near/type/substance",
        value: {
          type: "every.near/type/substance",
          id: thingId,
        },
      }),
    },
  });

  State.update({ substance: target });
};

const proposeSubstance = (target) => {
  console.log(target);
};

return (
  <>
    <div>
      <Widget
        src="itexpert120-contra.near/widget/EventForm"
        props={{
          addSubstance: addSubstance,
          proposeSubstance: proposeSubstance,
        }}
      />
    </div>
  </>
);
