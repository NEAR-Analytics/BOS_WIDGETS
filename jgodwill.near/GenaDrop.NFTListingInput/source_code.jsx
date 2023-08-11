// if (!props.tokenId) {
//   return <div></div>;
// }

const data = Social.keys("*/profile", "final");

if (!data) {
  return "Loading";
}

const accounts = Object.entries(data);

const allWidgets = [];

for (let i = 0; i < accounts.length; ++i) {
  const accountId = accounts[i][0];
  allWidgets.push(accountId);
}
console.log(allWidgets);

const tradeportLogo = (
  <svg
    width="30"
    height="30"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14.8066 4.86188L18.3425 8.39779L3.53591 23.2044L0 19.6685L14.8066 4.86188Z"
      fill="white"
    />
    <path
      d="M31.6022 21.6575L35.1381 25.1934L20.3315 40L16.7956 36.4641L31.6022 21.6575Z"
      fill="white"
    />
    <path
      d="M31.6022 11.9337L11.9337 31.6022L8.39779 28.0663L28.0663 8.39779L23.2044 3.53591L26.7403 0L40 13.2597L38.232 15.0276L36.4641 16.7956L31.6022 11.9337Z"
      fill="white"
    />
  </svg>
);

const Label = styled.p`
  font-size: 1.1rem;
  color: #04111D;
  font-weight: 600;
  font-family: "SF Pro Display",sans-serif;
  line-height: 1.02;
  white-space: nowrap;
  margin: unset;
  @media (max-width: 992px) {
    text-align:center;
  }
`;

const GrayLabel = styled.p`
  color: #6C757D;
  font-size: 14px;
  @media (max-width: 992px) {
    text-align:center;
  }
`;
const SecondaryText = styled.h3`
  font-size: 1.1rem;
  color:#0f1d40;
  font-weight: 600;
  font-family: "SF Pro Display",sans-serif;
  line-height: 1.02;
  white-space: nowrap;
  @media (max-width: 992px) {
    text-align:center;
  }
  
`;
const Card = styled.div`
  overflow: hidden;
    @media (max-width: 992px) {
     text-align:center;
   }
`;

const BorderedShadowedCard = styled.div`
  display: flex;
   flex-flow: column nowrap;
   -ms-flex-flow:column nowrap;
   background-color: "#f0f0f0";
   margin: 0 auto;
   border: 1.41429px solid rgba(28,27,28,.1);
   padding: 1rem;
   width: 100%;
   height: fit-content;
   background-color:#fff;
   & img{
     border-radius: inherit;
   }
   @media (max-width: 992px) {
     text-align:center;
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
  height:300px;
  display:flex;
  align-items:center;
  justify-content:center;
  max-height:500px;
  width:100%;
  max-width: 500px;
  border-radius: inherit;
  overflow:hidden;
  margin: 0 auto;
  & img{
  object-fit: cover;
  width:100%;
  height:100%;
  }
  object-fit:cover;
`;

const TopSellCard = styled.div`
  background-color: #E2E4E8;
  padding: 1rem;
  width:100%;
  @media (max-width: 810px) {
    flex-flow: column nowrap;
    text-align:center;
  }
`;

const Text = styled.p`
  font-size: 14px;
  margin: unset;
`;

const GrayCard = styled.div`
  background-color: #E2E4E8;
  cusor: not-allowed;
`;

const ChainCard = styled.div`
  display: flex;
  background-color: #EFF3F9;
  align-items:center;
  gap: 1rem;
  margin: 1rem auto;
  height: 60px;
  & img{
    width: 30px;
    height: 30px;
    object-fit: contain;
  }
  svg{
    background-color: #1d1d1d;
    padding: .3rem;
    border-radius: .3rem;
  }
`;

const PriceInput = styled.div`
  display: flex;
  padding: .2rem;
  &>input{
    border:none;
    outline: none;
    background: none;
    width:70px;
    padding: 0 .2rem;
    &:focus, &:active{
      border:none;
      box-shadow: none;
    }
  }
  &>img{
    width: 20px;
    object-fit: contain;
    margin: 0 .5rem;
  }
`;

const BlueSub = styled.div`
 color: #0d99ff;
 font-size: .8rem;
`;

const ResponsiveDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1rem;
  gap: 1rem;
  @media (max-width: 992px) {
    flex-flow: column nowrap;
    align-items:center;
    justify-conent:center;
    text-align: center;
  }
`;

const ViewOnTradeport = styled.div`
    width: 40%;
    align-self: flex-end;
 &>a{
   width:100%;
 }
   @media (max-width: 810px) {
     align-self:center;
   }
