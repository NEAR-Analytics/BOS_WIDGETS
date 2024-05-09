let accountId = context.accountId;
if (!accountId) {
  return "Please sign in with NEAR wallet";
}

const Container = styled.div`
  display: flex;
  height: 100vh;
  background-color: lightblack;
`;

const SideBar = styled.div`
  flex: 0 0 33.33%;
  background-color: #333;
  color: white;
  padding: 20px;
  height: 300vh;
`;

const Main = styled.div`
  flex: 1;
  padding: 20px;
`;

const Overview = styled.div`

`;

return (
  <Container>
    <SideBar>
      <h2>BOS Components</h2>
      <a href="#Overview">
        <p>Overview</p>
      </a>
      <a href="#Gateways">
        <p>GateWays</p>
      </a>
      <a href="#BuiltIn">
        <p>Built In Components</p>
      </a>
      <a href="Components">
        <p>Components API</p>
      </a>
      <a href="Examples">
        <p>Examples and Tutorials</p>
      </a>
    </SideBar>
    <Main>
      <Overview id="Overview">
        <h3>Menene Block Chain Operating System</h3>
        <p>
          Shi dai Blockchain Operating System (BOS) abu nai da yake saukaka
          deploying din Web3 front-ends. Baka bukatar kayi dogon coding, ko kuma
          ka dade kana yin deploying. BOS yazo da masalaha ga maginan yanar
          gizo-gizo watau (developers). domin saukaka ayyukansu
        </p>
        <img
          src={`https://docs.near.org/assets/images/bos-landing-d8a5a74560a2afe31ae01e87c0303106.png`}
          alt="uploaded image"
          width="100%"
          height="100%"
        />
        <h3>Meyasa Zakayi Amfani da BOS?</h3>
        <p>
          BOS ana amfanin dashi sosai wajen ginan ginan yanar gizon web3, inda
          su maginan watau developers zasu sami kwarewa and kuma gano wasu
          abubuwan a cikin BOS . BOS ya bada kariya ga sosai ga abubuwan da suke
          kansa, ga shi da sauki wajen yin deploying.
        </p>
        <h3>Shika Shikan BOS</h3>
        <p>BOS yana tafiya nai akan shika shika ka guda uku</p>
        <ul>
          <li>Components</li>
          <li>BlockChain</li>
          <li>Gateways</li>
        </ul>
        <h3>Components</h3>
        <p>
          Shi Components misali dauki kamar ace maginan gida, akwai gida mai
          roofin gota, wani mai roofin chinese roof, wani kuma dorun zabuwa. To
          idan nace inaso maigini yayi mun gini mai gota, to shi mai gini
          maimakon ya ginin mun sabon gini tun daga foundation,sai kawai ya
          daukou wanin gini mai gota yayin yan change change. To dauki ka dauki
          ginin a matsayin Components, Component yana nufin ginin da daman akwai
          shi kawai dauka zaayi sai a masa gyrai gyrai a tada sabon gida.
        </p>
        <h3>BlockChain</h3>
        <p>
          Shi blockchain da ake ta magana ake dauki misali kamar ace asusu, idan
          kana ajiya acikin asusu kai bazaka kaga abun da ajiye ba, kuma wani
          bazai gani ba, sannan idan ka boye asusun ka babu wanda ya isan yasan
          idan ka ajiye shi ballanta ya sace. to shima BlockChain kamar haka
          yake babu wanda ya isa ya taba ma abun ka ajiye a cikin, amma shi
          blockhain ana iya ganin yawan abun da ka ajiye a cikinsa. Misalin
          asusun block sunai irin su Near protocols, Ethereum, polygons da
          sauransu.
        </p>
        <h3>GateWays</h3>
        <p>
          Shi BOS kawai asusun blockchain din Near prototal yake dauka, amma da
          GateWays zaka yin ajiya acikin deploying acikin kowanne irin asusu.
          Misali gateways sunai irin su <a href="near.org">near.org</a>,{" "}
          <a href="bos.gg">bos.gg</a>,
        </p>
      </Overview>
    </Main>
  </Container>
);
