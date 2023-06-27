const path = props.path; // every piece of data on social contract has a path
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
  border: 1px solid #ccc;
  height: fit-content;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border-bottom: 1px solid #ccc;
`;

const IconBox = styled.div`
  font-family: "Times New Roman";
  font-size: 2em;
  line-height: 1.25;
  font-weight: 400;
  cursor: pointer;
`;

const Content = styled.div`
  padding: 1px;
  min-height: 10px;
`;

const Button = styled.button`
  text-transform: lowercase !important;
`;

const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 4px;
`;

// DROPDOWN //

function Modifier() {
  const renderIcon = () => {
    const icon =
      Social.get(`${context.accountId}/settings/every/thing/icon`) ||
      `<svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="black"
        width="24px"
        height="24px"
      >
        <circle cx="12" cy="12" r="8" />
      </svg>`;
    return <Widget code={`return (${icon})`} />;
  };

  return (
    <Widget
      src="efiz.near/widget/Common.Dropdown"
      props={{
        renderIcon: renderIcon,
        elements: [],
      }}
    />
  );
}

function Thing() {
  // Renders the path according to type
  switch (type) {
    case "thing": {
      // get the thing data
      const thing = JSON.parse(Social.get(path, blockHeight) || "null");
      type = thing.type || null;
      // get the type data
      const typeObj = JSON.parse(Social.get(type, blockHeight) || "null");
      if (typeObj === null) {
        console.log(
          `edge case: thing ${path} had an invalid type: ${thingType}`
        );
      }
      // determine the widget to render this thing (is there a default view?)
      const widgetSrc =
        options?.templateOverride ||
        thing.template?.src ||
        typeObj?.widgets?.view;
      // Template
      return (
        <Widget
          src={widgetSrc}
          props={{ data: thing.data, path, blockHeight }}
        />
      );
    }
    case "post": {
      // TODO: Can we make this more efficient by checking the post type
      // potentially passing in the template for that thing?
      // Or maybe not...
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
      // TODO: Verify that props are passed
      // How to allow user to lock at a specific blockHeight?
      return <Widget src={path} props={props} />;
    }
    case "account": {
      return <Widget src="efiz.near/widget/Tree" props={{ rootPath: path }} />;
    }
    case "settings": {
      // Standardize path to {accountId}/settings/**
      parts.splice(2);
      parts.push("**");
      path = parts.join("/");
      return (
        <Widget
          src="efiz.near/widget/Every.Setting"
          props={{ path, blockHeight }}
        />
      );
    }
  }
  // DEFAULT:
  return <p>The type: {type} is not yet supported.</p>;
}

return (
  <Container id={path}>
    <Header>
      <ButtonRow>
        <Modifier />
      </ButtonRow>
    </Header>
    <Content>
      <Thing />
    </Content>
  </Container>
);
