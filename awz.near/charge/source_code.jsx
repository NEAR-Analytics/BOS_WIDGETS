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
  text-align: center;
  color: #777;
  font-size: 14px;
  height: 400px;
`;

const Benefit = styled.div`
  font-size: 14px;
  color: #1890FF;
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
          <Benefit>{item.benefit}</Benefit>
          <Separator />
          <Button>充值</Button>
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
          title: "免费获取",
          desc: "参加每个月的Community Call可以获得POAP, 每个POAP自动充值30天的使用权",
        },
        {
          title: "月卡",
          desc: "购买月卡可以享受全站70%折扣",
        },
        {
          title: "季卡",
          desc: "购买季卡免费获得xxx课程",
        },
        {
          title: "终身会员NFT",
          desc: "终身会员nft",
        },
      ]}
    />
  </div>
);
