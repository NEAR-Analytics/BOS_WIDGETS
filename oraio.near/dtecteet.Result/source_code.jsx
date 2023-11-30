/*This is for the screen design*/

/*This fetches the google poppins, Monteserrat, and Orbitron fonts*/
const font = fetch(
  "https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Montserrat+Alternates:wght@400;600;800&family=Orbitron:wght@400;600&family=Poppins:wght@100;200;700&display=swap"
).body;

/*This checks wether the google font is returned, if not, it returns null*/
if (!font) {
  return null;
}

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
  background-color: #fff;
  overflow-y: auto;
  height: 100vh;
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
  height: auto;
`;

const Section2 = styled.div`
  width: 100%;
  height: auto;
`;
const Resultdiv = styled.div`
display: flex;
align-items: flex-start;
justify-content: center;
width: 100vw;
color: rgba(0, 0, 0, 0.74);
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
        background: rgb(255,255,255);
        border: 3px solid rgb(246,246,246);
    }
    .list-result {
        width: 100%;
    }
    .list-result p{
        font-size: 13px;
        word-wrap: break-word;
        margin: 10px 0;
    }
    .list{
        background: rgb(248,249,250);
        border: 1px solid #000;
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
                    ? Object.entries(ether).map(([url, apis]) => (
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
                  {near
                    ? Object.entries(near).map(([url, apis]) => (
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
                  {near
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
);
