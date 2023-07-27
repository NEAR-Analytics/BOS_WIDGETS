const hello = () => {
  console.log("hello");
};

const setName = (v) => State.update({ name: v });

return {
  hello,
  user: context.accountId,
  setName,
};
