State.init({
  theme: props.theme || {
    name: "light",
    bg: "#e3e8ef",
    color: "#4c5566",
    border: "#748094",
    hover: {
      bg: "#eef2f6",
    },
  },
});

/*Here is the global font style to be used */
const Globalstyle = styled.div`
*{
  margin:0;
  padding:0;
  box-sizing: border-box;
  font-family: Poppins, 'sans-serif';
}.body;
`;

/*This section handles the screen size respinsiveness at maximum of 750px (Mobile first design) */
const Main = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${state.theme.bg};
  overflow-y: auto;
  padding-bottom: 80px;

  @media only screen and (max-width: 750px) {
    padding-bottom: 160px;

  }
`;

const Maincontent = styled.div`
  width: 100%;
`;

const Section1 = styled.div`
  width: 100%;
`;

const Section2 = styled.div`
  width: 100%;
`;
const Resultdiv = styled.div`
display: flex;
align-items: flex-start;
justify-content: center;
width: 100vw;
color: ${state.theme.color};
text-align: left;
font-family: Poppins, 'sans-serif';
font-size: 20px;
font-style: normal;
font-weight: 500;
line-height: 211.496%; /* 42.299px */
padding: 10px 20%;
    .resultWrapper{
        width: 45%; 
        flex-shrink: 0;
        border-radius: 10px;
        padding: 15px;
        margin-right: 20px;
    }
    .result{
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 30px;
        width: 100%;
        height: auto;
        flex-shrink: 0;
        border-radius: 10px;
        background: ${state.theme.bg};
        border: 1px solid ${state.theme.border};
    }
    .list-result {
        width: 100%;
    }
    .list-result p{
        font-size: 13px;
        // word-wrap: break-word;
        margin: 10px 0;
    }
    .list{
        background: ${state.theme.bg};
        border: 1px solid ${state.theme.border};
        width: auto;
        border-radius: 5px;
        padding: 4px;
        text-align: center;
        font-size: 12px;

    }
  @media only screen and (max-width: 750px) {
    font-size: 12px;
    padding: 5px 10%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .resultWrapper{
        width: 90%; 
    }

    .result{
        width: auto;
        height: auto;
        flex-shrink: 0;
        border-radius: 10px;
    }

  }
`;

const near = props.near;
const ether = props.ether;
const external = props.external;

return (
  <>
    {near || ether || external ? (
      <Globalstyle>
        <Main>
          <Widget />
          <Maincontent>
            <Section1></Section1>

            <Section2>
              <Resultdiv>
                <div className="resultWrapper">
                  <h3>NEAR APIs</h3>
                  <div className="result">
                    <div className="list-result">
                      {near
                        ? Object.entries(near).map(([url, apis]) => (
                            <div>
                              <p>{url}</p>
                              {apis.map((api) => (
                                <span className="list">{api}</span>
                              ))}
                            </div>
                          ))
                        : "No Near APIs found"}
                    </div>
                  </div>
                </div>
                <div className="resultWrapper">
                  <h3>Etherjs APIs</h3>
                  <div className="result">
                    <div className="list-result">
                      {ether
                        ? Object.entries(ether).map(([url, apis]) => (
                            <div>
                              <p>{url}</p>
                              {apis.map((api) => (
                                <span className="list">{api}</span>
                              ))}
                            </div>
                          ))
                        : "No Etherjs APIs found"}
                    </div>
                  </div>
                </div>
                <div className="resultWrapper">
                  <h3>External APIs</h3>
                  <div className="result">
                    <div className="list-result">
                      {external
                        ? Object.entries(external).map(([url, apis]) => (
                            <div>
                              <p>{url}</p>
                              {apis.map((api) => (
                                <span className="list">{api}</span>
                              ))}
                            </div>
                          ))
                        : "No External APIs found"}
                    </div>
                  </div>
                </div>
              </Resultdiv>
            </Section2>
          </Maincontent>
        </Main>
      </Globalstyle>
    ) : (
      ""
    )}
  </>
);
