const BACKGROUND_URL =
  "https://ipfs.near.social/ipfs/bafkreicu37fvfmegp3xealyvr7pihrzb7yif7xq2ihovbdhbo4zmrhwhuu";

const Jumbotron = styled.div`
    @keyframes move {
      0% {
        box-shadow: inset 0 0 20vw 5vw rgba(255,255,255,1);
      }
      20% {
        box-shadow: inset 0 10vw 20vw 5vw rgba(255,255,255,1);
      }

      25% {
        box-shadow: inset 0 20vw 20vw 5vw rgba(255,255,255,1);
      }
      
      35% {
        box-shadow: inset 0 0 5vw 5vw rgba(255,255,255,1);
      }

      40% {
        box-shadow: inset 0 0 15vw 5vw rgba(255,255,255,1);
      }

      50% {
        box-shadow: inset 0 0 10vw 5vw rgba(255,255,255,1);
      }
    }

    position:relative;
    display:flex;
    align-items:center;
    justify-content:center;
    width:100%;
    height:100vh;
    background-position:center;
    background-size:cover;
    background-repeat:no-repeat;
    box-shadow: inset 0 0 20vw 5vw rgba(255,255,255,1);
    animation-name:move;
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
        backdrop-filter:invert(80%);
      }
    }
      content:'';
      position:absolute;
      top:0;
      left:0;
      background-color:rgba(255,255,255,.6);
      width:100%;
      height:100%;
      backdrop-filter:invert(0%);
      animation-duration:20s;
      animation-iteration-count:infinite;
      animation-fill-mode:both;
      animation-direction: alternate;
    }
`;

const Content = styled.div`
    text-align:center;
    z-index:2;

    h1 {
        color:#000;
        font-size:3rem;
        font-family:sans-serif;

        .company {
          font-family: Times New Roman;
          border-bottom: 2px solid #000;
        }
    }
    p {
        font-size:1.2rem;
        color:#000;
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
    background-color:#000;

    div {
        display:flex;
        justify-content:center;
        align-items:center;

        flex-grow:1;
        p {
            color:#fff;
            margin:0;
            padding:0;
        }
        margin-right:15px;
        padding-right:10px;
    }
`;

const Button = styled.a`
    align-items:center;
    justify-content:center;
    background-color:#fff;
    color:#000;
    width:100%;
    padding:.5rem;
    max-width:150px;
    box-shadow: 0 0 0 2px #fff;
    border:2px solid #000;
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
