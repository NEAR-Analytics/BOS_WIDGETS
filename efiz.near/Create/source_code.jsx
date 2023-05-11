function composeData() {
  const data = {
    index: {
      edge: JSON.stringify({
        key: "91582684",
        value: {
          type: "reference",
          ref: {
            accountId: "neversettleinterstellar.near",
            blockHeight: "79201485",
            type: "meme",
          },
        },
      }),
    },
  };

  return data;
}

return (
  <>
    <CommitButton force data={composeData} className="styless">
      create
    </CommitButton>
  </>
);
