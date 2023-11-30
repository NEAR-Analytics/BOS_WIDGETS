const userId = context.accountId;

const Nav = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
height: 74px;
width: 100%;

div{
  display: flex;
  justify-content:center;
  align-items: center;
  gap: 24px;
  border-radius: 12px;
  
}
p{
  margin: 0;
  font-size: 24px;
font-style: normal;
font-weight: 500;
line-height: 120%;
}
`;

const Wallet = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.22);
  padding: 10px 25px;
`;

return (
  <Nav>
    <img src="https://i.ibb.co/G98pcQP/Frame-23.png" />

    <div>
      <Wallet>
        <img src="https://i.ibb.co/X5zpnQD/near-icon-logo-10785-AE366-seeklogo-1.png" />
        <p>{userId ? userId : "Sign in"}</p>
      </Wallet>
    </div>
  </Nav>
);
