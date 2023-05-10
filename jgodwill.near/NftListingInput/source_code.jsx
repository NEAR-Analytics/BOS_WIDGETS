// if (!props.tokenId) {
//   return <div></div>;
// }

const Label = styled.div``;
const SecondaryText = styled.h3`
  font-size: 1.1rem;
  color:#0f1d40;
  width:60%;
  font-family: "SF Pro Display",sans-serif;
  line-height: 1.02;
  white-space: nowrap;
  
`;
const Card = styled.div``;
const BorderedShadowedCard = styled.div`
  display: flex;
   flex-flow: column nowrap;
   -ms-flex-flow:column nowrap;
   background-color: "#f0f0f0";
   border-radius: 10px;
   border: 1.41429px solid rgba(28,27,28,.1);
  box-shadow: 5.65714px 5.65714px 11.3143px rgba(28,27,28,.04);
   padding: 1rem;
   width: fit-content;
   background-color:#fff;
   & img{
     border-radius: inherit;
   }
`;
const Main = styled.div`
    display: grid;
  gap: 3rem;
  align-content:center;
  grid-template-columns: repeat(auto-fit, minmax(270px, 0.5fr));
  justify-content: center;
  // background: linear-gradient(180deg,#e4f1fb,hsla(0,0%,85.1%,0));
  margin-top: 20px;
  width:100%;
  padding: 1rem;
`;

const ImgCard = styled.div`
   box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  height:fit-content;
  max-height:500px;
  max-width: 500px;
  border-radius: 1rem;
  margin: 0 auto;
  &>img{
  object-fit: contain;
  }
`;
// {props.state.tokenId && (
return (
  <>
    <div className="container-fluid">
      <Main>
        <BorderedShadowedCard>
          <div>
            <SecondaryText>
              {`#...${props.state.tokenId?.slice(
                props.state.tokenId.length / 2
              )} ${props.state.nftMetadata.name}`}
            </SecondaryText>
          </div>
          <ImgCard>
            <Widget
              src="mob.near/widget/NftImage"
              props={{
                nft: {
                  tokenId: props.state.tokenId,
                  contractId: props.state.contractId,
                },
                className: "col-lg-12",
              }}
            />
          </ImgCard>
          <p>
            Collection Name:{" "}
            <span className="font-weight-bold">
              {props.state.nftMetadata.name}
            </span>
          </p>
          <p>
            NFT Name:{" "}
            <span className="">{props.state.tokenInfo.metadata.title}</span>
          </p>
          <p className="">
            Description: {props.state.tokenInfo.metadata.description}
          </p>
          <p>
            <a href={props.state.tokenInfo.media} target="_blank">
              {props.state.tokenInfo.media}
            </a>
          </p>
          {!props.state.ownsNFT && (
            <div className="alert alert-danger">
              <i className="bi bi-x"></i> You do not own this NFT & cannot list
              or transfer it
            </div>
          )}
          {props.state.ownsNFT && (
            <div className="alert alert-success">
              <i className="bi bi-x"></i> You own this NFT
            </div>
          )}
          <div className="col-lg-12">
            <h3> Listed Markets</h3>
            <div>
              <ul>
                {typeof props.state.tokenInfo.approved_account_ids ===
                  "object" &&
                  Object.keys(props.state.tokenInfo.approved_account_ids).map(
                    (key) => (
                      <li>
                        <a
                          href={"https://explorer.near.org/accounts/" + key}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {key}:{" "}
                          {props.state.tokenInfo.approved_account_ids[key]}
                        </a>
                      </li>
                    )
                  )}
              </ul>
            </div>
          </div>
        </BorderedShadowedCard>
        <div className="">
          <div className="">
            <input
              type="hidden"
              placeholder={props.state.contractId}
              onChange={(e) => props.onChangeContract(e.target.value)}
            />
          </div>
          <div className="">
            <input
              type="hidden"
              placeholder={props.state.tokenId}
              onChange={(e) => props.onChangeToken(e.target.value)}
            />
          </div>

          <div className="">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                checked={props.state.fewfar}
                onChange={props.selectFewFar}
                id="fewfarbox"
              />
              <label className="form-check-label" htmlFor="myCheckbox">
                List to Few and Far
              </label>
            </div>
          </div>
          {false && (
            <div className="">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={props.state.mintbase}
                  onChange={props.selectMintbase}
                  id="mintbasebox"
                />
                <label className="form-check-label" htmlFor="myCheckbox">
                  List to Mintbase
                </label>
              </div>
            </div>
          )}
          <div className="">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                checked={props.state.tradeport}
                onChange={props.selectTradeport}
                id="tradeportbox"
              />
              <label className="form-check-label" htmlFor="myCheckbox">
                List to Tradeport
              </label>
            </div>
          </div>
          <div className="">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                checked={props.state.custom}
                onChange={props.selectCustom}
                id="custombox"
              />
              <label className="form-check-label" htmlFor="myCheckbox">
                Enter Custom Marketplace Address
              </label>
            </div>
            {props.state.custom && (
              <div className="">
                Custom Marketplace
                <input
                  type="text"
                  placeholder={props.state.customMarketLink}
                  onChange={(e) => props.onChangeCustomMarket(e.target.value)}
                />
              </div>
            )}
            {props.state.custom && !props.state.validMarketLink && (
              <div className="alert alert-danger">
                <i className="bi bi-x"></i> Not a Valid NEAR Contract for your
                custom Marketplace
              </div>
            )}
            <div className=" mb-2">
              Enter Price You Want to List (In NEAR)
              <input
                type="number"
                placeholder={props.state.amount / 1e24}
                onChange={(e) => props.onChangeAmount(e.target.value)}
              />
              <p>
                * You will pay some gas in Ⓝ to deposit NEAR to marketplace
                address then list your NFT
              </p>
            </div>
          </div>
        </div>
      </Main>
      <div className="row text-center">
        {props.state.ownsNFT && (
          <button className="btn btn-primary mt-3" onClick={props.list}>
            List
          </button>
        )}

        {!props.state.ownsNFT && (
          <button className="btn btn-secondary mt-3">
            You Can Only List An NFT You Own
          </button>
        )}

        <a
          href={props.state.tradeportLink}
          target="_blank"
          rel="noopener noreferrer"
          class="btn btn-dark mt-3"
        >
          View on Tradeport
        </a>
      </div>
    </div>
  </>
);
