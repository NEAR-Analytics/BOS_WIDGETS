const $ = VM.require("sdks.near/widget/Loader");
const {
  Buttons,
} = $("@mattb/frensly/commons");

const FRENSLY_LOGO =
  "https://ipfs.near.social/ipfs/bafkreibmkg7wbgfnliss4ow7uy4tn2trd7qejpfjzblhf45p2ffw2ppryu";

const Header = styled.div`
    display:flex;
    position:relative;
    padding:3rem 2rem;
    min-width:500px;
    background-color:rgba(0,0,0,.02);
    margin:40px 25px 40px;
    border-radius:20px;
    align-items:center;
    

    @media screen and (max-width:850px) {
      flex-wrap:wrap;
    }

    h1 {
      font-weight:bold;
      font-size:3.3rem;
    }

    p {
        max-width:500px;
        margin:10px 0 30px;
    }

    @keyframes levitate {
      0% {
        transform:translateY(0);
      }

      50% {
        transform:translateY(5px);
      }

      100% {
        transform:translateY(0);
      }
    }

    div:first-of-type {
        position:relative;
        z-index:1;
        width:100%;
        height:100%;
        max-width:650px;
        min-height:300px;
        animation: levitate 1s;
        animation-iteration-count:infinite;
        animation-fill-mode:backwards;

        @media screen and (max-width:1050px) {
          max-width:400px;
        }
    }

    img {
      position:absolute;
      width:100%;
      max-width:500px;
      top:-30px;
      left:-100px;
      right:0;
      margin:auto;
      transform:rotate(-10deg);
      transform-origin: top left;
    }
`;

return (
  <Header>
    <div>
      <img src={FRENSLY_LOGO} />
    </div>
    <div>
      <h1>
        Frens are Near
        <br />
        using Lens
      </h1>
      <p>
        Link your Lens handle to your NEAR account, import your profile and
        discover frensly people just like you
      </p>
      <label htmlFor="search">
        <Buttons.ButtonPrimary>Discover frens</Buttons.ButtonPrimary>
      </label>

      <Buttons.ButtonPrimary
        target="_blank"
        href="/mattb.near/widget/NearBadger.Pages.Main"
      >
        Verify my profile
      </Buttons.ButtonPrimary>
    </div>
  </Header>
);
