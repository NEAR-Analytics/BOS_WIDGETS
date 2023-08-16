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
   border: 1.41429px solid rgba(28,27,28,.1);
   padding: 1rem;
   width: 100%;
   height: fit-content;
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
  display:flex;
  align-items:center;
  justify-content:center;
  max-height:500px;
  width:100%;
  max-width: 500px;
  border-radius: inherit;
  overflow:hidden;
  aspect-ratio: 1/1;
  margin: 0 auto;
  &>img{
  object-fit: cover;
  }
  object-fit:cover;
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

const ChainCard = styled.div`
  display: flex;
  background-color: #EFF3F9;
  align-items:center;
  gap: 1rem;
  width: 300px;
  margin: 1rem auto;
  height: 60px;
  & img{
    width: 20px;
    height: 20px;
    object-fit: contain;
    margin-right: 5px;
  }
`;

const ChainCardMarket = styled.div`
  display: flex;
  background-color: #EFF3F9;
  align-items:center;
  gap: 1rem;
  cursor: pointer;
  width: 140px;
  margin: 1rem auto;
  height: 60px;
  & img{
    width: 20px;
    height: 20px;
    object-fit: contain;
    margin-right: 5px;
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

const Markets = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;

const BlueSub = styled.div`
 color: #0d99ff;
 font-size: .8rem;
`;

State.init({
  amount: 0,
});

const getUsdValue = (price) => {
  const res = fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=near&vs_currencies=usd`
  );
  if (res.ok) {
    const multiplyBy = Object.values(res?.body)[0]?.usd;
    const value = multiplyBy * price.toFixed(2);
    console.log(value.toFixed(4));
    return value.toFixed(4) !== "NaN" ? `$${value.toFixed(2)}` : 0;
  }
};

