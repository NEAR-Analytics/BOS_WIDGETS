const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 767px) {
    justify-content: flex-start;
  }
`;

const InnerContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  border: 2px solid orange;
`;

const Column = styled.div`
  flex: 1 1 200px;
  display: flex;
  justify-content: center;
  border: 2px solid green;
`;

const CenterColumn = styled.div`
  flex: 2 1 300px;
  display: flex;
  justify-content: center;
  border: 2px solid red;
`;

return (
  <Container>
    <InnerContainer>
      <Row>
        <Column>icon</Column>
        <CenterColumn>subject</CenterColumn>
        <Column>action</Column>
      </Row>
      <Row>advanced</Row>
    </InnerContainer>
  </Container>
);

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
