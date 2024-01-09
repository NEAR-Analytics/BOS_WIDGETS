const { tab, ...passProps } = props;

const [isTrustee, setIsTrustee] = useState(tab ? true : false);

const Container = styled.div`
  width: 100%;
  padding-block: 1rem;
  padding-inline: 3rem;

  .bold {
    font-weight: 600;
  }
`;

return (
  <Container className="pl-5">
    <div className="h2 bold">DevDAO Dashboard</div>
    <div className="mt-3">
      {!isTrustee ? (
        <Widget
          src={"devhub.near/widget/devhub.entity.trustee.login"}
          props={{ ...passProps, setIsTrustee }}
        />
      ) : (
        <Widget
          src={"devhub.near/widget/devhub.entity.trustee.dashboard"}
          props={{ ...passProps, setIsTrustee, tab }}
        />
      )}
    </div>
  </Container>
);
