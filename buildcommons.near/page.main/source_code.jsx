const accountId = props.accountId ?? context.accountId ?? "every.near";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  padding: 19px;
  margin: 23px;
`;

const H1 = styled.h1`
  font-family: "Courier", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 64px;
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

    svg {
      position: absolute;
      bottom: -8px;
      right: -10px;
      width: 23px;
      height: auto;
    }
  }

  @media (max-width: 900px) {
    font-size: 50px;

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

return (
  <Wrapper>
    <div>
      <H1>
        Build
        <span>
          Commons
          <svg viewBox="0 0 25 23" fill="none" aria-hidden="true"></svg>
        </span>
      </H1>
      <div className="d-flex flex-column align-items-center">
        <h3
          className="m-2 mt-3"
          style={{
            textTransform: "uppercase",
            letterSpacing: "0.17em",
            textAlign: "center",
            color: "#212428",
            fontFamily: "Courier, sans-serif",
          }}
        >
          <b>Social Network States</b>
        </h3>
        <div className="m-3 d-flex flex-row justify-content-center">
          <div className="m-1 me-3">
            <Widget
              src="buildcommons.near/widget/profile.builder"
              props={{ accountId: context.accountId ?? "every.near" }}
            />
          </div>
          <div className="m-2 ms-2">
            <Widget
              src="buildcommons.near/widget/graph.join"
              props={{ attestorId: accountId }}
            />
          </div>
        </div>
      </div>
    </div>
    <Widget src="buildcommons.near/widget/SocialGraph" />
    <Widget src="hack.near/widget/dev.Badge" />
  </Wrapper>
);
