const [path, setPath] = useState(props.path || "every.near/type/core");

const value = Social.get(path, "final");
const thing = JSON.parse(value);

const text = `
\`\`\`json
${JSON.stringify(thing, null, 2)}
\`\`\`
`;

return <div>{value && <Markdown text={text} />}</div>;
