const content = fetch(
  props.src ||
    "https://raw.githubusercontent.com/replicate/replicate-javascript/main/README.md",
);

if (content === null) return "";

return (
  <Widget src="createit.near/widget/render" props={{ content: content.body }} />
);
