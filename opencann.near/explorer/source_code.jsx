State.init({
  path: "opencann.near/profile/**",
});

const value = Social.get(state.path, "final");

const text = `
\`\`\`json
${JSON.stringify(value, undefined, 2)}
\`\`\`
`;

return (
  <div>
    <div>
      <input
        type="text"
        value={state.path}
        placeholder="opencann.near/profile/**"
      />
    </div>
    <Markdown text={text} />
  </div>
);