return (
  <>
    <div className="container-fluid">
      <Main>
        <BorderedShadowedCard className="shadow-sm rounded-4">
          <div>
            <SecondaryText>
              {/*{`...${props.state.tokenId?.slice(
                props.state.tokenId.length / 2
              )} ${props.state.nftMetadata.name}`}*/}
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
          <div className="d-flex justify-content-between mt-3">
            <span>
              <BlueSub>Contract ID</BlueSub>
              <SecondaryText>
                {props.state.contractId.length > 6
                  ? `...${props.state.contractId?.slice(
                      props.state.contractId.length - 4
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
          </div>
          <div className="card rounded-4 shadow-sm p-3 my-3">
            <SecondaryText>Description</SecondaryText>
            <p>{props.state.tokenInfo.metadata.description}</p>
          </div>
          {props.state.tradeportLink && (
            <a
              href={props.state.tradeportLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-dark mt-3"
              style={{ alignSelf: "flex-end" }}
            >
              View on Tradeport
            </a>
          )}
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
            {props.state.ownsNFT && <h3> Listed Markets</h3>}
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
              <Label>List Method</Label>
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
              </div>
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
              <div className="d-flex align-items-center justify-content-between">
                <Label>List Price</Label>
                <div className="d-flex align-items-center gap-3">
                  <span>{getUsdValue(props.state.amount / 1e24 || 0)}</span>
                  <PriceInput className="border rounded">
                    <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMSAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE2LjU1MjggMS4wMTUyOEwxMi4zNzIyIDcuMjIyMjJDMTIuMzEyNyA3LjMxMTYxIDEyLjI4NzUgNy40MTk1NCAxMi4zMDE0IDcuNTI2MDRDMTIuMzE1MyA3LjYzMjU0IDEyLjM2NzMgNy43MzA0MiAxMi40NDc3IDcuODAxNTZDMTIuNTI4MiA3Ljg3MjcxIDEyLjYzMTcgNy45MTIzMSAxMi43MzkxIDcuOTEzMDVDMTIuODQ2NSA3LjkxMzc4IDEyLjk1MDUgNy44NzU1OSAxMy4wMzE5IDcuODA1NTZMMTcuMTQ3MiA0LjIzNjExQzE3LjE3MTMgNC4yMTQ1MyAxNy4yMDEyIDQuMjAwNDUgMTcuMjMzMiA0LjE5NTU3QzE3LjI2NTIgNC4xOTA2OCAxNy4yOTc5IDQuMTk1MjIgMTcuMzI3NCA0LjIwODYyQzE3LjM1NjggNC4yMjIwMyAxNy4zODE3IDQuMjQzNzEgMTcuMzk5MSA0LjI3MTA0QzE3LjQxNjQgNC4yOTgzNiAxNy40MjU0IDQuMzMwMTQgMTcuNDI1IDQuMzYyNVYxNS41Mzc1QzE3LjQyNSAxNS41NzE3IDE3LjQxNDQgMTUuNjA1MSAxNy4zOTQ4IDE1LjYzMzFDMTcuMzc1MiAxNS42NjExIDE3LjM0NzQgMTUuNjgyNCAxNy4zMTUyIDE1LjY5NDFDMTcuMjgzMSAxNS43MDU4IDE3LjI0ODEgMTUuNzA3MyAxNy4yMTUxIDE1LjY5ODRDMTcuMTgyIDE1LjY4OTUgMTcuMTUyNSAxNS42NzA3IDE3LjEzMDYgMTUuNjQ0NEw0LjY5MTY3IDAuNzU0MTY3QzQuNDkxNTkgMC41MTc5MSA0LjI0MjQ2IDAuMzI4MDYzIDMuOTYxNiAwLjE5NzgyNEMzLjY4MDczIDAuMDY3NTg1IDMuMzc0ODcgNy45Mjk3N2UtMDUgMy4wNjUyOCA3LjM2MDk0ZS0wOEgyLjYzMDU2QzIuMDY1NSA3LjM2MDk0ZS0wOCAxLjUyMzU4IDAuMjI0NDY5IDEuMTI0MDMgMC42MjQwMjVDMC43MjQ0NjggMS4wMjM1OCAwLjUgMS41NjU1IDAuNSAyLjEzMDU2VjE3Ljg2OTRDMC41IDE4LjQzNDUgMC43MjQ0NjggMTguOTc2NCAxLjEyNDAzIDE5LjM3NkMxLjUyMzU4IDE5Ljc3NTUgMi4wNjU1IDIwIDIuNjMwNTYgMjBDMi45OTQ4OCAyMC4wMDAxIDMuMzUzMTYgMTkuOTA2OCAzLjY3MTE5IDE5LjcyOTFDMy45ODkyMiAxOS41NTEzIDQuMjU2NCAxOS4yOTUxIDQuNDQ3MjIgMTguOTg0N0w4LjYyNzc4IDEyLjc3NzhDOC42ODczMiAxMi42ODg0IDguNzEyNDggMTIuNTgwNSA4LjY5ODYgMTIuNDc0QzguNjg0NzIgMTIuMzY3NSA4LjYzMjc0IDEyLjI2OTYgOC41NTIyOCAxMi4xOTg0QzguNDcxODIgMTIuMTI3MyA4LjM2ODMyIDEyLjA4NzcgOC4yNjA5MiAxMi4wODdDOC4xNTM1MiAxMi4wODYyIDguMDQ5NDggMTIuMTI0NCA3Ljk2ODA2IDEyLjE5NDRMMy44NTI3OCAxNS43NjM5QzMuODI4NjYgMTUuNzg1NSAzLjc5ODc4IDE1Ljc5OTYgMy43NjY3OSAxNS44MDQ0QzMuNzM0OCAxNS44MDkzIDMuNzAyMDggMTUuODA0OCAzLjY3MjYzIDE1Ljc5MTRDMy42NDMxNyAxNS43NzggMy42MTgyNiAxNS43NTYzIDMuNjAwOTIgMTUuNzI5QzMuNTgzNTggMTUuNzAxNiAzLjU3NDU4IDE1LjY2OTkgMy41NzUgMTUuNjM3NVY0LjQ1OTcyQzMuNTc1MDEgNC40MjU1MSAzLjU4NTU1IDQuMzkyMTMgMy42MDUxOSA0LjM2NDEyQzMuNjI0ODMgNC4zMzYxIDMuNjUyNjEgNC4zMTQ4MSAzLjY4NDc3IDQuMzAzMTNDMy43MTY5MyA0LjI5MTQ1IDMuNzUxOSA0LjI4OTk1IDMuNzg0OTQgNC4yOTg4M0MzLjgxNzk3IDQuMzA3NzIgMy44NDc0OCA0LjMyNjU1IDMuODY5NDQgNC4zNTI3OEwxNi4zMDY5IDE5LjI0NThDMTYuNTA3IDE5LjQ4MjEgMTYuNzU2MiAxOS42NzE5IDE3LjAzNyAxOS44MDIyQzE3LjMxNzkgMTkuOTMyNCAxNy42MjM3IDE5Ljk5OTkgMTcuOTMzMyAyMEgxOC4zNjgxQzE4LjY0OCAyMC4wMDAyIDE4LjkyNTIgMTkuOTQ1MiAxOS4xODM4IDE5LjgzODJDMTkuNDQyNSAxOS43MzEyIDE5LjY3NzUgMTkuNTc0MyAxOS44NzU1IDE5LjM3NjVDMjAuMDczNSAxOS4xNzg2IDIwLjIzMDUgMTguOTQzNyAyMC4zMzc3IDE4LjY4NTFDMjAuNDQ0OCAxOC40MjY1IDIwLjUgMTguMTQ5NCAyMC41IDE3Ljg2OTRWMi4xMzA1NkMyMC41IDEuNTY1NSAyMC4yNzU1IDEuMDIzNTggMTkuODc2IDAuNjI0MDI1QzE5LjQ3NjQgMC4yMjQ0NjkgMTguOTM0NSA3LjM2MDk0ZS0wOCAxOC4zNjk0IDcuMzYwOTRlLTA4QzE4LjAwNTEgLTkuNTY1MjRlLTA1IDE3LjY0NjggMC4wOTMxNzYgMTcuMzI4OCAwLjI3MDkxNEMxNy4wMTA4IDAuNDQ4NjUxIDE2Ljc0MzYgMC43MDQ5MjQgMTYuNTUyOCAxLjAxNTI4WiIgZmlsbD0iIzExMTgxQyIvPgo8L3N2Zz4K" />
                    <input
                      type="number"
                      placeholder={props.state.amount / 1e24}
                      onChange={(e) => {
                        props.onChangeAmount(e.target.value);
                      }}
                    />
                  </PriceInput>
                </div>
              </div>
            </div>
            <hr className="m-auto" />
            <GrayLabel className="mt-3 mx-3 mb-0">
              Select any of the NEAR marketplace where you want your NFTs to be
              listed on
            </GrayLabel>
            <div className="p-3">
              <Markets>
                <ChainCardMarket
                  className={`${
                    props.state.fewfar ? "border border-primary" : ""
                  } rounded-2 p-2`}
                  onClick={props.selectFewFar}
                  onChange={props.selectFewFar}
                >
                  <img src="https://production.cdn.fewfar.com/static/images/logo.svg" />
                  Few & Far
                </ChainCardMarket>

                <ChainCardMarket
                  className={`${
                    props.state.tradeport ? "border border-primary" : ""
                  } rounded-2 p-2`}
                  onClick={props.selectTradeport}
                  onChange={props.selectTradeport}
                >
                  <label className="form-check-label" htmlFor="myCheckbox">
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAk1BMVEUqLTL///8oKzAeIigbHyUiJSsiJishJCoYHCMlKC77+/sWGyL39/chJSooLDEvMjfx8fESFx86PUFDRkpkZmmFhonm5+dXWV3P0NE1OD2vsLLj4+Ta2ttydHeAgYSQkZTCwsSioqRtb3K3uLleX2OoqauZmpwFDRdCREjLy8xLTVFQUlaMjpCChIeztLUyNjoAABA8wTUwAAAIkUlEQVR4nO1da0PqOhCEtNAGSqC8lZeAIvg4nv//6y4gR6G0w6CkaXszn72aOZPsbHY3vaWShYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFxf8P0vQCNEN5rxXTa9AK5b/3u67pVWiE8t9q5VaBKW4VLG/R6jqmV6IJyu0F5T3Fx2KquN2i5QNagyKqqOrT4B/D8mhQPBVVfVY+QlA4FZU/LZ9gVLCzuLeJUxTrLB5s4hT9x+JQ/LKJCMXChJsjmyjoRj22iUi4eS0ERWeWwG9nGi+e6eXdAO48mWF5uC4ARVVFFMedAlAUYfEpyvscb1QliB8SPlRxneXChqx2GNsW7hKp2M4uRfkxDBY+8YOijlQctRval/ozyObDLjOhKPp/cngWpdzsltdfUBtVPqGzmMmIKpsHWbi6i/BhRO1k7yxK7yt69KnqmRCI4iZz4eZLwT1F6paATWN4V9W+6Gsg3BNBRh2KooNM46GZpZ6GLEXWyt3YRfQ/O8G4mR0V5fmR4lSUpQ1S8S4rZ1HKGClGlIry4wFQzEp2I5uxQbH/wqmIKG4yoeKRTURUHDC2Le8gxQyomKDgXkXKNLCK5k1DOsC3RwMm4F8IN4ZN48wmTjBeM9fFSnsMfodh05Dwuj6mkstGG0lYNmsasTZxLcEOVHAHc6YhS0jBPnUDarSHlwiaMw0J08oRFUgbHYKgKdMANlFms7YqDjLfMGEa0CZIBauXgsw3Hj7SpnjBJm6r4P5XpmwauKrLJTMXbeIUD6luVFzwHFMtpOplmzjFsJ1ediPkHKykz23REhVFj/GQ2iSjcGElkMu32yjfTqKYUo4qxBys4haX+2SKqagoYI+Ts4l9dfwnWKZA8VKxmiOIzuAGybuRuikKZw7+/k3uvM0mCrJLoZei8OB1ibMJmGw/fMgKNMqN1o0qKnPwt7naUxUquPd1/G+g8ywKH9sEpyAU6DNxqa6hzHdM6eAnUM4K/F3SJpq4BnzIzPBGnWuaD0sc1/okyHVj4J1y+O3oKCvvP+q5LSoXEeRsQvh0L6aaWEfVNd2v6r3oTOjxPyunYB2d4+HHSQSpfsSrWNNF0AfzaOwWFUjBTfR2FB9RdT1BUW4PLK5FjYZe6Guvz65/Xsz9KtC2RaGCXFcbVuaG65gJE+clSrFFDbNcj9soCKNoHMEtxYiK2oLM+eD5EbiDISowWUiqFnovo6Mf48aRrge2CW48W9RhkGknlmC8o4Jqq6uJoI9sgts32CbGyQS3FNf9w4/VqFGk67ElCBbHvecRlR8quMM/FfWdwcTB8zI9/gRnZoeXpi29zv4sTvSMuW8zGUCQHH6CVYGLBHfhZlwOpnV1Az5nUO4ELK42qRO/Q4SI4Ii5NDsvw4mriSDaosE7RRCWPVqv1BBidV3RRRAsLqAUVCFs4LBvSPRceVV9AhQsT7ktii7NgdlHMtgmWtwZhIWrEVXX0QZsE+UJNesMbYK7U2oDvvC2pkxowzbRN7xFL9kEQxDahGkFb2ET3hwQbJlWULtNmD6D0Cbefm8TZcNvKeGNPuB8EE5qmH7yW5mAKFruUVEU2oTxb32Ij+SmQcARhDaRgS99yLtEilP/1zZhXMEdZEJ3qzajfBC24IJsfFlAenEUa9QtFNtEZr6aJNcxTQNKQYVtIjtfFaiGUYrBNGQIwsdMpm3iBJVoRb3HBBkVovJ/QAUZpeU6H4PqyUgEZxPKQ1uUrMw1m7qa2FFUj88idV3CZ5CzCeEsl8/pU6y9UUHGWYFsiLOJ/XD8UyU1ioeNytrEHChINnA+R1GWqVGsfLZ+SJtADRzOJsTzofz/lNpGrYRj1ibgE3uyQ/U90LfUVEA8x9Y03tKyCfH3aPziPjUVpWLKzQqXLEibOOlQ/UlNRcp/Q1T2IG0ijHxm4f5vWtZPwEFljxb36vl8pKznpKXiRYTviCBlEyruyrXS03C6HvUFKlxxW/Q5Nht6Y6K4fsAmaqtLlR6Tnjes9HTVrkMIFVxQt4m/84R0rzZ7Nk1ROegMBl2qriNBwr7igrk+hCiKBpSCFz7+1TYaUBW0idqCKj3CyeN+x+xT7jq0CYpgrE18wXATteQOsE38Op/tG/5kuztpAQVJm4AE78x+LsqHCnI28QynHgdmFXSQgtykhpLo0lwrmSVY7yKCb9SVK5yhWQFqF+iDs0AEuQ6VA/uUj2Y/vFdHBGtvlE04UEFN07IsnEek4Du1RetQwYXZKFpFyXatRxWuqsgmuI8vagRk2KMUfEYDSVw+qxXOIGmXkgpCmwheMtCh8pMizU1sIgMEtyrG2yFnE16WbeILfhzFFZVsZ9omjhDj+StJ3FYv2MTEM122+IYfCTe1VcgQhDYRLEL9C+cRuT2tBEMQ2kRtatwmTuEeq7hiWikXbhNdPY8qfoEj0+DOILQJbigwZXyZxsolCIoGzkWZSJw6DqOoK6aJgm0imGYqyHzD2c1Lc1sUzo5nyiZOES5anE1U4Gj1IhtNmFg4A2bER8Hq+NYmsktw1wi//DNYwQzaxLVQIXzeMM1MLvpTKA8GmWzaxDVQ7jSPNsEjtzbBQjXwC5wM2wSJOnq/kXGboOB0kYL5t4mSi4rHwTQTRadfwXtFWzT/NpFUkjsQ7OXeJrYpKyz/594mSg2soPFhoF/DfUUdqln+z6D3iILMpAAKIpuozXJ/myg1BjCTycrk6M/hPPYBwdmz6fX9GhIFmSLYRMkF03hBAWxiV5ZJfkj6lH+b2CH5iwOrIii4Q9Jz4Pv8R9F/iJ+MpfobeUHcs/z7omzRT5z/LxTmTH8jT4jOqKf3qjA1CO94o94XTcEdjk2DaoPnD9+mcV8Moz+HOCRwT/VCKrjDp2ksmSZqXrEzjfvUnrwagXCnRcpk4qAaBQ0yFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFsXHf5IqmaXdpKHQAAAAAElFTkSuQmCC" />
                    Tradeport
                  </label>
                </ChainCardMarket>
              </Markets>
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
                    Custom Marketplace
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
