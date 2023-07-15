// 样式组件
const Title = styled.div`
  font-size: 16px;
  font-weight: bold;
  align-self: center; 
`;

const Separator = styled.div`
  height: 1px;
  width: 100%; 
  background: #ddd;
  margin: 5px auto;  
`;

const Desc = styled.div`
  text-align: start;
  color: #777;
  font-size: 14px;
  height: 200px;
`;

const Price = styled.div`
  font-size: 14px;
  color: #a08f2e;
  margin: 10px 0;
`;

const Button = styled.button`
  border: none;
  background: #1890FF;
  color: white;
  padding: 8px 16px;
  border-radius: 4px; 
`;

const RechargeItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  border: 1px solid #ddd;
  width: 200px;
`;

// 充值组件
function Recharge(props) {
  return (
    <div
      className="recharge-list"
      style={{ flexWrap: "wrap", display: "flex" }}
    >
      {props.items.map((item) => (
        <RechargeItem>
          <Title>{item.title}</Title>
          <Separator />
          <Desc>{item.desc}</Desc>
          <Separator />
          <Price>{item.price}</Price>
          <Separator />
          <Button>Buy now</Button>
        </RechargeItem>
      ))}
    </div>
  );
}
return (
  <div>
    <Recharge
      items={[
        {
          title: "Free way",
          desc: "By participating in the monthly Community Calls, you can earn a POAP. Each POAP automatically recharges 30 days of usage rights.",
          price: "price: 5 NEAR",
        },
        {
          title: "30 days",
          desc: "Purchase 30 days of service for this product",
          price: "price: 5 NEAR",
        },
        {
          title: "90 days",
          desc: "Purchase 90 days of service for this product. Enjoy a 10% discount!",
          price: "price: 13.5 NEAR",
        },
        {
          title: "360 days",
          desc: "Purchase 360 days of service for this product. Enjoy a 20% discount!",
          price: "price: 48 NEAR",
        },
        {
          title: "终身会员NFT",
          desc: "终身会员nft",
        },
      ]}
    />
  </div>
);
