const accountId = props.accountId ?? "every.near";

const description = Social.get(`${accountId}/profile/description`);

const Container = styled.div`
  background-color: #000;
  border-radius: 10px;
  color: #fff;
  padding: 1rem;
`;

const Description = styled.div`
  position: relative;
  overflow: hidden;
  h1, .h1, h2, .h2, h3, .h3, h4, .h4, h5, .h5, h6, .h6 {
    color: #fff
    font-size: 1.2rem;
    margin: 0
  }
  p {
        color: #fff
    margin: 0
  }
`;

return (
  <Container className="d-flex flex-column gap-1">
    <Widget
      src="james.near/widget/profile.inline"
      props={{ accountId, hideDescription: true }}
    />
    <div className="d-flex">
      <div className="me-3">
        <Widget src="james.near/widget/FollowStats" props={{ accountId }} />
      </div>
    </div>
    <div className="d-flex gap-2">
      <Widget src="james.near/widget/FollowButton" props={{ accountId }} />
      <Widget src="james.near/widget/dao.button" props={{ accountId }} />
    </div>

    <div className="description collapse show m-2 mt-3">
      <button
        className="btn btn-sm btn-outline-light border-0 pe-2 rounded-5"
        data-bs-toggle="collapse"
        data-bs-target={`.description`}
        aria-expanded="false"
        aria-controls={"description"}
      >
        <i className="bi bi-arrows-angle-expand me-2 ms-1"></i>About{" "}
      </button>
    </div>
    <div className="collapse description m-2">
      <hr />
      <Description>
        <Markdown text={description} />
      </Description>
      <button
        className="btn btn-sm btn-outline-light border-0 pe-2 rounded-5"
        data-bs-toggle="collapse"
        data-bs-target={`.description`}
        aria-expanded="false"
        aria-controls={"description"}
      >
        <i className="bi bi-arrows-collapse me-2 ms-1"></i>Hide
      </button>
    </div>
  </Container>
);
