const upArrow = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="25"
    viewBox="0 0 24 25"
    fill="none"
  >
    <path
      d="M6 19.1121L19 6.11206M19 6.11206V18.5921M19 6.11206H6.52"
      stroke="black"
      stroke-width="1.21179"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const Root = styled.div`
  .top-image {
    img {
      width: 100%;
    }
  }
`;

const EventDetails = styled.div`
    margin-top: 56px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-wrap: wrap;
    .aboutEvent {
      width: 40%;
    }
    h1 {
      color: var(--nearcon-app-mirage, #1A202C);
      font-family: Inter;
      font-size: 46px;
      font-style: normal;
      font-weight: 600;
      line-height: 55.2px;
      margin-bottom: 31px;
    }
    p {
      color: var(--nearcon-app-black, #000);
      font-family: Inter;
      font-size: 15.625px;
      font-style: normal;
      font-weight: 400;
      margin-bottom: 8px;
      line-height: 20px; /* 128% */
    }
    .eventButtons {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      margin-top: 63px;
      flex-wrap: wrap;
      gap: 20px;
    }
    .speakButton {
      display: flex;
      width: 215px;
      height: 63.54px;
      padding: 14.54px 18px 15px 18px;
      justify-content: center;
      align-items: center;
      flex-shrink: 0;
      border: 2px solid var(--apple-com-shark, #1D1D1F);
      color: var(--solana-com-black-russian, #010102);
      text-align: center;
      font-family: Inter;
      font-size: 18px;
      font-style: normal;
      font-weight: 700;
      transition: 0.3s ease-in-out;
      line-height: 34px; /* 188.889% */
      svg {
        margin-left: 5px;
      }
    }
      .speakButton:hover {
        opacity: 0.6;
      }
    @media only screen and (max-width: 800px) {
      .aboutEvent {
        width: 90%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0 17px;
        margin-bottom: 50px;
      }
  }
  @media only screen and (max-width: 800px) {
    h1 {
      font-size: 25px;
      text-align: center;
      text-transform: capitalize;
      line-height: 39px;
    }
    }
`;

return (
  <Root>
    <div className="top-image">
      <img src="https://ipfs.near.social/ipfs/bafkreigfnar3xndv3xfhldrtjr7pezxat7um4drnshvuxaymcgawwk2tva" />
    </div>
    <EventDetails>
      <div className="aboutEvent">
        <h1>The biggest experience of the year is near</h1>
        <p>
          Last year’s NEARCON was epic. This one will be iconic. We are going to
          take you on a 4 day journey into an open web.
        </p>
        <p>
          Join 3,000+ delegates as we explore the power and possibilities of an
          open web
        </p>
        <p>
          Get inspired by talks from renowned authors, economists, artists,
          politicians, developers, entrepreneurs, and more
        </p>
        <p>
          Explore the Blockchain Operating System (BOS), try it for yourself,
          and find out why it's the driving force behind an open web
        </p>
        <p>
          Connect with projects, speakers, community members, builders, and
          multi-chain enthusiasts from around the world
        </p>
        <p>
          Hack the days and nights away for a chance to build on the BOS and win
          $180k+
        </p>
        <div className="eventButtons">
          <Widget src="agwaze.near/widget/WebFusion.Custom.Button" />
          <button className="speakButton">Apply to Speak {upArrow}</button>
        </div>
      </div>
      <Widget src="agwaze.near/widget/WebFusion.Home.EventDetails" />
    </EventDetails>
  </Root>
);
