const player = props.player;
const list = [1, 10, 100, 1000, 10000, 100000];

const cronosContractAddress = "0xC6A3f8A89136fede4BD4CA36a1864bDA811937c9";

const cronosContractABI = [
  {
    type: "function",
    stateMutability: "payable",
    outputs: [],
    name: "donate",
    inputs: [{ type: "address", name: "player", internalType: "address" }],
  },
];

const selectPrice = (price) => {
  State.update({
    price,
  });
};

const donate = (_) => {
  const price = ethers.utils.parseEther(state.price.toString()).toString();

  const cronosContract = new ethers.Contract(
    cronosContractAddress,
    cronosContractABI,
    Ethers.provider().getSigner()
  );

  cronosContract.donate(player.address, { value: price });
};

if (Ethers.provider()) {
  const signer = Ethers.provider().getSigner();
  signer
    .getAddress()
    .then((address) => {
      State.update({ address });
    })
    .catch((err) => {
      console.log({ err });
    });
}

const Card = styled.div`
    width: 150px;
    height: 200px;
    border: solid 1px #bbb;
    cursor: pointer;
    background-color: ${(cardProps) =>
      cardProps.price === state.price ? "#bbb" : "#fff"}
`;

const Cards = () => {
  if (player !== undefined) {
    return (
      <div style={{ display: "flex" }}>
        {list.map((price) => (
          <Card
            price={price}
            onClick={(_) => {
              selectPrice(price);
            }}
          >
            {price} CRO
          </Card>
        ))}
      </div>
    );
  }
};

return (
  <>
    <h1>{player.name}</h1>
    <button onClick={donate}>후원하기</button>
    <Cards />
  </>
);
p;
