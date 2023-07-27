const hello = () => {
  console.log("hello");
};

const data = Social.keys(`nui.sking.near/widget/*`, "final", {
  return_type: "BlockHeight",
});

return {
  hello,
  user: context.accountId,
  data,
};
