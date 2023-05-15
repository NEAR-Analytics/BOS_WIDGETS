const Button = styled.button`
  text-transform: lowercase !important;
`;

const Link = styled.a`
  text-decoration: none;
`;

const everythingExists =
  !!Social.get(`${context.accountId}/widget/everything`) ?? false;

const createEverything = () => {
  Social.set(
    {
      widget: {
        everything: {
          "": `return (<Widget src="evrything.near/widget/everything.template" props={{ accountId: "${context.accountId}", text: "${context.accountId}", style: { font: "Times New Roman" } }} />);`,
          metadata: {
            tags: {
              everything: "",
            },
          },
        },
      },
    },
    {
      force: true,
    }
  );
};

// <a href={"/#/evrything-docs.near/widget/Everything.Documentation"}>
//   <Button>documentation</Button>
// </a>;

return (
  <div className="d-flex flex-column">
    <div className="mt-auto py-3">
      <div className="container">
        <div className="d-flex justify-content-end gap-2">
          {context.accountId &&
            (everythingExists ? (
              <a href={`/#/${context.accountId}/widget/everything`}>
                <Button>{context.accountId}'s everything</Button>
              </a>
            ) : (
              <Button onClick={createEverything}>
                create your own everything
              </Button>
            ))}
        </div>
      </div>
    </div>
    <Widget
      src="efiz.near/widget/Tree"
      props={{
        rootPath: "everything",
        rootType: "thing",
        rootNode: {
          post: {
            main: null,
            dev: null,
            bos: null,
          },
        },
      }}
    />
  </div>
);
