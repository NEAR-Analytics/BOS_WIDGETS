const contract = props && props.contract;
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
  }
}

.top{
  height: 100px;
  border-bottom: 1px solid #fff; 
  background: #fff;
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

return (
  <StoreCard>
    <a
      href={`#/jgodwill.near/widget/Mintbase.StoreFront?ownerId=${contract.owner}&storeContract=${contract.id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div className="top"></div>
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
            <p>{contract.id}</p>
          </div>
        </div>
      </div>
      <div className="bottom">
        <button>Manage NFTs</button>
      </div>
    </a>
  </StoreCard>
);
