const [accountId, setAccountId] = useState(null);
const [attestorId, setAttestorId] = useState(context.accountId || "every.near");

const [highlightIndex, setHighlightIndex] = useState(null);
const words = ["Social", "Network", "States", "SN", "NS"];

const [activeContent, setActiveContent] = useState(null);
const [activeWord, setActiveWord] = useState(null);

const contentMap = {
  social: (
    <div>
      <Widget src="buildcommons.near/widget/profile.builder" />
    </div>
  ),
  network: (
    <div>
      <Widget src="hack.near/widget/commons.builders" />
    </div>
  ),
  states: (
    <div>
      <Widget src="hack.near/widget/commons" />
    </div>
  ),
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 19px;
  margin: auto;
  background: #fff;
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
    border-radius: 12px;
    position: relative;
    padding: 0.2em 0.3em 0.1em;
    margin: 0.1em;
    text-align: center;

    svg {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 50px;
      height: auto;
    }
  }

  @media (max-width: 900px) {
    font-size: 39px;

    span {
      border-radius: 12px;

      svg {
        width: 18px;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
`;

const Word = styled.span`
  font-family: "Courier", sans-serif;
  font-size: 23px;
  font-style: bold;
  font-weight: 555;
  color: #212428;
  padding: 0.2em 0.6em;
  display: inline-block;
  background-color: ${(props) => (props.highlight ? "#EDFF00" : "transparent")};
  border-radius: 8px;
  transition: background-color 0.3s;
  cursor: pointer;

    @media (max-width: 900px) {
    font-size: 18px;

    span {
      border-radius: 5px;
    }
  }
`;

const Space = styled.span`
  width: 19px;
  height: 30px;
  display: inline-block;
  cursor: pointer;
`;

const handleWordClick = (word) => {
  setActiveWord(word);
  setActiveContent(contentMap[word]);
  setAccountId(null);
};

const handleSpaceClick = (newAccountId) => {
  setAccountId(newAccountId);
  setActiveContent(null);
  setActiveWord(null);
};

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
      className="mt-3 align-items-center"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Word
        highlight={
          highlightIndex === 0 ||
          highlightIndex === 3 ||
          activeWord === "social" ||
          accountId === context.accountId
        }
        onMouseEnter={() => setHighlightIndex(0)}
        onMouseLeave={() => setHighlightIndex(-1)}
        onClick={() => handleWordClick("social")}
      >
        Social
      </Word>
      <Space
        onMouseEnter={() => setHighlightIndex(3)}
        onMouseLeave={() => setHighlightIndex(-1)}
        onClick={() => handleSpaceClick(context.accountId || "hack.near")}
      />
      <Word
        highlight={
          highlightIndex === 1 ||
          highlightIndex === 3 ||
          highlightIndex === 4 ||
          activeWord === "network" ||
          accountId === "buildcommons.near" ||
          accountId === context.accountId
        }
        onMouseEnter={() => setHighlightIndex(1)}
        onMouseLeave={() => setHighlightIndex(-1)}
        onClick={() => handleWordClick("network")}
      >
        Network
      </Word>
      <Space
        onMouseEnter={() => setHighlightIndex(4)}
        onMouseLeave={() => setHighlightIndex(-1)}
        onClick={() => handleSpaceClick("buildcommons.near")}
      />
      <Word
        highlight={
          highlightIndex === 2 ||
          highlightIndex === 4 ||
          activeWord === "states" ||
          accountId === "buildcommons.near"
        }
        onMouseEnter={() => setHighlightIndex(2)}
        onMouseLeave={() => setHighlightIndex(-1)}
        onClick={() => handleWordClick("states")}
      >
        States
      </Word>
    </div>
    {activeWord ? (
      contentMap[activeWord]
    ) : (
      <>
        {!context.loading && (
          <Widget
            key={accountId}
            src="buildcommons.near/widget/SocialGraph"
            props={{
              accountIds: [`${accountId || "buildcommons.near"}`],
              height: 300,
            }}
          />
        )}
        {!context.loading && (
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
                      attestorId,
                      accountId,
                      defaultBuilder,
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
        )}
      </>
    )}
  </Wrapper>
);
