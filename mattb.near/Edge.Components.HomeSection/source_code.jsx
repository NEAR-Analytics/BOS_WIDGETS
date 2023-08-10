const BACKGROUND_URL =
  "https://ipfs.near.social/ipfs/bafkreicu37fvfmegp3xealyvr7pihrzb7yif7xq2ihovbdhbo4zmrhwhuu";

const Jumbotron = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    width:100%;
    height:100vh;
    background-position:center;
    background-size:cover;
    background-repeat:no-repeat;
    box-shadow: inset 0 0 0 1000px rgba(0,0,0,.2);
`;

const Content = styled.div`
    text-align:center;

    h1 {
        color:#fff;
        font-size:3rem;
        font-family:sans-serif;
    }
    p {
        font-size:1.2rem;
        color:#fff;
        margin:1.5rem;
    }
`;

const Details = styled.div`
    display:flex;
    width:100%;
    box-sizing:border-box;
    padding:.5rem;
    background-color:#fff;
    border-radius:10px;
    box-shadow: 0 0 0 3px rgba(0,0,0,.1);
    border: 5px solid #fff;

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
        margin-right:10px;
        padding-right:10px;
        border-right:1px solid rgba(0,0,0,.05);
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
    border-radius:5px;
    box-shadow: 0 0 0 2px #000;
    border:1px solid #fff;
`;

return (
  <Jumbotron
    style={{
      "background-image": `url(${BACKGROUND_URL})`,
    }}
  >
    <Content>
      <h1>Edge Intelligence Summit 23</h1>
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
