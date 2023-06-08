if (
  state.chainId === undefined &&
  ethers !== undefined &&
  Ethers.send("eth_requestAccounts", [])[0]
) {
  Ethers.provider()
    .getNetwork()
    .then((chainIdData) => {
      if (chainIdData?.chainId) {
        State.update({ chainId: chainIdData.chainId });
      }
    });
}
if (state.chainId !== undefined && state.chainId !== 56) {
  return (
    <div>
      {" "}
      <p>Please switch to BNB Chain</p>{" "}
      <a
        href={`https://academy.binance.com/en/articles/connecting-metamask-to-binance-smart-chain`}
      >
        {" "}
        Guide{" "}
      </a>{" "}
    </div>
  );
}
//Campaigns
const dataMap = {
  GCr4FUxghP: {
    src: `https://cdn.galxe.com/galaxy/spaceid/1d471e0c-2783-4b52-90eb-3db0b2403198.png?optimizer=image&width=800&quality=100`,
  },
  GCi5FUxkZz: {
    src: `https://cdn.galxe.com/galaxy/spaceid/aa8dcc5b-fc27-47d8-bd1b-09b32440d5ac.png?optimizer=image&width=800&quality=100`,
  },
  GCiFFUxgPJ: {
    src: `https://cdn.galxe.com/galaxy/spaceid/3c115abf-2888-46c7-a83a-76d25de88989.png?optimizer=image&width=800&quality=100`,
  },
};
const toast = (toast) => {
  State.update({ toast });
};
const css = `  button,  button:disabled,  button[disabled] {    background: rgb(30, 239, 164);    color: black;    border: none;    font-weight: bold;    &:hover {      border: rgb(30, 239, 164);      background: rgb(16, 204, 137);      color: black;    }  }  button:disabled,  button[disabled]{    background: rgb(16, 204, 137, 0.5);  }  .main {    padding: 16px;    margin: auto;    margin-top: -16px;    width: 100%;    max-width: 1000px;    text-align: left;    position: relative;    background: black;    border-radius: 0 0 16px 16px;    color: rgb(199, 210, 215);  }  .boxes {    margin: auto;    max-width: 864px;    display: flex;    flex-flow: row wrap;    > div {      border: 1px solid #222;      margin: 16px;      padding: 8px;      text-align: center;      width: 256px;      > img {        width: 256px;      }      .break {        margin: 16px 0 16px 0;        height: 1px;        background-size: 100%;        background-image: url(https://galxe.com/_nuxt/img/bar.57178f2.png);      }      > button {        margin-bottom: 12px;      }      > h4 {        margin: 16px 0 16px 0;        font-size: 1.2rem;      }      > p.not {        color: rgb(168, 174, 186);      }    }      }`;
if (!css) return "";

