const showInput = props.showInput || true;

const [path, setPath] = useState(props.path || "every.near/type/core");

const value = Social.get(path, "final");

const text = `
\`\`\`json
${JSON.stringify(value, undefined, 2)}
\`\`\`
`;

const handlePathChange = (e) => {
  setPath(e.target.value);
};

return (
  <div>
    {showInput && (
      <div>
        <input
          type="text"
          value={path}
          placeholder="every.near/type/core"
          onChange={handlePathChange}
        />
      </div>
    )}
    {value && <Markdown text={text} />}
  </div>
);
