const Header = styled.div`
height: 2rem;
display: flex;
justify-content: center;

align-items: center;
p{
    margin: 0;
}
`;

const Main = styled.div`
display:flex;
justify-content:space-between

.nft{
    display: grid;
}
`;

const Footer = styled.div`
display: flex;
height: 1rem;
bottom: 0;
background-color: red;
`;

const header = (
  <Header>
    <p>NFT Poll</p>
  </Header>
);

const maincontent = (
  <Main>
    <div class="nft">
      <img src="https://crushingit.tech/hackathon-assets/product.png" />
      <button>Vote</button>
    </div>
    <div class="nft">
      <img src="https://crushingit.tech/hackathon-assets/product.png" />
      <button>Vote</button>
    </div>
    <div class="nft">
      <img src="https://crushingit.tech/hackathon-assets/product.png" />
      <button>Vote</button>
    </div>
    <Web3Connect />
  </Main>
);

const footer = (
  <Footer>
    <p>NFT Voting Poll</p>
  </Footer>
);

return (
  <div>
    {header} {maincontent}
  </div>
);
