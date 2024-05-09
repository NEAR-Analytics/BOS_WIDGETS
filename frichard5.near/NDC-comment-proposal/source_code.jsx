const dataa = Social.get("frichard5.near/widget/**");
const comment = () => {
  const index = {
    action: "post",
    key: "main",
    options: {
      limit: 10,
      order: "desc",
      accountId: "frichard5.near",
    },
  };
  const initialItems = Social.index(index.action, index.key, index.options);
  //const setPost = Social.set();
  const data = {
    post: {
      main: JSON.stringify({ type: "md", text: "test wrong zkey" }),
    },
    index: {
      post: JSON.stringify({
        key: "main",
        value: {
          type: "midd",
        },
      }),
    },
  };
};

return (
  <div>
    <button onClick={comment}>Comment</button>
  </div>
);
