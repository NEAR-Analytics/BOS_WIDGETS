const Root = styled.div`

`;

const Prices = styled.div`
    background: #00EC97;
    padding: 50px;
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: flex-start;
    flex-wrap: wrap;
    width: 100%;
    gap: 30px;
    h1 {
        color: var(--nearcon-app-black, #000);
        font-family: Inter;
        font-size: 25.289px;
        font-style: normal;
        font-weight: 500;
        line-height: 39px; /* 154.217% */
    }
    span {
        color: var(--nearcon-app-mirage, #1A202C);
        font-family: Inter;
        font-size: 15.5px;
        font-style: normal;
        font-weight: 400;
        line-height: 24px; /* 154.839% */
    }
    p {
        color: var(--nearcon-app-mirage, #1A202C);
        font-family: Segoe UI;
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        line-height: 24px; /* 150% */
        margin-bottom: 26px;
    }
    .right {
        width: 35%;
    }
    .left {
        width: 60%;
        display: flex;
        gap: 20px;
    }
    @media (max-width: 900px) {
      .right, .left {
        width: 100%;
      }
      .left {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
      }
    }
`;

const ForWho = styled.div`
    background: black;
    padding: 56px;
    h1 {
        color: var(--nearcon-app-nero, #FFF);
        font-family: Segoe UI;
        font-size: 32px;
        font-style: normal;
        font-weight: 600;
        line-height: 39px; /* 121.875% */
    }
    p {
        color: var(--nearcon-app-spring-green, #00EC97);
        margin-top: 15px;
        font-family: Inter;
        font-size: 19.531px;
        font-style: normal;
        font-weight: 700;
        line-height: 26px; /* 133.12% */
        text-transform: capitalize;
    }
    span {
        color: var(--nearcon-app-nero, #FFF);
        font-family: Inter;
        font-size: 13.672px;
        font-style: normal;
        font-weight: 500;
        line-height: 23.8px; /* 174.08% */
    }
`;

return (
  <Root>
    <Prices>
      <div className="right">
        <h1>Community</h1>
        <span>
          Kickstart your journey within the NEAR Ecosystem and access to our
          official telegram group. Become a valued member of a thriving
          community, consisting of developers and creators…Just like you.
        </span>
        <p>
          Join the official telegram channel, and drop into the spirit before
          the event.
        </p>
      </div>
      <div className="left">
        <img src="https://ipfs.near.social/ipfs/bafkreihyhtspk7hhvxj2jqyqtkaact3ynes23dbhle3jkxmy2wthfc6p4e" />
        <img src="https://ipfs.near.social/ipfs/bafkreiaxmtimsgitqwsrmt3jvpoa2y44u7pt5kg7xfbzyy5misnpp5v5ey" />
        <img src="https://ipfs.near.social/ipfs/bafkreib445zbn3jgjogopg35ddzh27znvlvrd3zag7mq7aajgzcgqtgw6q" />
      </div>
    </Prices>
    <ForWho>
      <div className="leftImage"></div>
      <div className="rightSec">
        <h1>Who is the Hackathon for?</h1>
        <p>Developer</p>
        <span>
          NEAR is constantly pushing boundaries, so are our speakers. Hear from
          leading voices about the BOS, AI, the future of Web3, why an open web
          matters, user-experience, governance, sustainability, NFTs, DeFI,
          gaming, and much more.
        </span>
        <p>Designer</p>
        <span>
          NEAR is constantly pushing boundaries, so are our speakers. Hear from
          leading voices about the BOS, AI, the future of Web3, why an open web
          matters, user-experience, governance, sustainability, NFTs, DeFI,
          gaming, and much more.
        </span>
        <p>Developer</p>
        <span>
          NEAR is constantly pushing boundaries, so are our speakers. Hear from
          leading voices about the BOS, AI, the future of Web3, why an open web
          matters, user-experience, governance, sustainability, NFTs, DeFI,
          gaming, and much more.
        </span>
      </div>
    </ForWho>
  </Root>
);
