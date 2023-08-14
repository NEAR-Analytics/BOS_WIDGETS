const BACKGROUND_URL =
  "https://ipfs.near.social/ipfs/bafkreicu37fvfmegp3xealyvr7pihrzb7yif7xq2ihovbdhbo4zmrhwhuu";

const Jumbotron = styled.div`
    @keyframes move {
      0% {
        background-size: auto 100%;
      }
      20% {
        background-size: auto 101%;
      }

      25% {
        background-size: auto 100.5%;
      }
      
      35% {
        background-size: auto 102%;
      }

      40% {
        background-size: auto 100%;
      }

      50% {
        background-size: auto 104%;
      }

      55% {
        background-size: auto 102%;
      }

      58% {
        background-size: auto 108%;
      }
    }

    position:relative;
    display:flex;
    align-items:center;
    justify-content:center;
    width:100%;
    height:100vh;
    background-position:center;
    background-size:auto 100%;
    background-repeat:no-repeat;
    box-shadow: inset 0 10px 20vw 10vw rgba(0,0,0,1);
    animation-name: move;
    animation-duration:10s;
    animation-iteration-count:infinite;
    animation-fill-mode:both;
    animation-direction: alternate;

    &:after {
      @keyframes decolorize {
      0% {
        backdrop-filter:invert(100%);
      }
      20% {
        backdrop-filter:invert(90%);
      }

      25% {
        backdrop-filter:invert(95%);
      }
      
      35% {
        backdrop-filter:invert(90%);
      }

      40% {
        backdrop-filter:invert(80%);
      }

      50% {
        backdrop-filter:invert(100%);
      }

      55% {
        backdrop-filter:invert(70%);
      }

      58% {
        backdrop-filter:invert(30%);
      }
    }
      content:'';
      position:absolute;
      top:0;
      left:0;
      background-color:rgba(0,0,0,.45);
      width:100%;
      height:100%;
      backdrop-filter:invert(100%);
      animation-name: decolorize;
      animation-duration:10s;
      animation-iteration-count:infinite;
      animation-fill-mode:both;
      animation-direction: alternate;
    }
`;

const Content = styled.div`
    text-align:center;
    z-index:2;

    h1 {
        color:#fff;
        font-size:3rem;
        font-family:sans-serif;

        .company {
          font-family: Times New Roman;
          border-bottom: 2px solid #fff;
        }
    }
    p {
        font-size:1.2rem;
        color:#fff;
        margin:1.5rem;
    }

    h1 + p {
      font-style:italic;
    }
`;

const Details = styled.div`
    display:flex;
    width:100%;
    box-sizing:border-box;
    padding:.5rem;
    background-color:#fff;

    div {
        display:flex;
        justify-content:center;
        align-items:center;

        flex-grow:1;
        p {
            color:#000;
            margin:0;
            padding:0;
        }
        margin-right:15px;
        padding-right:10px;
        border-right:1px solid rgba(0,0,0,.2);
    }
`;

const Button = styled.a`
    align-items:center;
    justify-content:center;
    background-color:#000;
    color:#fff;
    width:100%;
    padding:.5rem;
    max-width:150px;
    box-shadow: 0 0 0 2px #000;
    border:2px solid #fff;
    text-decoration:none;

    &:hover, &:focus {
      color:#fff;
    }
`;

return (
  <Jumbotron
    style={{
      "background-image": `url(${BACKGROUND_URL})`,
    }}
  >
    <Content>
      <h1>
        <span className="company">EDGE</span> Intelligence Summit 23
      </h1>
      <p>Global Hackathon</p>
      <Details>
        <div>
          <p>
            Sep 1st - Sep 24th, 2023 at <a href="#">San Francisco, CA</a>
          </p>
        </div>
        <Button>BUY TICKET</Button>
      </Details>
    </Content>
  </Jumbotron>
);
