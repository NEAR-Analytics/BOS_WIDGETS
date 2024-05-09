const accountId = context.accountId;
const API_URL = props.API_URL || "https://e2e.nearverselabs.com";

State.init({
  active_wallets: 0,
  campaigns_count: 0,
  near_rewards: 0,
  neko_rewards: 0,
  total_transactions: 0,
  loaded: false,
  avatar:
    "https://i.near.social/magic/large/https://near.social/magic/img/account/" +
    accountId,
  error: "",
});

const setAvatar = () => {
  State.update({
    avatar:
      "https://ipfs.near.social/ipfs/bafkreibmiy4ozblcgv3fm3gc6q62s55em33vconbavfd2ekkuliznaq3zm",
  });
};

const Header = styled.div`
    width: 100%;
    display: flex;
    height: 120px;
    padding: 0 2.5%;
    flex-direction: row;
    align-items: center;
    
    @media (max-width: 620px) {
        height: 155px;
        flex-direction: column;        
    }
`;

const Logo = styled.div`
    width: 172px;
    cursor: pointer;
    position: relative;
    & > .icon {
        top: -16px;
        width: 170px;
        position: relative;
    }
    & > .title {
        right: 18px;
        // top: 28px;
        width: 215px;
        position: relative;
    }

    @media (max-width: 620px) {
        top: -32px;

        .icon {
            top: -25px;
        }

        .title {
            top: -10px;
        }
    }
`;

const Content = styled.div`
    gap: 25px; 
    z-index: 2;
    display: flex;  
    margin-left: 5%;
    p {
        margin: 0;
        font-size: 12px;
    }
    h4 {
        margin: 0;
    }

    @media (max-width: 620px) {
        gap: 1px;
        top: 91px;
        margin-left: 0;
        position: absolute;
        
        button {
            width: 20%;
            padding 1px 2px;
        }

        p {
            font-size: 11px;    
        }

        h4 {
            font-size: 15px;    
        }
    }
`;

const Button = styled.button`
  width: 145px;
  color: white;
  padding 1px 15px;
  border-radius: 8px;
  background: #121212; 
`;

const LogoUnderText = styled.p`
  text-align:center;
  margin:0;
  font-size:14px;
`;

const TextGroup = styled.div`
  position:relative;
  bottom:80px;
`;

const getData = () => {
  State.update({
    loaded: true,
  });
  return asyncFetch(API_URL + `/api/base/status`).then((res) => {
    if (res.ok) {
      const { error, data } = res.body;
      if (error) State.update({ error });
      State.update(data);
    }
  });
};

if (!state.loaded) getData();

return (
  <Header>
    <Logo>
      <img
        className="title"
        src="https://e2e.nearverselabs.com/logo_title.svg"
      />
      <TextGroup>
        <LogoUnderText>Powered by</LogoUnderText>
        <LogoUnderText>Nearverse Labs</LogoUnderText>
      </TextGroup>
    </Logo>
    <Content>
      <Button>
        <p>Wallets Active</p>
        <h4>{Number(state.active_wallets)}</h4>
      </Button>
      <Button>
        <p> All Campaigns </p>
        <h4>{Number(state.campaigns_count)}</h4>
      </Button>
      <Button>
        <p>{`Rewards Paid $NEAR`}</p>
        <h4>{Number(state.near_rewards)}</h4>
      </Button>
      <Button>
        <p>{`Rewards Paid $NEKO`}</p>
        <h4>{Number(state.neko_rewards)}</h4>
      </Button>
      <Button>
        <p>Total Transactions</p>
        <h4>{Number(state.total_transactions)}</h4>
      </Button>
    </Content>
  </Header>
);
