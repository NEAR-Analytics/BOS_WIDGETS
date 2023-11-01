const Root = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    justify-content: center;
    .head, .community {
        display: flex;
        align-items: center;
        flex-direction: column
    }
    .community {
        margin-top: 40px;
    }
    h1 {
        color: #000;
        font-family: Helvetica Neue;
        font-size: 64px;
        font-style: normal;
        font-weight: 500;
        text-align: center;
        line-height: normal;
    }
    span {
        color: #B0B0B0;
        text-align: center;
        font-family: Helvetica Neue;
        font-size: 24px;
        font-style: normal;
        font-weight: 400;
        line-height: 131.3%; /* 31.512px */
    }
    .nfts {
        display: flex;
        align-items: center;
        gap: 20px;
        margin-top: 20px;
        flex-wrap: wrap;
    }
    .daos {
        margin-top: 40px;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        justify-content: center;
        gap: 20px;
        margin-bottom: 20px;
    }
`;

const communities = [
  "marmaj.sputnik-dao.near",
  "daorecords.sputnik-dao.near",
  "vibes.sputnik-dao.near",
];

return (
  <Root>
    <div className="head">
      <h1>Explore the NFTS</h1>
      <span>DAOs funded by the Creatives DAO</span>
    </div>
    <div className="daos">
      <Widget src="agwaze.near/widget/CPlanet.NFTCard.index" />
      <Widget src="agwaze.near/widget/CPlanet.NFTCard.index" />{" "}
      <Widget src="agwaze.near/widget/CPlanet.NFTCard.index" />
    </div>
    <div className="community">
      <h1>Our Communties</h1>
      <span>DAOs funded by the Creatives DAO</span>
    </div>
    <div className="daos">
      {communities.map((data, index) => (
        <div key={index}>
          <Widget
            props={{
              daoId: data,
              onButtonClick: () =>
                props.update({ tab: "daoProfile", daoId: data }),
            }}
            src="agwaze.near/widget/CPlanet.DAO.Card"
          />
        </div>
      ))}
    </div>
  </Root>
);
