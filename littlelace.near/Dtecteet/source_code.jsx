/*This is for the screen design*/

/*This fetches the google poppins, Monteserrat, and Orbitron fonts*/
const font = fetch(
  "https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Montserrat+Alternates:wght@400;600;800&family=Orbitron:wght@400;600&family=Poppins:wght@100;200;700&display=swap"
).body;

/*This checks wether the google font is returned, if not, it returns null*/
if (!font) {
  return null;
}

/*Configuration for getting the urls of widgets*/
const getConfig = (network) => {
  switch (network) {
    case "mainnet":
      return {
        app: "https://sourcescan.2bb.dev",
        ownerId: "sourcescan.near",
        rpcUrl: "https://rpc.mainnet.near.org",
        contractId: "sourcescan.near",
        apiHost: "https://sourcescan-api.2bb.dev",
      };
    case "testnet":
      return {
        app: "https://sourcescan.testnet.2bb.dev",
        ownerId: "sourcescan.testnet",
        rpcUrl: "https://rpc.testnet.near.org",
        contractId: "sourcescan.testnet",
        apiHost: "https://sourcescan-api.2bb.dev",
      };
    default:
      throw Error(`Unconfigured environment '${network}'.`);
  }
};

State.init({
  //   theme: Storage.privateGet("theme") || "light",
  //   from_index: 0,
  //   limit: limits[0],
  //   contracts: null,
  //   pages: 1,
  //   selectedPage: 1,
  //   search: "",
  config: getConfig(context.networkId),
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
  background-color: #fff;
  overflow-y: auto;
  height: 100vh;
  padding-bottom: 80px;
  background-image: url('https://ipfs.near.social/ipfs/bafkreiggn4gswp3blqvibdtxl5wyvbpky2oj2nxdwlg5q4cbiflsw7trxa');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;

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
const About = styled.p`
color: rgba(0, 0, 0, 0.74);
text-align: center;
font-family: Poppins, 'sans-serif';
font-size: 20px;
font-style: normal;
font-weight: 500;
line-height: 211.496%; /* 42.299px */
padding: 10px 20%;
  @media only screen and (max-width: 750px) {
    font-size: 12px;
    padding: 5px 10%;
  }
`;

return (
  <Globalstyle>
    <Main>
      <div></div>
      <Maincontent>
        <Section2>
          <About>
            Welcome to Dtecteet. It is your one-stop tool solution to check for
            your NEAR component API type, ranging from NEAR API JS, Ethers.js
            and External API. Our tool provides you with advanced and
            user-friendly component API detection.
          </About>
        </Section2>
      </Maincontent>
    </Main>
  </Globalstyle>
);

// <Section1>
//   <Widget />

//   <Widget />
// </Section1>
