const Main = styled.div`
*{
    box-sizing: inherit;
    text-decoration: none;
    list-style: none;
    margin: 0;
    padding: 0;
    color: unset;
    font-family: 'Playfair Display';
}
.section{
    display: flex;
    align-items: center;
    padding: 1.5rem 5rem;
}

.hero{
    width: 100%;
    position: relative;
    /* background: #00d8c9; */
    background: #000000;
    background: linear-gradient(63deg,#000000 0%, #b38b08 50%, #ffc501 100%);
    background: -webkit-linear-gradient(63deg,#000000 0%, #b38b08 50%, #ffc501 100%);
    background: -moz-linear-gradient(63deg,#000000 0%, #b38b08 50%, #ffc501 100%);
    color: #fff;
    align-content: center;
    margin: 0 auto;
    padding: 2rem inherit;
    height: 100vh;
}
.heroRight{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
}
.heroLeft{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem 0px;
}

.heroTitle{
    font-size: max(1.5rem, 5vw);
    font-weight: 700;
    line-height: 1.0;
    margin-bottom: 1rem;
}

.heroBody{
    opacity: .6;
}

.heroCTA, .artCTA{
    margin-top: 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 100%;
}

.button{
    padding: .5rem 1rem;
    border-radius: 5px;
    background-color: #fff;
    color: #122a58;
    font-size: 1.2rem;
    transition: all .3s ease-in-out;
    border: 1px solid #ffc501;
}

.heroCTA a:hover{
    background-color: #000;
    color: #fff;
}
.button.sec{
    background: transparent;
    color: #ffc501;
    border: none;
}
.stats{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-top: 1rem;
    padding: 1rem 0px;
}
.stat{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: .5rem;
    padding: 0px 1rem;
    text-align: center;
    border-right: 1px solid #ffc501;
}

.stat:last-child{
    border-right: none;
}

.statTitle{
    font-size: 2.6rem;
    font-weight: 700;
    line-height: 1.0;
}

.statBody{
    font-size: .8rem;
    line-height: 1.0;
  text-align: center;
  line-height: 24px;
  opacity: .5;
}
.featuredArt{
    width: 40vw;
    max-width: 500px;
    height: 100%;
    /* border-top-left-radius: 50px; */
    /* box shadow */
    box-shadow: 0px 0px 20px rgba(0,0,0,.5);
    clip-path: polygon(30% 16%, 84% 16%, 84% 100%, 16% 100%, 16% 28%);
    border-radius: .5rem;
}

.artCard{
    /* tranluscent card */
    border-radius: .5rem;
    padding: 2rem;
    margin: 1rem;
    /* box shadow */
    box-shadow: 0 15px 25px rgba(129, 124, 124, 0.2);
    /* make it glass like */
    /* background-color: rgba(255,255,255,.2); */
    /* backdrop-filter: blur(15px); */
    /* -webkit-backdrop-filter: blur(15px); */
    position: absolute;
    bottom: -60px;
    right: -3vw;
    width: 80%;
    max-width: 400px;
    height: 170px;
    /* z-index: 1; */
    /* glasslike more visible border */
    border: 1px solid rgba(255,255,255,.5);
    clip-path: polygon(26% 16%, 84% 16%, 84% 100%, 16% 100%, 16% 36%);
    color: #ffc501;
    padding-left:16%;
}

.featured{
    position: relative;
    width: fit-content;
}

.blurredBG, .artCard{
    background: rgba(255,255,255,.2);
}

.blurredBG>.blurbg{
    background-color: #000000dc;
    width: 100%;
    height: 100%;
}

.blurredBG{
    -webkit-filter: blur(14px);
    filter: blur(14px);
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-size: cover;
}
.cardContent{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    text-align: center;
    position: absolute;
    z-index: 1;
    color: #ffc501 !important;
}
.artName{
    font-size: .9rem;
    font-weight: 700;
    line-height: 1.0;
}
`;
return (
  <Main>
    <div class="section hero">
      <div class="heroLeft">
        <h1 class="heroTitle">We are the global community for creatives</h1>
        <p class="heroBody">
          With CreativesDAO, artists have the freedom to express themselves and
          create impactful projects that promote decentralization and
          sustainability, spreading the blockchain gospel.
        </p>
        <div class="heroCTA">
          <a href="#" class="button">
            Join Us
          </a>
          <a
            href="https://www.creativesdao.org/funding"
            class="button sec"
            target="_blank"
          >
            Apply for funding
          </a>
        </div>
        {/*stats if necessary */}
        <div class="stats">
          <div class="stat">
            <h3 class="statTitle">50k</h3>
            <span class="statBody">NFTs minted</span>
          </div>
          <div class="stat">
            <h3 class="statTitle">24+</h3>
            <span class="statBody">
              Countries With active creative communities
            </span>
          </div>
          <div class="stat">
            <h3 class="statTitle">70+</h3>
            <span class="statBody">
              DAOs Associated with Creatives DAO (50% of active DAOS on NEAR)
            </span>
          </div>
        </div>
      </div>
      <div class="heroRight">
        <img class="featuredArt" src="./image.png" alt="image used" />
        {/*Custom artwork placed on Bid */}
        <div class="artCard">
          <div class="blurredBG">
            <div class="blurbg"></div>
          </div>
          <div class="cardContent">
            <div class="artLHS">
              <div class="artTitle">
                <div class="artName">CyberPunk retouch</div>
                <div class="artCreator"></div>
              </div>
              <div class="artBody"></div>
            </div>
            <div class="artRHS">
              <div class="artPrice"></div>
            </div>
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
