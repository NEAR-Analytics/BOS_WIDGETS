const Main = styled.div`
display: flex;
flex-direction: column;
align-items: center;
background-color: #06050b;
gap: 2rem;
padding-bottom: 3rem;
`;

const IconItem = styled.div`
display: flex;
flex-direction: row;
gap: 1rem;
width: 80%;
min-height: 16rem;
`;

const ItemCard = styled.div`
background-color: #06050b;
width: 50%;
display: flex;
flex-direction: column;
padding: 2rem;
justify-content: center;
align-items: center;
color: red;
border-radius: 10px;
box-shadow: 5px 5px 10px 10px black;
`;

const ItemDescription = styled.p`
color: white
`;

const ItemIcon = styled.i`
  font-size: 6rem;
`;

const vexDescriptions = [
  {
    icon: "ph-users-four",
    title: "Engaged community",
    description:
      "Vex will leverage a DAO structure to attain an unrivaled level of social governance. Users will be able to increase their betting experience through proposing and voting changes",
  },
  {
    icon: "ph-currency-btc",
    title: "No fees",
    description:
      "Fast, gasless bets and high real yield rewards simultaneously.",
  },
  {
    icon: "ph-chart-line-up",
    title: "High potential",
    description:
      "With 231 million potential betters online, VEX would get 101 million of revenue with only 1% of market share.",
  },
];

return (
  <Main>
    <Widget src="amandaalexbr.near/widget/VexHero" />

    {vexDescriptions.map((item) => (
      <IconItem key={item.key}>
        <ItemCard>
          <ItemIcon>
            <i className={`ph-fill ${item.icon}`} />
          </ItemIcon>
        </ItemCard>

        <ItemCard>
          <h3>{item.title}</h3>
          <ItemDescription>{item.description}</ItemDescription>
        </ItemCard>
      </IconItem>
    ))}
  </Main>
);
