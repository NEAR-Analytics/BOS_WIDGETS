// if (!props.tokenId) {
//   return <div></div>;
// }

const Label = styled.p`
  font-size: 1.1rem;
  color: #04111D;
  font-weight: 600;
  font-family: "SF Pro Display",sans-serif;
  line-height: 1.02;
  white-space: nowrap;
  margin: unset;
`;

const GrayLabel = styled.p`
  color: #6C757D;
  font-size: 14px;
`;
const SecondaryText = styled.h3`
  font-size: 1.1rem;
  color:#0f1d40;
  font-weight: 600;
  font-family: "SF Pro Display",sans-serif;
  line-height: 1.02;
  white-space: nowrap;
  
`;
const Card = styled.div`
  overflow: hidden;
`;
const BorderedShadowedCard = styled.div`
  display: flex;
   flex-flow: column nowrap;
   -ms-flex-flow:column nowrap;
   background-color: "#f0f0f0";
   margin: 0 auto;
   border-radius: 10px;
   border: 1.41429px solid rgba(28,27,28,.1);
   padding: 1rem;
   width: max-content;
   background-color:#fff;
   & img{
     border-radius: inherit;
   }
`;
const Main = styled.div`
    display: grid;
  gap: 3rem;
  align-content:center;
  grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
  justify-content: center;
  // background: linear-gradient(180deg,#e4f1fb,hsla(0,0%,85.1%,0));
  margin-top: 20px;
  width:100%;
  padding: 1rem;
`;

const ImgCard = styled.div`
  height:fit-content;
  max-height:500px;
  width:100%;
  max-width: 500px;
  border-radius: 1rem;
  margin: 0 auto;
  &>img{
  object-fit: contain;
  }
`;

const TopSellCard = styled.div`
  background-color: #E2E4E8;
  padding: 1rem;
  width:100%;
`;

const Text = styled.p`
  font-size: 14px;
  margin: unset;
`;

const GrayCard = styled.div`
  background-color: #E2E4E8;
  cusor: not-allowed;
`;

const BlueSub = styled.div`
 color: #0d99ff;
 font-size: .8rem;
`;
// {props.state.tokenId && (
return (
  <>
    <div className="container-fluid">
      <Main>
        <BorderedShadowedCard className="shadow">
          {/*<div>
            <SecondaryText>
              {`#...${props.state.tokenId?.slice(
                props.state.tokenId.length / 2
              )} ${props.state.nftMetadata.name}`}
            </SecondaryText>
          </div>*/}
          <ImgCard className="shadow">
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
          <div className="d-flex justify-content-between mt-3">
            <span>
              <BlueSub>Contract ID</BlueSub>
              <SecondaryText>
                {props.state.contractId || "Sample Contract"}
              </SecondaryText>
            </span>
            <span>
              <BlueSub>Collection Name</BlueSub>
              <SecondaryText className="font-weight-bold">
                {props.state.nftMetadata.name || "Sample Name"}
              </SecondaryText>
            </span>
          </div>
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
          <Card className="card rounded-4 shadow border border-2">
            <TopSellCard className="d-flex align-items-center">
              <Label>Sell Method</Label>
            </TopSellCard>
            <div className="p-3">
              <GrayLabel>
                Choose how you want to list you NFT for sale
              </GrayLabel>

              <div className="d-flex justify-content-between">
                <div
                  className="card rounded-4 shadow-sm p-3"
                  role="button"
                  style={{ borderColor: "#0D99FF" }}
                >
                  <Label className="text-center">SET PRICE</Label>
                  <Text>Sell the NFT at a fixed price</Text>
                </div>
                <GrayCard className="rounded-4 p-3">
                  <Label className="text-center">HIGHEST BID</Label>
                  <Text>Auction to the highest bidder</Text>
                </GrayCard>
              </div>
            </div>
          </Card>
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
          <div className="card rounded shadow p-3 mb-3">
            <SecondaryText>Description</SecondaryText>
            <p>{props.state.tokenInfo.metadata.description}</p>
          </div>
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
