State.init({
  path: props.path ?? "self.social.near/profile/**",
});

const value = Social.get(state.path, "final");

function isJSON(str) {
  if (typeof str !== "string") {
    return false;
  }

  str = str.trim();
  return (
    (str.startsWith("{") && str.endsWith("}")) ||
    (str.startsWith("[") && str.endsWith("]"))
  );
}

const text = `
\`\`\`json
${JSON.stringify(isJSON(value) ? JSON.parse(value) : value, undefined, 2)}
\`\`\`
`;

return (
  <div>
    <div>
      <input
        type="text"
        value={state.path}
        placeholder="self.social.near/profile/**"
      />
    </div>
    <Markdown text={text} />
  </div>
);
