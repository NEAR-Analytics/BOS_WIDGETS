const contract = props.contract;
const StoreCard = styled.div`
border: 1px solid #e5e8eb;
box-shadow: 2px 2px 12px 0px rgba(0, 0, 0, 0.05);
gap: 2em;
margin: 10px auto;
width: 100%;
  background: #000;
  color: #fff;
max-width: 600px;
*{
  font-family: Helvetica Neue;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  }
.icon_area{
  width: 110px;
  // border-radius: 50%;
  height: 110px;
  border: 3px solid #ccc;
  display: flex;
  overflow: hidden;
  position: absolute;
  margin-top: -50px;
  img{
    object-fit:cover;
  }
}

.name_contract{
  margin-top: 10px;
  h3{
    font-weight: bold;
    margin: 0;
  }
}

.middle{
  padding: 0px 20px;
  position: relative;
  .content{
  position: relative;
    display: flex;
    gap: 20px;
    .name_contract{
      margin-left: 130px;
    }
    .count_area{
      flex: 1;
    }
    .nft_count{
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      margin-top: 13px;
      justfy-self: flex-end;
      background:#222;
      padding: .5em;
      width: 100px;
      float: right;
      h6{
        opacity: 0.5;
        magin: 0;
        font-size: 13px;
      }
    }
  }
}

.top{
  height: 100px;
  border-bottom: 1px solid #fff; 
  background: #fff;
  overflow: hidden;
  img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.bottom{
  padding: 1em;
  button {
    border: 1px solid #fff;
    border-radius: 0;
    color: white;
    background: black;
    text-align: center
    display: flex;
    padding: 7px 20px;
    cursor: pointer;
  }
  button:disabled {
    background: grey;
    border: grey;
    cursor: not-allowed;
  }
  button:hover {
    background: white;
    color: black;
    border-color: black;
  }
}
`;

const fetchStoreFrontData = (owner, contractId) => {
  const response2 = fetch("https://graph.mintbase.xyz/mainnet", {
    method: "POST",
    headers: {
      "mb-api-key": "anon",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `query MyQuery {
  mb_views_nft_metadata_unburned_aggregate(
    where: {nft_contract: {id: {_eq: "${contractId}"}, owner_id: {_eq: "${owner}"}}}
  ) {
    aggregate {
      count
    }
  }
}
`,
    }),
  });

  State.update({
    storeContracts: response2.body.data.mb_views_nft_metadata_unburned,
    storeNftsCount:
      response2.body.data.mb_views_nft_metadata_unburned_aggregate.aggregate
        .count,
  });
  console.log("running2", state.storeContracts);
};

fetchStoreFrontData(
  contract.nftContract.owner || "nate.near",
  contract.id || "nate.mintbase1.near"
);

return (
  <StoreCard>
    <a
      href={`#/jgodwill.near/widget/Mintbase.StoreFront?ownerId=${contract.nftContract.owner}&storeContract=${contract.id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div className="top">
        <img
          src={
            "https://ipfs.near.social/ipfs/bafkreic3vnqe4ttofyrgt3w4zfqkpllddgxw5bfdrdg2zn3f4l3xiuuvby"
          }
          className="chain_banner"
          alt={contract.nftContract.name + " banner"}
        />
      </div>
      <div className="middle">
        <div className="content">
          <div className="icon_area">
            <img
              src={
                contract.nftContract.icon ??
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRub7hFLkStCvZiaSeiUGznP4uzqPPcepghhg&usqp=CAU"
              }
              className="chain_icon"
              alt={contract.nftContract.name + " icon"}
            />
          </div>
          <div className="name_contract">
            <h3>
              {(contract && contract?.nftContract?.name.toUpperCase()) ||
                "Contract Name"}
            </h3>
            <p>{contract.id || "Contract Id"}</p>
          </div>
          <div className="count_area">
            <div className="nft_count">
              <h6>NFT Count</h6>
              <p>{state.storeNftsCount || 124}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom">
        <button>Manage NFTs</button>
      </div>
    </a>
  </StoreCard>
);