if (!state.theme) {
  State.update({
    theme: styled.div`    box-sizing: border-box;    font-family: Sans-Serif;    ${css}`,
  });
}
const Theme = state.theme;
const init = () => {
  console.log("init");
  const name = Storage.get(NAME);
  let address;
  if (state.address === undefined) {
    const accounts = Ethers.send("eth_requestAccounts", []);
    if (accounts.length) {
      address = accounts[0];
      State.update({ address, name });
    }
  }
  if (!address) {
    address = state.address;
  }
  const queryRes = fetch(
    `https://galxe-proxy.near.workers.dev?url=https://graphigo.prd.galaxy.eco/query`,
    {
      subscribe: true,
      method: "POST",
      body: JSON.stringify({
        operationName: "CampaignInfoWidthAddress",
        variables: { address, id: "GCUtLUxWjp" },
        query:
          "query CampaignInfoWidthAddress($id: ID!, $address: String!) {  campaign(id: $id) {    ...CampaignDetailFrag    userParticipants(address: $address, first: 1) {      list {        status        premintTo        __typename      }      __typename    }    space {      ...SpaceDetail      isAdmin(address: $address)      __typename    }    isBookmarked(address: $address)    claimedLoyaltyPoints(address: $address)    childrenCampaigns {      ...CampaignDetailFrag      userParticipants(address: $address, first: 1) {        list {          status          __typename        }        __typename      }      parentCampaign {        id        __typename      }      __typename    }    __typename  }}fragment CampaignDetailFrag on Campaign {  id  ...CampaignMedia  name  numberID  type  cap  info  useCred  formula  status  creator  thumbnail  gasType  isPrivate  createdAt  requirementInfo  description  enableWhitelist  chain  startTime  endTime  requireEmail  requireUsername  blacklistCountryCodes  whitelistRegions  rewardType  distributionType  rewardName  claimEndTime  loyaltyPoints  tokenRewardContract {    id    address    chain    __typename  }  tokenReward {    userTokenAmount    tokenAddress    depositedTokenAmount    tokenRewardId    __typename  }  nftHolderSnapshot {    holderSnapshotBlock    __typename  }  spaceStation {    id    address    chain    __typename  }  ...WhitelistInfoFrag  ...WhitelistSubgraphFrag  gamification {    ...GamificationDetailFrag    __typename  }  creds {    ...CredForAddress    __typename  }  credentialGroups(address: $address) {    ...CredentialGroupForAddress    __typename  }  dao {    ...DaoSnap    nftCores {      list {        capable        marketLink        contractAddress        __typename      }      __typename    }    __typename  }  rewardInfo {    discordRole {      guildId      guildName      roleId      roleName      inviteLink      __typename    }    premint {      startTime      endTime      chain      price      totalSupply      contractAddress      banner      __typename    }    loyaltyPoints {      points      __typename    }    loyaltyPointsMysteryBox {      points      __typename    }    __typename  }  participants {    participantsCount    bountyWinnersCount    __typename  }  __typename}fragment DaoSnap on DAO {  id  name  logo  alias  isVerified  __typename}fragment CampaignMedia on Campaign {  thumbnail  rewardName  type  gamification {    id    type    __typename  }  __typename}fragment CredForAddress on Cred {  id  name  type  credType  credSource  referenceLink  description  lastUpdate  credContractNFTHolder {    timestamp    __typename  }  chain  eligible(address: $address)  subgraph {    endpoint    query    expression    __typename  }  __typename}fragment CredentialGroupForAddress on CredentialGroup {  id  description  credentials {    ...CredForAddress    __typename  }  conditionRelation  conditions {    expression    eligible    __typename  }  rewards {    expression    eligible    rewardCount    rewardType    __typename  }  rewardAttrVals {    attrName    attrTitle    attrVal    __typename  }  claimedLoyaltyPoints  __typename}fragment WhitelistInfoFrag on Campaign {  id  whitelistInfo(address: $address) {    address    maxCount    usedCount    __typename  }  __typename}fragment WhitelistSubgraphFrag on Campaign {  id  whitelistSubgraph {    query    endpoint    expression    variable    __typename  }  __typename}fragment GamificationDetailFrag on Gamification {  id  type  nfts {    nft {      id      animationURL      category      powah      image      name      treasureBack      nftCore {        ...NftCoreInfoFrag        __typename      }      traits {        name        value        __typename      }      __typename    }    __typename  }  airdrop {    name    contractAddress    token {      address      icon      symbol      __typename    }    merkleTreeUrl    addressInfo(address: $address) {      index      amount {        amount        ether        __typename      }      proofs      __typename    }    __typename  }  forgeConfig {    minNFTCount    maxNFTCount    requiredNFTs {      nft {        category        powah        image        name        nftCore {          capable          contractAddress          __typename        }        __typename      }      count      __typename    }    __typename  }  __typename}fragment NftCoreInfoFrag on NFTCore {  id  capable  chain  contractAddress  name  symbol  dao {    id    name    logo    alias    __typename  }  __typename}fragment SpaceDetail on Space {  id  name  info  thumbnail  alias  links  isVerified  discordGuildID  __typename}",
      }),
    }
  );
  State.update({ data: JSON.parse(queryRes.body).data });
};
init();
console.log("data", state.data);
if (!state.data)
  return (
    <Theme>
      {" "}
      <div class="main">
        {" "}
        <h2>SPACE ID Voyage Season 2 - Calling</h2>{" "}
        <p>Register a .bnb domain name and claim a Voyage Box</p>{" "}
        <Web3Connect connectLabel="Connect with Web3" />{" "}
      </div>{" "}
    </Theme>
  );

