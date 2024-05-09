const path = props.path ?? "hack.near/widget/dev.Badge"; // every piece of data on social contract has a path
const blockHeight = props.blockHeight || "final"; // and a blockHeight (~version)
const options = props.options;

// split the path
const parts = path.split("/");
const creatorId = parts[0];

let type;
if (parts.length === 1) {
  // every root of a path is an account
  type = "account";
} else {
  // otherwise the "standard" is the type (widget, post, type, thing...)
  // for thing, we'll extract the actual "Type" later
  type = parts[1];
}

const Container = styled.div`
  height: fit-content;
`;

const Content = styled.div`
  padding: 5px;
  min-height: 300px;
`;

function Thing() {
  // Renders the path according to type
  switch (type) {
    case "post": {
      return (
        <Widget
          src="every.near/widget/every.post.view"
          props={{
            path,
            blockHeight: a.blockHeight,
          }}
        />
      );
    }
    case "widget": {
      return <Widget src={path} props={props} />;
    }
    case "account": {
      return <Widget src="efiz.near/widget/Tree" props={{ rootPath: path }} />;
    }
  }
  // DEFAULT:
  return <Widget src="sking.near/widget/Explorer" props={{ path }} />;
}

return (
  <Container id={path}>
    <Content>
      <Thing />
    </Content>
  </Container>
);
