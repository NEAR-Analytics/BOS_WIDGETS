const Container = styled.div`
  display: flex;
  justify-content: center;
  
  @media (max-width: 767px) { /* Mobile devices */
    justify-content: flex-start;
  }
`;

const Subject = styled.div`
  font-family: "Times New Roman";
  font-size: "4em";
  line-height: "1.25";
  font-weight: 400;
  cursor: "pointer";
`;

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
          "": `return (<Widget src="efiz.near/widget/Tree" props={{ rootPath: "${context.accountId}", rootType: "account" }} />);`,
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
    <Container>
      <Subject>everything</Subject>
    </Container>
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
          account: {
            "efiz.near": null,
            [context.accountId]: null,
          },
        },
      }}
    />
  </div>
);
