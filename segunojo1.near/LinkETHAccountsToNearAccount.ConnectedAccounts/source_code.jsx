const Header = styled.div`
display: flex;
justify-content: space-between;
width: 90%;
margin: auto;
margin-bottom: 70px;

h1{
  font-size: 36px;
font-style: normal;
font-weight: 700;
line-height: 100%; 
}
p{
  color: #7C7C7C;
margin: 0;
font-family: 'Inter' sans-serif;
font-size: 19px;
font-style: normal;
font-weight: 400;
}
`;

const Chain = styled.div`
display:  flex;
align-items: center;
gap: 12px;
 border: 1px solid rgba(0, 0, 0, 0.22);
  padding: 10px 25px;
  gap: 24px;
  border-radius: 12px;
 p{
  margin: 0;
  font-size: 36px;
font-style: normal;
font-weight: 600;
 }
`;

const Accounts = styled.div`
display: flex;
flex-direction : column;
padding: 40.5px 44px;
justify-content: center;
align-items: flex-start;
max-width: 600px;
border-radius: 12px;
border: 1px solid rgba(0, 0, 0, 0.22);
span{
  font-weight: 600;
}
h1{
  font-size: 24px;
}
`;
const Main = styled.div`
display: flex;
flex-direction: column;
gap: 12px;
`;

const Status = styled.div`
display: flex;
justify-content: center;
align-items: center;
gap: 10px;
`;

const Acct = styled.div`
width: 100%;
display: flex;
justify-content: space-between;
margin-bottom: 10px;
p{
  margin: 0;
}
`;

const header = (
  <Header>
    <div>
      <h1>Welcome 0x301</h1>
      <p>Here’s your onchain activity history</p>
    </div>
    <div>
      <Chain>
        <img
          src="https://i.ibb.co/j68BJpr/matic-logo-1.png"
          alt="matic-logo-1"
          border="0"
        />
        <h3>Polygon</h3>
      </Chain>
    </div>
  </Header>
);

const main = (
  <Main>
    <Accounts>
      <Acct>
        <h1>Account 1</h1>
        <Status>
          <img src="https://i.ibb.co/RypQPsn/Group-3.png" />
          <span>Connected</span>
        </Status>
      </Acct>
      <p><span>Account ID</span>: 0x8Efd7b62Aff059615FB26b2CDb474C888C799D84</p>
      <button>Disconnect</button>
    </Accounts>
    <Accounts>
      <Acct>
        <h1>Account 1</h1>
        <Status>
          <img src="https://i.ibb.co/RypQPsn/Group-3.png" />
          <span>Connected</span>
        </Status>
      </Acct>
      <p><span>Account ID</span>: 0x8Efd7b62Aff059615FB26b2CDb474C888C799D84</p>
      <button>Disconnect</button>
    </Accounts>
    <Accounts>
      <Acct>
        <h1>Account 1</h1>
        <Status>
          <img src="https://i.ibb.co/RypQPsn/Group-3.png" />
          <span>Connected</span>
        </Status>
      </Acct>
      <p><span>Account ID</span>: 0x8Efd7b62Aff059615FB26b2CDb474C888C799D84</p>
      <button>Disconnect</button>
    </Accounts>
  </Main>
);

return (
  <div>
    {header}
    {main}
  </div>
);
