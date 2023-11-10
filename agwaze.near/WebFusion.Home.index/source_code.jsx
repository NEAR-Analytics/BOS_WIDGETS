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
      margin-bottom: 30px;
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
    @media only screen and (max-width: 900px) {
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
          Blockchain development often involves an overcomplicated onboarding
          process and the requirement to learn various programming languages
          such as Solidity, Rust, Cadence and more. This steep learning curve
          has presented a formidable barrier to entry whereas we believe that
          shouldn't be the case.
        </p>
        <p>
          WebFusion is a DevHub educational initiative that aim's bridge the gap
          between Web2 and Web3 by providing you with a seamless transition into
          this exciting space using the BOS (Blockchain Operating System).
        </p>
        <p>
          From November 27th to November 30th 2023 at the ALX Hub in ITF
          Training Complex Iponri Lagos, Web developers in Lagos Nigeria will
          leverage their experience in Javascript and React to start building
          components and decentralized apps on the BOS.
        </p>
        <p>
          With BOS, you don't need to learn any new programming languages to
          start building fully decentralized dApps. Our goal is to educate,
          inspire innovation, and foster collaboration within existing web2
          developer communities.
        </p>
        <div className="eventButtons">
          <Widget src="agwaze.near/widget/WebFusion.Custom.Button" />
          <button className="speakButton">Apply to Speak {upArrow}</button>
        </div>
      </div>
      <Widget src="agwaze.near/widget/WebFusion.Home.EventDetails" />
      <Widget src="agwaze.near/widget/WebFusion.Home.EventPrice" />

      <Widget src="agwaze.near/widget/WebFusion.Home.Sponsors" />
    </EventDetails>
  </Root>
);
