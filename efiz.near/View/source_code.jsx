const path = props.path;
const type = props.type;

if (path.endsWith("/")) {
  path = path.slice(0, -1);
}

const parts = path.split("/");
let value = {};

// ACCOUNT //
if (type === "account") {
  return "VIEW: account";
  // THING //
} else if (type === "thing") {
  // path: "everything"
  // type: "thing"
  return "VIEW: thing";
  // WIDGET //
} else if (type === "widget") {
  return <Widget src={path} />;
  // PROFILE //
} else if (type === "graph") {
  parts.push("**");
  value = Social.get(parts.join("/"), "final");
} else if (type === "index") {
  value = Social.get(parts.join("/"), "final");
} else if (type === "profile") {
  value = Social.get(parts.join("/"), "final");
  return <p>{value}</p>;
} else if (type === "settings") {
  if (parts.length === 3) {
    parts.push("**");
    value = Social.get(parts.join("/"), "final");
  } else {
    value = Social.get(parts.join("/"), "final");
    value = JSON.parse(value);
  }
} else if (type === "post") {
  const index = {
    action: parts[1],
    key: parts[2],
    options: {
      limit: 10,
      order: "desc",
      accountId: parts[0].endsWith(".near") ? parts[0] : undefined,
    },
  };

  function renderItem(a) {
    if (a.value.type === "md") {
      return (
        <Widget
          src="near/widget/Posts.Post"
          props={{ accountId: a.accountId, blockHeight: a.blockHeight }}
        />
      );
    }
  }
  return (
    <Widget
      src="efiz.near/widget/MergedIndexFeed"
      props={{ index, renderItem, disableCaching: true }}
    />
  );
} else {
  value = Social.get(parts.join("/"), "final");
  value = JSON.parse(value);
}

const text = `
\`\`\`json
${JSON.stringify(value, undefined, 2)}
\`\`\`
`;
return <Markdown text={text} />;
