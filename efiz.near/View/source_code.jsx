const path = props.path;
const type = props.type;

const parts = path.split("/");
let value = {};

if (parts.length < 2) {
  if (type === "account") {
    // return default profile or setting's profile
  }
} else {
  if (type === "widget") {
    if (path.endsWith("/")) {
      path = path.slice(0, -1);
    }
    return <Widget src={path} />;
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
    // return default post or post from settings
    const index = {
      action: parts[1],
      key: parts[2],
      options: {
        limit: 10,
        order: "desc",
        accountId: parts[0],
      },
    };

    function renderItem(a) {
      if (a.value.type === "md") {
        return (
          <>
            <Widget
              src="efiz.near/widget/Edge"
              props={{ blockHeight: a.blockHeight }}
            />
            <Widget
              src="near/widget/Posts.Post"
              props={{ accountId: a.accountId, blockHeight: a.blockHeight }}
            />
          </>
        );
      } else {
        return <p>lol no</p>;
      }
    }
    return (
      <Widget
        src="efiz.near/widget/MergedIndexFeed"
        props={{ index, renderItem, disableCaching: true }}
      />
    );

    //   value = Social.get(path, "final");
    //   value = JSON.parse(value);
    //   return <Widget src="efiz.near/widget/Post.View" props={{ value }} />;
  } else {
    value = Social.get(parts.join("/"), "final");
    value = JSON.parse(value);
  }
}

const text = `
\`\`\`json
${JSON.stringify(value, undefined, 2)}
\`\`\`
`;
return <Markdown text={text} />;
