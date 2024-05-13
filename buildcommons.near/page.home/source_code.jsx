const accountId = context.accountId ?? "buildcommons.near";
const [highlightIndex, setHighlightIndex] = useState(null);
const words = ["Social", "Network", "States", "SN", "NS"];
const [activeWord, setActiveWord] = useState(null);
const [activeContent, setActiveContent] = useState(null);
const contentMap = {
  Social: (
    <Widget
      key={accountId}
      src="hack.near/widget/SocialGraph"
      props={{
        accountId,
        height: 325,
      }}
    />
  ),
  Network: (
    <div className="m-3 mt-4">
      <Widget src="hack.near/widget/commons" />
    </div>
  ),
  States: (
    <a
      href="https://blocklive.io/event/network-states-atx"
      className="m-3 mt-4 mb-2"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <img
        style={{ width: "80%" }}
        src="https://builders.mypinata.cloud/ipfs/QmWjSibAaevGqVgYMaT1eSYtopEkYgd5XJVqnSwfTEXqCQ"
        alt="Building Network States"
      />
    </a>
  ),
  SN: (
    <Widget
      key={accountId}
      src="hack.near/widget/SocialGraph"
      props={{
        accountId,
        height: 325,
      }}
    />
  ),
  NS: (
    <Widget
      src="hack.near/widget/SocialGraph"
      props={{
        accountId: "buildcommons.near",
        height: 325,
      }}
    />
  ),
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 12px;
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
    background: #edff00;
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
const LeftWord = styled.span`
  font-family: "Courier", sans-serif;
  font-size: 23px;
  font-style: bold;
  font-weight: 555;
  color: #212428;
  padding: 0.2em 0.6em;
  display: inline-block;
  height: 42px;
  background-color: ${(props) => (props.highlight ? "#EDFF00" : "transparent")};
  border-radius: ${() => {
    if (activeWord === "SN") {
      return "8px 0 0 8px";
    } else if (activeWord === "NS") {
      return "8px";
    } else {
      return "8px";
    }
  }};
  transition: background-color 0.3s;
  cursor: pointer;
  @media (max-width: 900px) {
    font-size: 18px;
    span {
      border-radius: 5px;
    }
  }
`;
const MiddleWord = styled.span`
  font-family: "Courier", sans-serif;
  font-size: 23px;
  font-style: bold;
  font-weight: 555;
  color: #212428;
  padding: 0.2em 0.6em;
  height: 42px;
  display: inline-block;
  background-color: ${(props) => (props.highlight ? "#EDFF00" : "transparent")};
  border-radius: ${() => {
    if (activeWord === "SN") {
      return "0 8px 8px 0";
    } else if (activeWord === "NS") {
      return "8px 0 0 8px";
    } else {
      return "8px";
    }
  }};
  transition: background-color 0.3s;
  cursor: pointer;
  @media (max-width: 900px) {
    font-size: 18px;
    span {
      border-radius: 5px;
    }
  }
`;
const RightWord = styled.span`
  font-family: "Courier", sans-serif;
  font-size: 23px;
  font-style: bold;
  font-weight: 555;
  color: #212428;
  padding: 0.2em 0.6em;
  height: 42px;
  display: inline-block;
  background-color: ${(props) => (props.highlight ? "#EDFF00" : "transparent")};
  border-radius: ${() => {
    if (activeWord === "SN") {
      return "8px";
    } else if (activeWord === "NS") {
      return "0 8px 8px 0";
    } else {
      return "8px";
    }
  }};
  transition: background-color 0.3s;
  cursor: pointer;
  @media (max-width: 900px) {
    font-size: 18px;
    span {
      border-radius: 5px;
    }
  }
`;
const FirstSpace = styled.span`
  width: 19px;
  height: 42px;
  padding: 0.3em 0.7em;
  border: #edff00;
  background-color: ${(props) => (props.highlight ? "#EDFF00" : "transparent")};
  display: inline-block;
  cursor: pointer;
`;
const SecondSpace = styled.span`
  width: 19px;
  height: 42px;
  padding: 0.3em 0.7em;
  border: #edff00;
  background-color: ${(props) => (props.highlight ? "#EDFF00" : "transparent")};
  display: inline-block;
  cursor: pointer;
`;
const handleClick = (word) => {
  if (activeWord === word) {
    setActiveWord(null);
    setActiveContent(null);
  } else {
    setActiveWord(word);
    setActiveContent(contentMap[word]);
  }
};
return (
  <Wrapper>
    <H1>
      <a
        style={{ textDecoration: "none", color: "#212428" }}
        href="https://commons.build"
      >
        <span>
          Build
          <svg viewBox="0 0 25 23" fill="none" aria-hidden="true"></svg>
        </span>
      </a>
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
      <LeftWord
        highlight={
          highlightIndex === 0 ||
          highlightIndex === 3 ||
          activeWord === "Social" ||
          activeWord === "SN"
        }
        onMouseEnter={() => setHighlightIndex(0)}
        onMouseLeave={() => setHighlightIndex(-1)}
        onClick={() => handleClick("Social")}
      >
        Social
      </LeftWord>
      <FirstSpace
        highlight={activeWord === "SN"}
        onMouseEnter={() => setHighlightIndex(3)}
        onMouseLeave={() => setHighlightIndex(-1)}
        onClick={() => handleClick("SN")}
      />
      <MiddleWord
        highlight={
          highlightIndex === 1 ||
          highlightIndex === 3 ||
          highlightIndex === 4 ||
          activeWord === "Network" ||
          activeWord === "SN" ||
          activeWord === "NS"
        }
        onMouseEnter={() => setHighlightIndex(1)}
        onMouseLeave={() => setHighlightIndex(-1)}
        onClick={() => handleClick("Network")}
      >
        Network
      </MiddleWord>
      <SecondSpace
        highlight={activeWord === "NS"}
        onMouseEnter={() => setHighlightIndex(4)}
        onMouseLeave={() => setHighlightIndex(-1)}
        onClick={() => handleClick("NS")}
      />
      <RightWord
        highlight={
          highlightIndex === 2 ||
          highlightIndex === 4 ||
          activeWord === "States" ||
          activeWord === "NS"
        }
        onMouseEnter={() => setHighlightIndex(2)}
        onMouseLeave={() => setHighlightIndex(-1)}
        onClick={() => handleClick("States")}
      >
        States
      </RightWord>
    </div>
    {activeContent ? (
      activeContent
    ) : (
      <>
        <a
          href="https://blocklive.io/event/network-states-atx"
          className="m-3 mt-4 mb-2"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <img
            style={{ width: "80%" }}
            src="https://builders.mypinata.cloud/ipfs/QmY7ax5UNKnbZr2mBZdKQExfgWF9hNQHDhPtZ4x6cZVvAv"
            alt="build_austin"
          />
        </a>
      </>
    )}
  </Wrapper>
);
