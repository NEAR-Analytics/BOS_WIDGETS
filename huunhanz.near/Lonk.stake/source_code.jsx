const Container = styled.div`
    display:flex;
    justify-content:space-around;
    max-height:600px;
    padding:10px 0;
    align-items:center;
`;

const Content = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:space-between;
`;
const Title = styled.div`
    display:flex;
    flex-direction:column;
    text-align:start;
    .title{
        font-family: Lakki Reddy,cursive;
        font-size: 4em;
        text-shadow: 0 4px 4px #00000040;
        text-transform: lowercase;
        color:#31cf34;
    }
    .sub-title{
        font-family: Lakki Reddy,cursive;
        font-size: 5em;
        text-shadow: 0 4px 4px #00000040;
        text-transform: Upcase;
        color:#31cf34;
    }
`;
const Stake = styled.div`
    height:320px;
    width:450px;
    border:1px solid gray;
    border-radius:5px;
    padding:25px 20px;
    display:flex;
    flex-direction:column;
    gap:4px;
    text-align:center;
    justify-content:center;
    align-items:center;

    .title{
        width:70%;
        word-wrap: break-word;
        font-size:18px;
    }
    .amount{
        font-size:4rem;
        text-decoration: underline;
        font-weight:600;
    }
    .sub-amount{
        font-size:14px;
        color:gray;
    }
    .available{
        font-size:15px;
        color:gray;
    }
    .footer{
        margin-top:10px;
        display:flex;
        flex-direction:row;
        justify-content:space-around;
        gap:10px;
        background:#31cf34;
        padding:10px 20px;
        width:100%;
        border-radius:20px;
    }
    .title-footer{
        display:flex;
        flex-direction:column;
        gap:3px;
        text-align:start;
    }
    .button-stake{
        background:#ffffff;
        color:#31cf34;
        padding:10px 20px;
        outline:none;
        border:none;
        border-radius:10px;
        font-weight:600;
    }
`;
return (
  <Container>
    <Title>
      <div class="title">Stake</div>
      <div class="sub-title">$NEAR</div>
    </Title>
    <Stake>
      <div class="title">Stake $NEAR with LONK, secure the network</div>
      <div class="amount">100</div>
      <div class="sub-amount">~688888 USD</div>
      <div class="available">Available: 10000</div>
      <div class="footer">
        <div>
          <img
            src="https://lonk.meme/assets/images/dragon.svg"
            alt="logo"
            width="30"
            height="30"
          />
        </div>
        <div class="title-footer">
          <div class="text-white">lonk_validator.poolv1.near</div>
          <small>Uptime: 100% APY: 10,89%</small>
        </div>
        <div>
          <button class="button-stake">Stake</button>
        </div>
      </div>
    </Stake>
  </Container>
);
