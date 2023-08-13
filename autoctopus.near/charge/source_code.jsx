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

const accountId = context.accountId;

if (accountId === "") {
  return "Please login first";
}

const clickBuyButton = (days, price) => {
  Near.call("nft.autoctopus.near", "");
};

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
          <Button buttonClick={() => item.buttonClick(1, 2)}>
            {item.button}
          </Button>
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
          price: "Free",
          button: "Check my POAP",
        },
        {
          title: "30 days",
          desc: "Purchase 30 days of service for this product",
          price: "price: 5 NEAR",
          button: "Buy",
        },
        {
          title: "90 days",
          desc: "Purchase 90 days of service for this product. Enjoy a 10% discount!",
          price: "price: 13.5 NEAR",
          button: "Buy",
        },
        {
          title: "360 days",
          desc: "Purchase 360 days of service for this product. Enjoy a 20% discount!",
          price: "price: 48 NEAR",
          button: "Buy",
        },
        {
          title: "VIP NFT",
          desc: "Account holders of this NFT can enjoy the services of this product. The NFT can be traded. The minting price of the NFT increases each time it is minted.",
          price: `price: ${props.nft_current_price}`,
          button: "Check more detail",
        },
      ]}
    />
    <Separator />
    <div>
      <h1>VIP NFT</h1>
      <div>123</div>
    </div>
  </div>
);
