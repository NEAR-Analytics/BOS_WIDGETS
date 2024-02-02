const Container = styled.div`
  background-color: #000;
  color: #fff;
  padding: 1.39rem;
  margin: 0.23rem;
  border-radius: 10px;
  border-color: #000;
`;

return (
  <Container>
    <h5>Explore Community</h5>
    <div className="mb-3">
      <Widget
        src="james.near/widget/profile.search"
        props={{
          limit: 10,
          onChange: ({ result }) => State.update({ profiles: result }),
        }}
      />
    </div>
    {state.profiles && state.profiles.length > 0 && (
      <div style={{ backgroundColor: "#000" }} className="mb-2">
        {state.profiles.map(({ accountId }, i) => (
          <>
            <div
              key={accountId}
              className="d-flex justify-content-between align-items-center mb-3"
            >
              <div className="me-2 p-2">
                <Widget
                  src="james.near/widget/profile.link"
                  props={{ accountId, hideDescription: true }}
                />
              </div>
              <div className="d-flex flex-row text-nowrap gap-2">
                <Widget
                  src="james.near/widget/FollowButton"
                  props={{ accountId }}
                />
                <Widget
                  src="james.near/widget/dao.button"
                  props={{ accountId }}
                />
              </div>
            </div>
            <hr />
          </>
        ))}
      </div>
    )}
    <Widget src="james.near/widget/explore.builders" props={{ limit: 24 }} />
  </Container>
);
