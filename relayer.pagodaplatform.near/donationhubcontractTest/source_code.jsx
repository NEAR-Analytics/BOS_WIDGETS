const names = "test";
const description = "Hello I want to test.";
State.init({
  name: names,
  descipt: description,
});

return Near.call("donationhubv2.near", "add_post", {
  name: state.name,
  description: state.descipt,
});