`;
console.log(props.state.tokenInfo.metadata.title);
// {props.state.tokenId && (
return (
  <>
    <div className="container-fluid">
      <Main>
        <BorderedShadowedCard className="shadow-sm rounded-4">
          <div>
            <SecondaryText>
              {props.state.tokenInfo.metadata.title || "NFT Name"}
            </SecondaryText>
          </div>
          <ImgCard className="shadow-sm">
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
          <ResponsiveDiv>
            <span>
              <BlueSub>Contract ID</BlueSub>
              <SecondaryText>
                {props.state.contractId.length > 6
                  ? `${props.state.contractId?.slice(
                      0,
                      5
                    )}...${props.state.contractId?.slice(
                      props.state.contractId.length - 8
                    )}`
                  : props.state.contractId || "Sample Contract"}
              </SecondaryText>
            </span>
            <span>
              <BlueSub>Collection Name</BlueSub>
              <SecondaryText className="font-weight-bold">
                {props.state.nftMetadata.name || "Sample Name"}
              </SecondaryText>
            </span>
          </ResponsiveDiv>
          <div className="card rounded-4 shadow-sm p-3 my-3">
            <SecondaryText>Description</SecondaryText>
            <p>{props.state.tokenInfo.metadata.description}</p>
          </div>
          <ViewOnTradeport>
            <a
              href={props.state.tradeportLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-dark mt-3"
            >
              View on Tradeport
            </a>
          </ViewOnTradeport>
          <p>
            <a href={props.state.tokenInfo.media} target="_blank">
              {props.state.tokenInfo.media}
            </a>
          </p>
          {/*{!props.state.ownsNFT && (
            <div className="alert alert-danger">
              <i className="bi bi-x"></i> You do not own this NFT & cannot list
              or transfer it
            </div>
          )}
          {props.state.ownsNFT && (
            <div className="alert alert-success">
              <i className="bi bi-x"></i> You own this NFT
            </div>
          )}*/}
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
          <Card className="card rounded-4 shadow-sm border">
            <TopSellCard className="d-flex align-items-center">
              <Label>Sell Method</Label>
            </TopSellCard>
            <div className="p-3">
              <GrayLabel>
                Choose how you want to list you NFT for sale
              </GrayLabel>

              <ResponsiveDiv>
                <div
                  className="card rounded-4 shadow-sm p-3"
                  role="button"
                  style={{ borderColor: "#0D99FF" }}
                >
                  <Label className="text-center">SET PRICE</Label>
                  <Text>Sell the NFT at a fixed price</Text>
                </div>
                <div className="card rounded-4 shadow-sm p-3">
                  <Label className="text-center">Transfer</Label>
                  <div className=" mb-2">
                    Receiver Address
                    <Typeahead
                      id="async-example"
                      isLoading={isLoading}
                      labelKey="search"
                      minLength={1}
                      options={allWidgets}
                      onChange={(value) => props.onChangeReceiver(value)}
                      placeholder="🔍 Search for a Near user..."
                      // renderMenuItemChildren={(option: accountId) => (
                      //   <div className="mb-2">
                      //     <Widget
                      //       src="mob.near/widget/Profile"
                      //       props={{ accountId }}
                      //     />
                      //   </div>
                      // )}
                    />
                  </div>
                  <div className="row">
                    {props.state.ownsNFT && props.state.validReceiver && (
                      <button
                        className="btn btn-primary mt-3"
                        onClick={props.transfer}
                      >
                        Transfer
                      </button>
                    )}
                    <div className="col-lg-6"></div>
                    {props.state.ownsNFT && !props.state.validReceiver && (
                      <button className="btn btn-warning mt-3">
                        Can't Transfer (Invalid Receiver)
                      </button>
                    )}
                    {!props.state.ownsNFT && props.state.validReceiver && (
                      <button className="btn btn-danger mt-3">
                        Can't Transfer (Don't Own)
                      </button>
                    )}
                  </div>
                </div>
              </ResponsiveDiv>
            </div>
          </Card>
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
          <div className="rounded-4 mt-3 border shadow-sm">
            <div className="p-3">
              <ResponsiveDiv>
                <Label>Price and listing option</Label>
                <div className="d-flex align-items-center gap-3">
                  <span>Price(In NEAR)</span>
                  <PriceInput className="border rounded">
                    <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMSAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE2LjU1MjggMS4wMTUyOEwxMi4zNzIyIDcuMjIyMjJDMTIuMzEyNyA3LjMxMTYxIDEyLjI4NzUgNy40MTk1NCAxMi4zMDE0IDcuNTI2MDRDMTIuMzE1MyA3LjYzMjU0IDEyLjM2NzMgNy43MzA0MiAxMi40NDc3IDcuODAxNTZDMTIuNTI4MiA3Ljg3MjcxIDEyLjYzMTcgNy45MTIzMSAxMi43MzkxIDcuOTEzMDVDMTIuODQ2NSA3LjkxMzc4IDEyLjk1MDUgNy44NzU1OSAxMy4wMzE5IDcuODA1NTZMMTcuMTQ3MiA0LjIzNjExQzE3LjE3MTMgNC4yMTQ1MyAxNy4yMDEyIDQuMjAwNDUgMTcuMjMzMiA0LjE5NTU3QzE3LjI2NTIgNC4xOTA2OCAxNy4yOTc5IDQuMTk1MjIgMTcuMzI3NCA0LjIwODYyQzE3LjM1NjggNC4yMjIwMyAxNy4zODE3IDQuMjQzNzEgMTcuMzk5MSA0LjI3MTA0QzE3LjQxNjQgNC4yOTgzNiAxNy40MjU0IDQuMzMwMTQgMTcuNDI1IDQuMzYyNVYxNS41Mzc1QzE3LjQyNSAxNS41NzE3IDE3LjQxNDQgMTUuNjA1MSAxNy4zOTQ4IDE1LjYzMzFDMTcuMzc1MiAxNS42NjExIDE3LjM0NzQgMTUuNjgyNCAxNy4zMTUyIDE1LjY5NDFDMTcuMjgzMSAxNS43MDU4IDE3LjI0ODEgMTUuNzA3MyAxNy4yMTUxIDE1LjY5ODRDMTcuMTgyIDE1LjY4OTUgMTcuMTUyNSAxNS42NzA3IDE3LjEzMDYgMTUuNjQ0NEw0LjY5MTY3IDAuNzU0MTY3QzQuNDkxNTkgMC41MTc5MSA0LjI0MjQ2IDAuMzI4MDYzIDMuOTYxNiAwLjE5NzgyNEMzLjY4MDczIDAuMDY3NTg1IDMuMzc0ODcgNy45Mjk3N2UtMDUgMy4wNjUyOCA3LjM2MDk0ZS0wOEgyLjYzMDU2QzIuMDY1NSA3LjM2MDk0ZS0wOCAxLjUyMzU4IDAuMjI0NDY5IDEuMTI0MDMgMC42MjQwMjVDMC43MjQ0NjggMS4wMjM1OCAwLjUgMS41NjU1IDAuNSAyLjEzMDU2VjE3Ljg2OTRDMC41IDE4LjQzNDUgMC43MjQ0NjggMTguOTc2NCAxLjEyNDAzIDE5LjM3NkMxLjUyMzU4IDE5Ljc3NTUgMi4wNjU1IDIwIDIuNjMwNTYgMjBDMi45OTQ4OCAyMC4wMDAxIDMuMzUzMTYgMTkuOTA2OCAzLjY3MTE5IDE5LjcyOTFDMy45ODkyMiAxOS41NTEzIDQuMjU2NCAxOS4yOTUxIDQuNDQ3MjIgMTguOTg0N0w4LjYyNzc4IDEyLjc3NzhDOC42ODczMiAxMi42ODg0IDguNzEyNDggMTIuNTgwNSA4LjY5ODYgMTIuNDc0QzguNjg0NzIgMTIuMzY3NSA4LjYzMjc0IDEyLjI2OTYgOC41NTIyOCAxMi4xOTg0QzguNDcxODIgMTIuMTI3MyA4LjM2ODMyIDEyLjA4NzcgOC4yNjA5MiAxMi4wODdDOC4xNTM1MiAxMi4wODYyIDguMDQ5NDggMTIuMTI0NCA3Ljk2ODA2IDEyLjE5NDRMMy44NTI3OCAxNS43NjM5QzMuODI4NjYgMTUuNzg1NSAzLjc5ODc4IDE1Ljc5OTYgMy43NjY3OSAxNS44MDQ0QzMuNzM0OCAxNS44MDkzIDMuNzAyMDggMTUuODA0OCAzLjY3MjYzIDE1Ljc5MTRDMy42NDMxNyAxNS43NzggMy42MTgyNiAxNS43NTYzIDMuNjAwOTIgMTUuNzI5QzMuNTgzNTggMTUuNzAxNiAzLjU3NDU4IDE1LjY2OTkgMy41NzUgMTUuNjM3NVY0LjQ1OTcyQzMuNTc1MDEgNC40MjU1MSAzLjU4NTU1IDQuMzkyMTMgMy42MDUxOSA0LjM2NDEyQzMuNjI0ODMgNC4zMzYxIDMuNjUyNjEgNC4zMTQ4MSAzLjY4NDc3IDQuMzAzMTNDMy43MTY5MyA0LjI5MTQ1IDMuNzUxOSA0LjI4OTk1IDMuNzg0OTQgNC4yOTg4M0MzLjgxNzk3IDQuMzA3NzIgMy44NDc0OCA0LjMyNjU1IDMuODY5NDQgNC4zNTI3OEwxNi4zMDY5IDE5LjI0NThDMTYuNTA3IDE5LjQ4MjEgMTYuNzU2MiAxOS42NzE5IDE3LjAzNyAxOS44MDIyQzE3LjMxNzkgMTkuOTMyNCAxNy42MjM3IDE5Ljk5OTkgMTcuOTMzMyAyMEgxOC4zNjgxQzE4LjY0OCAyMC4wMDAyIDE4LjkyNTIgMTkuOTQ1MiAxOS4xODM4IDE5LjgzODJDMTkuNDQyNSAxOS43MzEyIDE5LjY3NzUgMTkuNTc0MyAxOS44NzU1IDE5LjM3NjVDMjAuMDczNSAxOS4xNzg2IDIwLjIzMDUgMTguOTQzNyAyMC4zMzc3IDE4LjY4NTFDMjAuNDQ0OCAxOC40MjY1IDIwLjUgMTguMTQ5NCAyMC41IDE3Ljg2OTRWMi4xMzA1NkMyMC41IDEuNTY1NSAyMC4yNzU1IDEuMDIzNTggMTkuODc2IDAuNjI0MDI1QzE5LjQ3NjQgMC4yMjQ0NjkgMTguOTM0NSA3LjM2MDk0ZS0wOCAxOC4zNjk0IDcuMzYwOTRlLTA4QzE4LjAwNTEgLTkuNTY1MjRlLTA1IDE3LjY0NjggMC4wOTMxNzYgMTcuMzI4OCAwLjI3MDkxNEMxNy4wMTA4IDAuNDQ4NjUxIDE2Ljc0MzYgMC43MDQ5MjQgMTYuNTUyOCAxLjAxNTI4WiIgZmlsbD0iIzExMTgxQyIvPgo8L3N2Zz4K" />
                    <input
                      type="number"
                      placeholder={props.state.amount / 1e24}
                      onChange={(e) => props.onChangeAmount(e.target.value)}
                    />
                  </PriceInput>
                </div>
              </ResponsiveDiv>
            </div>
            <hr className="m-auto" />
            <GrayLabel className="mt-3 mx-3 mb-0">
              Select any of the NEAR marketplace where you want your NFTs to be
              listed on
            </GrayLabel>
            <div className="p-3">
              <ChainCard className="form-check rounded-4 p-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={props.state.fewfar}
                  onChange={props.selectFewFar}
                  id="fewfarbox"
                />
                <label className="form-check-label" htmlFor="myCheckbox">
                  <img src="https://production.cdn.fewfar.com/static/images/logo.svg" />
                  Few and Far
                </label>
              </ChainCard>
              {false && (
                <div className="">
                  <ChainCard className="form-check rounded-4 p-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={props.state.mintbase}
                      onChange={props.selectMintbase}
                      id="mintbasebox"
                    />
                    <label className="form-check-label" htmlFor="myCheckbox">
                      <img src="https://www.mintbase.xyz/favicon.ico" />
                      Mintbase
                    </label>
                  </ChainCard>
                </div>
              )}
              <div className="">
                <ChainCard className="form-check rounded-4 p-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={props.state.tradeport}
                    onChange={props.selectTradeport}
                    id="tradeportbox"
                  />
                  <label className="form-check-label" htmlFor="myCheckbox">
                    {/* <img src={tradeportLogo} />*/}
                    {tradeportLogo}
                    Tradeport
                  </label>
                </ChainCard>
              </div>
              <div className="">
                <ChainCard className="form-check rounded-4 p-3">
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
                </ChainCard>
                {props.state.custom && (
                  <div className="">
                    Custom Marketplace
                    <input
                      type="text"
                      placeholder={props.state.customMarketLink}
                      onChange={(e) =>
                        props.onChangeCustomMarket(e.target.value)
                      }
                    />
                  </div>
                )}
              </div>
              <GrayLabel>
                * You will pay some gas in Ⓝ to deposit NEAR to marketplace
                address then list your NFT
              </GrayLabel>
            </div>
            {props.state.custom && !props.state.validMarketLink && (
              <div className="alert alert-danger">
                <i className="bi bi-x"></i> Not a Valid NEAR Contract for your
                custom Marketplace
              </div>
            )}
          </div>
          <div className="d-flex flex-column align-items-center text-center">
            {props.state.ownsNFT && (
              <button
                type="button"
                className="btn btn-primary mt-3"
                onClick={props.list}
              >
                List
              </button>
            )}

            {!props.state.ownsNFT && (
              <button type="button" className="btn btn-secondary mt-3">
                You Can Only List An NFT You Own
              </button>
            )}
          </div>
        </div>
      </Main>
    </div>
  </>
);
