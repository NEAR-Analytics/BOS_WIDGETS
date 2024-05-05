const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 19px;
  margin: auto;
`;

const H1 = styled.h1`
  font-family: "Courier", sans-serif;
  font-style: normal;
  font-weight: 555;
  font-size: 55px;
  line-height: 1;
  text-align: center;
  color: #212428;
  margin: 8px;
  max-width: 700px;

  span {
    display: inline-block;
    background: #EDFF00;
    border-radius: 20px;
    position: relative;
    padding: 0.2em 0.3em 0.1em;
    margin: 0.1em;

    svg {
      position: absolute;
      bottom: -8px;
      right: -10px;
      width: 50px;
      height: auto;
    }
  }

  @media (max-width: 900px) {
    font-size: 39px;

    span {
      border-radius: 12px;
      svg {
        position: absolute;
        bottom: -5px;
        right: -7px;
        width: 18px;
      }
    }
  }
`;

const Tagline = styled.h3`
  font-family: "Courier", sans-serif;
  font-size: 23px;
  line-height: 1;
  text-align: center;
  color: #212428;
  margin: 8px;
  max-width: 700px;

  @media (max-width: 900px) {
    font-size: 19px;
  }
`;

return (
  <Wrapper>
    <div>
      <H1>
        <span>
          Build
          <svg viewBox="0 0 25 23" fill="none" aria-hidden="true"></svg>
        </span>
        Commons
      </H1>
      <div className="d-flex flex-column align-items-center">
        <Tagline
          className="m-2 mt-3"
          style={{
            textTransform: "uppercase",
            letterSpacing: "0.17em",
          }}
        >
          <b>Social Network States</b>
        </Tagline>
        {context.accountId ? (
          <div className="m-3 mt-4 d-flex flex-row justify-content-center">
            <div className="m-1 me-3">
              <Widget
                src="buildcommons.near/widget/profile.builder"
                props={{ accountId: context.accountId }}
              />
            </div>
            <div className="m-2 ms-2">
              <Widget
                src="buildcommons.near/widget/graph.join"
                props={{
                  attestorId: context.accountId,
                  accountId: "buildcommons.near",
                  defaultBuilder: "buildcommons.near",
                }}
              />
            </div>
          </div>
        ) : (
          <div className="m-3">
            <Widget src="buildcommons.near/widget/connect" />
          </div>
        )}
      </div>
      <Widget src="buildcommons.near/widget/SocialGraph" />
    </div>
  </Wrapper>
);
