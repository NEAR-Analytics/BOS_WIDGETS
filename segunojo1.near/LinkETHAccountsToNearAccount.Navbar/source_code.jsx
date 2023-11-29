const userId = context.accountId;

const Nav = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
height: 74px;

div{
  display: flex;
  justify-content:center;
  align-items: center;
  gap: 24px;
  border-radius: 12px;
  
}
p{
  margin: 0;
}
`;

const Wallet = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.22);
`;

return (
  <Nav>
    <img src="https://i.ibb.co/G98pcQP/Frame-23.png" />

    <div>
      <Wallet>
        <img src="https://i.ibb.co/X5zpnQD/near-icon-logo-10785-AE366-seeklogo-1.png" />
        <p>{userId}</p>
      </Wallet>
    </div>
  </Nav>
);
