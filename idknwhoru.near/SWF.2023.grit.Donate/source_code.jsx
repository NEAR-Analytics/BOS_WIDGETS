const player = props.player;
const list = [0.01, 0.1, 1, 10, 100];

const cronosContractAddress = "0x876fEF178cd0D7fF10D1512b9cff7D8C3E56B1D8";

const cronosContractABI = [
  {
    type: "function",
    stateMutability: "payable",
    outputs: [],
    name: "donate",
    inputs: [{ type: "string", name: "player", internalType: "string" }],
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

  cronosContract.donate(player, { value: price });
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
    <Web3Connect connectLabel="Connect Wallet" />
    <h1>{player}</h1>
    <button onClick={donate}>후원하기</button>
    <Cards />
  </>
);
p;
