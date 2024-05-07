const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 19px;
  margin: auto;
  background: #fff;
`;

const Word = styled.span`
  font-family: "Courier", sans-serif;
  font-style: bold;
  font-weight: 555;
  color: #212428;
  padding: 0.2em 0.6em;
  margin: 0 5px;
  display: inline-block;
  background-color: ${(props) => (props.highlight ? "#EDFF00" : "transparent")};
  border-radius: 8px;
  transition: background-color 0.3s;
  cursor: pointer;
`;

const Space = styled.span`
  width: 12px;
  height: 23px;
  display: inline-block;
  cursor: pointer;
`;

const [highlightIndex, setHighlightIndex] = useState(null);
const words = ["Social", "Network", "States", "SN", "NS"];

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
    border-radius: 12px;
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

return (
  <Wrapper>
    <H1>
      <span>
        Build
        <svg viewBox="0 0 25 23" fill="none" aria-hidden="true"></svg>
      </span>
      Commons
    </H1>
    <div
      className="mt-3"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Word
        highlight={highlightIndex === 0 || highlightIndex === 3}
        onMouseEnter={() => setHighlightIndex(0)}
        onMouseLeave={() => setHighlightIndex(-1)}
      >
        Social
      </Word>
      <Space
        onMouseEnter={() => setHighlightIndex(3)}
        onMouseLeave={() => setHighlightIndex(-1)}
      />
      <Word
        highlight={
          highlightIndex === 1 || highlightIndex === 3 || highlightIndex === 4
        }
        onMouseEnter={() => setHighlightIndex(1)}
        onMouseLeave={() => setHighlightIndex(-1)}
      >
        Network
      </Word>
      <Space
        onMouseEnter={() => setHighlightIndex(4)}
        onMouseLeave={() => setHighlightIndex(-1)}
      />
      <Word
        highlight={highlightIndex === 2 || highlightIndex === 4}
        onMouseEnter={() => setHighlightIndex(2)}
        onMouseLeave={() => setHighlightIndex(-1)}
      >
        States
      </Word>
    </div>
    <Widget
      src="buildcommons.near/widget/SocialGraph"
      props={{ height: 333 }}
    />
    <div>
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
  </Wrapper>
);
