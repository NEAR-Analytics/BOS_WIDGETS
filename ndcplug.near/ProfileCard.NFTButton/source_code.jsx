const title = props.title ?? "NFT by GenaDrop";
const description = props.description ?? "A NFT mitned with genadrop";
const image =
  props.image ??
  "https://ipfs.near.social/ipfs/bafkreib2sswfwxwwsaaegzhuc454rgkdyycg6dx4gprxgwk5vy6ysrkfpm";
const receiver = props.receiver ?? "root.near";
const buttonName = props.buttonName ?? "Mint NFT";

const mintNFT = () => {
  const metadata = {
    name: title,
    description: description,
    properties: [],
    image: image,
  };
  console.log("come", metadata);
  asyncFetch("https://ipfs.near.social/add", {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: metadata,
  }).then((res) => {
    console.log("GO ON SOUN", res);
    const cid = res.body.cid;
    const gas = 200000000000000;
    const deposit = 10000000000000000000000;
    Near.call([
      {
        contractName: "nft.genadrop.near",
        methodName: "nft_mint",
        args: {
          token_id: `${Date.now()}`,
          metadata: {
            title: title,
            description: description,

            media: image,
            reference: `ipfs://${cid}`,
          },
          receiver_id: receiver,
        },
        gas: gas,
        deposit: deposit,
      },
    ]);
  });
};
const Wrapper = styled.div`
  .follow-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 8px 16px;
    height: 32px;
    border-radius: 100px;
    font-weight: 600;
    font-size: 12px;
    line-height: 15px;
    text-align: center;
    cursor: pointer;
    background: #FBFCFD;
    border: 1px solid #D7DBDF;
    color: #006ADC !important;
    white-space: nowrap;

    &:hover,
    &:focus {
      background: #ECEDEE;
      text-decoration: none;
      outline: none;
    }

    i {
      color: #7E868C;
    }

    .bi-16 {
      font-size: 16px;
    }
  }
`;

return (
  <Wrapper className={props.className}>
    <button className="follow-button" onClick={mintNFT}>
      {buttonName}
    </button>
  </Wrapper>
);