const handleClaim = (id) => {
  const queryRes1 = fetch(
    `https://galxe-proxy.near.workers.dev?url=https://graphigo.prd.galaxy.eco/query`,
    {
      method: "POST",
      body: JSON.stringify({
        operationName: "SufficientForGaslessChainQuery",
        variables: { id: "344", chains: ["BSC"] },
        query:
          "query SufficientForGaslessChainQuery($id: Int, $chains: [Chain!]!) {  space(id: $id) {    spaceBalance {      sufficientForGaslessClaimOnChain(chains: $chains) {        sufficient        chain        __typename      }      __typename    }    __typename  }}",
      }),
    }
  );
  const { sufficient } =
    queryRes1.body.data.space.spaceBalance.sufficientForGaslessClaimOnChain;
  if (!sufficient) {
    return toast("Not enough sufficient balance for gasless claim on chain!");
  }
  const queryRes2 = fetch(
    `https://galxe-proxy.near.workers.dev?a=123&url=https://graphigo.prd.galaxy.eco/query`,
    {
      method: "POST",
      body: JSON.stringify({
        operationName: "PrepareParticipate",
        variables: {
          input: {
            signature: "",
            campaignID: id,
            address: state.address,
            mintCount: 1,
            chain: "BSC",
            captcha: {
              lotNumber: "0974770267a14e8f8a4802d4750b16b3",
              captchaOutput:
                "pJEPZ0JxeomN0EEvex0UjDCjy5hTOjN16CmGspGRsg6YHH7F2uO0on-XbISrHxUVmUxSW_3LqveBUYDyaqCTIEKcs--6SnjyBdzLuCR-pK4PfAckYPRnPOkqQnyLR-TkX-osO08iP3n_VbG9yM8CIJNkQZYWGeypyG_ulQT-x2QdwXAsABTPo0vBHw43GCnrkwdROv5npo3RNdOG7bMVW87fOFenVFa9Q4X7fdnK6MAAyKr1j5bfdipX_c59G4J1rLP04nvJYi3QnFg_eqmVmQ==",
              passToken:
                "dd275b5ec2272a31df8c7c6664146b8fb48b4ea78d3d7140cf2a46d1b51930e9",
              genTime: "1682041909",
            },
          },
        },
        query:
          "mutation PrepareParticipate($input: PrepareParticipateInput!) {  prepareParticipate(input: $input) {    allow    disallowReason    signature    nonce    mintFuncInfo {      funcName      nftCoreAddress      verifyIDs      powahs      cap      __typename    }    extLinkResp {      success      data      error      __typename    }    metaTxResp {      metaSig2      autoTaskUrl      metaSpaceAddr      forwarderAddr      metaTxHash      reqQueueing      __typename    }    solanaTxResp {      mint      updateAuthority      explorerUrl      signedTx      verifyID      __typename    }    aptosTxResp {      signatureExpiredAt      tokenName      __typename    }    tokenRewardCampaignTxResp {      signatureExpiredAt      verifyID      __typename    }    loyaltyPointsTxResp {      TotalClaimedPoints      __typename    }    __typename  }}",
      }),
    }
  );
  try {
    const { TotalClaimedPoints } = data.prepareParticipate.loyaltyPointsTxResp;
    if (TotalClaimedPoints > 0) {
      return toast(`You received: ${TotalClaimedPoints} points!`);
    }
    throw "no points";
  } catch (e) {
    return toast(`Error claiming!`);
  }
};
return (
  <Theme>
    {" "}
    <Widget src="mattlock.near/widget/SPACEID-BNB" />{" "}
    <div class="main">
      {" "}
      <p>
        {" "}
        After registering a .bnb domain above, you will be eligible for the
        SPACE ID campaign below!{" "}
      </p>{" "}
      <h2>SPACE ID Voyage Season 2 - Calling</h2>{" "}
      <p>
        {" "}
        There are three types of Voyage Boxes of varying rarity, each containing
        random points that can be claimed. The box with the higher rarity will
        give you more points.{" "}
      </p>{" "}
      {state.toast && (
        <div class="toasted-container">
          {" "}
          <div class="toasted">
            {" "}
            {state.toast}{" "}
            <div class="close" onClick={() => State.update({ toast: null })}>
              {" "}
              ⨉{" "}
            </div>{" "}
          </div>{" "}
        </div>
      )}{" "}
      <div class="boxes">
        {" "}
        {state.data.campaign.childrenCampaigns.map(
          ({ id, name, whitelistInfo: { maxCount, usedCount } }, i) => {
            const eligible = maxCount - 1 === usedCount;
            return (
              <div key={id}>
                {" "}
                <h4>{name}</h4> <img src={dataMap[id].src} />{" "}
                <div class="break"></div>{" "}
                {eligible ? (
                  <p>You are eligible</p>
                ) : (
                  <p class="not">You are not eligible</p>
                )}{" "}
                <button disabled={!eligible} onClick={() => handleClaim(id)}>
                  {" "}
                  Claim{" "}
                </button>{" "}
              </div>
            );
          }
        )}{" "}
      </div>{" "}
    </div>{" "}
  </Theme>
);
