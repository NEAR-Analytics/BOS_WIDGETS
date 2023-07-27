const hello = () => {
  console.log("hello");
};

State.init({
  name: "bobo",
});

const setName = (v) => State.update({ name: v });

return {
  hello,
  user: context.accountId,
  name,
  setName,
};
