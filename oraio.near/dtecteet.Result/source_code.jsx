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

const Section2 = styled.div`
  width: 100%;
  
`;
const Resultdiv = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: center;
    gap: 20px;
    width: 100%;
    color: ${state.theme.color};
    text-align: left;
    font-family: Poppins, 'sans-serif';
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    padding: 10px 0;
    
    .resultWrapper{
        // border: 2px solid ${state.theme.border};
        flex: 1;
        border-radius: 10px;
        padding: 15px;
    }
    
    .result{
        width: 100%;
        margin-top: 10px;
        border-radius: 10px;
        background: ${state.theme.bg};
        border: 1px solid ${state.theme.border};
    }
    
    .list-result {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 10px;
        padding: 8px;
        width: 100%;
        margin-bottom: 10px;

    }
    .list-result p{
        font-size: 13px;
        word-wrap: break-word;
    }
    
    .list-result > div{
        border: 0.5px dashed ${state.theme.border};
        padding: 8px;

    }
    .list-result div div{
        display: flex;
        flex-wrap: wrap;
        gap: 2px;
    }

   
    .list-result div div span{
        display: inline-flex;
        padding: 5px;
    }
    .list{
        background: ${state.theme.bg};
        border: 1px solid ${state.theme.border};
        width: auto;
        border-radius: 5px;
        padding: 2px;
        text-align: center;
        font-size: 12px;

    }
    
  @media only screen and (max-width: 1000px) {
    padding: 5px 10%;
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
  
  @media only screen and (max-width: 750px) {
    font-size: 12px;
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
          <Section2>
            <Resultdiv>
              <div className="resultWrapper">
                <h3>NEAR APIs</h3>
                <div className="result">
                  <div className="list-result">
                    {Object.keys(near).length ? (
                      Object.entries(near).map(([url, apis]) => (
                        <div>
                          <p>{url}</p>
                          <div>
                            {[...new Set(apis)].map((api) => (
                              <span className="list">{api}</span>
                            ))}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div>No Near APIs found</div>
                    )}
                  </div>
                </div>
              </div>
              <div className="resultWrapper">
                <h3>Etherjs APIs</h3>
                <div className="result">
                  <div className="list-result">
                    {Object.keys(ether).length ? (
                      Object.entries(ether).map(([url, apis]) => (
                        <div>
                          <p>{url}</p>
                          <div>
                            {[...new Set(apis)].map((api) => (
                              <span className="list">{api}</span>
                            ))}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div>No Etherjs APIs found</div>
                    )}
                  </div>
                </div>
              </div>
              <div className="resultWrapper">
                <h3>External APIs</h3>
                <div className="result">
                  <div className="list-result">
                    {Object.keys(external).length ? (
                      Object.entries(external).map(([url, apis]) => (
                        <div>
                          <p>{url}</p>
                          <div>
                            {[...new Set(apis)].map((api) => (
                              <span className="list">{api}</span>
                            ))}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div>No External APIs found</div>
                    )}
                  </div>
                </div>
              </div>
            </Resultdiv>
          </Section2>
        </Main>
      </Globalstyle>
    ) : (
      ""
    )}
  </>
);
