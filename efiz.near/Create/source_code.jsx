State.init({
  cid: "",
});

const setImageCid = (cid) => {
  State.update({ cid });
};

function composeData() {
  const data = {
    thing: {
      123: JSON.stringify({
        dataSource: "IFPS",
        dataSourceArgs: {
          arg1: state.cid,
        },
        type: "image",
      }),
    },
    index: {
      thing: JSON.stringify({
        key: "123",
        value: {
          type: "image",
        },
      }),
    },
  };

  return data;
}

return (
  <>
    <Widget
      src="efiz.near/widget/Create.Image"
      props={{ callback: setImageCid }}
    />
    <CommitButton force data={composeData} className="styless">
      create
    </CommitButton>
  </>
);
