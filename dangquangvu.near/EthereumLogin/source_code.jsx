const sender = Ethers.send("eth_requestAccounts", [])[0];

const ContainerLogin = styled.div`
  .web3-connect{
    width:480px;
    height:60px;
    border-radius:10px;
    background-color:#f22;
    color:#0F1126;
    font-size:18px;
    font-weight:500;
    border:none;
    margin-top:20px;
  }
`;
if (!sender)
  return (
    <ContainerLogin
      style={{
        display: "flex",
        maxWidth: "500px",
        flexDirection: "column",
        margin: "80px auto auto auto",
      }}
    >
      <img src="https://ipfs.near.social/ipfs/bafkreibmhq4fseqpcbywiq4hfojghxvhj47mjsri2trggt7d5h5od4y6kq"></img>

      <Web3Connect className="web3-connect" connectLabel="Connect ETH wallet" />
    </ContainerLogin>
  );

if (!sender)
  return (
    <ContainerLogin
      style={{
        display: "flex",
        maxWidth: "500px",
        flexDirection: "column",
        margin: "80px auto auto auto",
      }}
    >
      <img src="https://ipfs.near.social/ipfs/bafkreibmhq4fseqpcbywiq4hfojghxvhj47mjsri2trggt7d5h5od4y6kq"></img>

      <Web3Connect className="web3-connect" connectLabel="Connect ETH wallet" />
    </ContainerLogin>
  );

return <div>{sender}</div>;
