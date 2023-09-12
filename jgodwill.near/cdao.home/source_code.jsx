const Main = styled.div`
    background-color: #f5f5f5;
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    color: #333;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    .section{
    display: flex;
    align-items: center;
    padding: 1.5rem;
}
a{
  color: unset;
}

.hero{
    background-size: cover;
    background-position: center;
    width: 100%;
    position: relative;
    background: #00d8c9;
    background: linear-gradient(226deg,#00d8c9 0%, #122a58 100%);
    background: -webkit-linear-gradient(226deg,#00d8c9 0%, #122a58 100%);
    background: -moz-linear-gradient(226deg,#00d8c9 0%, #122a58 100%);
    color: #fff;
    align-content: center;
    margin: 0 auto;
}
.heroRight{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.heroLeft{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

`;
return (
  <Main>
    <div class="section hero">
      <div class="heroLeft">
        <h1 class="heroTitle">
          Discover, collect, and sell <span class="colored">Timeless</span> NFTs
        </h1>
        <p class="heroBody">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet,
          quidem asperiores. Quia, amet? Dignissimos officia recusandae, magni
          omnis dolor error autem, voluptatum ut tempore accusantium doloribus
          temporibus molestiae illo id.
        </p>
        <div class="heroCTA">
          <a href="#" class="button">
            Join
          </a>
          <a href="#" class="button sec">
            Create
          </a>
        </div>
        {/*stats if necessary */}
        <div class="stats">
          <div class="stat">
            <div class="statTitle"></div>
            <div class="statBody"></div>
          </div>
        </div>
      </div>
      <div class="heroRight">
        <img src="" alt="" />
        {/*Custom artwork placed on Bid */}
        <div class="artCard">
          <div class="artLHS">
            <div class="artTitle">
              <div class="artName"></div>
              <div class="artCreator"></div>
            </div>
            <div class="artBody"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="section create">
      <h2 class="sectionTitle">Create</h2>
      <div class="createCards">
        <a href="#" class="card">
          <div class="cardTitle">DAO</div>
          <div class="cardBody">Create your own DAO</div>
        </a>
        <a href="#" class="card">
          <div class="cardTitle">Artist Page</div>
          <div class="cardBody">Become an artist on Creative DAO</div>
        </a>
        <a href="#" class="card">
          <div class="cardTitle">NFT</div>
          <div class="cardBody">Create an NFT</div>
        </a>
      </div>
    </div>
    <div class="section create">
      <h2 class="sectionTitle">CDAO</h2>
      {/*funds flow */}
    </div>
    <div class="section create">
      <h2 class="sectionTitle">Case Studies</h2>
      {/*Show 3 posts, with a see all CTA that goes to explore posts */}
    </div>
    <div class="section create">
      <h2 class="sectionTitle">Featured NFTs</h2>
      {/*show featured NFTs. Show More CTA */}
    </div>
    <div class="section create">
      <h2 class="sectionTitle">Checkout our Communities</h2>
      {/*Pages from DAO. Pin top 3 Featured communities. show more CTA */}
    </div>
    <div class="section create">
      <h2 class="sectionTitle">Partners</h2>
      {/*working with NDC, Near Foundation, Minority Programmers */}
    </div>
    <div class="section create">
      <h2 class="sectionTitle">CDAO Community Calendar</h2>
      {/*CDAO Community Calendar */}
    </div>
  </Main>
);
