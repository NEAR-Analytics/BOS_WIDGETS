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
      <p>Please switch to BNB Chain</p>
      <a
        href={`https://academy.binance.com/en/articles/connecting-metamask-to-binance-smart-chain`}
      >
        Guide
      </a>
    </div>
  );
}

// Campaigns

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
  State.update({
    toast,
  });
};

const css = `
  button,
  button:disabled,
  button[disabled] {
    background: rgb(30, 239, 164);
    color: black;
    border: none;
    font-weight: bold;
    &:hover {
      border: rgb(30, 239, 164);
      background: rgb(16, 204, 137);
      color: black;
    }
  }
  button:disabled,
  button[disabled]{
    background: rgb(16, 204, 137, 0.5);
  }
  .main {
    padding: 32px 16px;
    padding: 16px;
    margin: auto;
    margin-top: -16px;
    width: 100%;
    max-width: 1000px;
    text-align: left;
    position: relative;
    background: black;
    border-radius: 0 0 16px 16px;
    color: rgb(199, 210, 215);
  }
  .boxes {
    margin: auto;
    max-width: 864px;
    display: flex;
    flex-flow: row wrap;
    > div {
      border: 1px solid #222;
      margin: 16px;
      padding: 8px;
      text-align: center;
      width: 256px;
      > img {
        width: 256px;
      }
      .break {
        margin: 16px 0 16px 0;
        height: 1px;
        background-size: 100%;
        background-image: url(https://galxe.com/_nuxt/img/bar.57178f2.png);
      }
      > button {
        margin-bottom: 12px;
      }
      > h4 {
        margin: 16px 0 16px 0;
        font-size: 1.2rem;
      }
      > p.not {
        color: rgb(168, 174, 186);
      }
    }
    
  }
`;

if (!css) return "";

if (!state.theme) {
  State.update({
    theme: styled.div`
    box-sizing: border-box;
    font-family: Sans-Serif;
    ${css}`,
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
      //subscribe: true,
      method: "POST",
      body: JSON.stringify({
        operationName: "CampaignInfoWidthAddress",
        variables: {
          address,
          id: "GCUtLUxWjp",
        },
        query:
          "query CampaignInfoWidthAddress($id: ID!, $address: String!) {\n  campaign(id: $id) {\n    ...CampaignDetailFrag\n    userParticipants(address: $address, first: 1) {\n      list {\n        status\n        premintTo\n        __typename\n      }\n      __typename\n    }\n    space {\n      ...SpaceDetail\n      isAdmin(address: $address)\n      __typename\n    }\n    isBookmarked(address: $address)\n    claimedLoyaltyPoints(address: $address)\n    childrenCampaigns {\n      ...CampaignDetailFrag\n      userParticipants(address: $address, first: 1) {\n        list {\n          status\n          __typename\n        }\n        __typename\n      }\n      parentCampaign {\n        id\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment CampaignDetailFrag on Campaign {\n  id\n  ...CampaignMedia\n  name\n  numberID\n  type\n  cap\n  info\n  useCred\n  formula\n  status\n  creator\n  thumbnail\n  gasType\n  isPrivate\n  createdAt\n  requirementInfo\n  description\n  enableWhitelist\n  chain\n  startTime\n  endTime\n  requireEmail\n  requireUsername\n  blacklistCountryCodes\n  whitelistRegions\n  rewardType\n  distributionType\n  rewardName\n  claimEndTime\n  loyaltyPoints\n  tokenRewardContract {\n    id\n    address\n    chain\n    __typename\n  }\n  tokenReward {\n    userTokenAmount\n    tokenAddress\n    depositedTokenAmount\n    tokenRewardId\n    __typename\n  }\n  nftHolderSnapshot {\n    holderSnapshotBlock\n    __typename\n  }\n  spaceStation {\n    id\n    address\n    chain\n    __typename\n  }\n  ...WhitelistInfoFrag\n  ...WhitelistSubgraphFrag\n  gamification {\n    ...GamificationDetailFrag\n    __typename\n  }\n  creds {\n    ...CredForAddress\n    __typename\n  }\n  credentialGroups(address: $address) {\n    ...CredentialGroupForAddress\n    __typename\n  }\n  dao {\n    ...DaoSnap\n    nftCores {\n      list {\n        capable\n        marketLink\n        contractAddress\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  rewardInfo {\n    discordRole {\n      guildId\n      guildName\n      roleId\n      roleName\n      inviteLink\n      __typename\n    }\n    premint {\n      startTime\n      endTime\n      chain\n      price\n      totalSupply\n      contractAddress\n      banner\n      __typename\n    }\n    loyaltyPoints {\n      points\n      __typename\n    }\n    loyaltyPointsMysteryBox {\n      points\n      __typename\n    }\n    __typename\n  }\n  participants {\n    participantsCount\n    bountyWinnersCount\n    __typename\n  }\n  __typename\n}\n\nfragment DaoSnap on DAO {\n  id\n  name\n  logo\n  alias\n  isVerified\n  __typename\n}\n\nfragment CampaignMedia on Campaign {\n  thumbnail\n  rewardName\n  type\n  gamification {\n    id\n    type\n    __typename\n  }\n  __typename\n}\n\nfragment CredForAddress on Cred {\n  id\n  name\n  type\n  credType\n  credSource\n  referenceLink\n  description\n  lastUpdate\n  credContractNFTHolder {\n    timestamp\n    __typename\n  }\n  chain\n  eligible(address: $address)\n  subgraph {\n    endpoint\n    query\n    expression\n    __typename\n  }\n  __typename\n}\n\nfragment CredentialGroupForAddress on CredentialGroup {\n  id\n  description\n  credentials {\n    ...CredForAddress\n    __typename\n  }\n  conditionRelation\n  conditions {\n    expression\n    eligible\n    __typename\n  }\n  rewards {\n    expression\n    eligible\n    rewardCount\n    rewardType\n    __typename\n  }\n  rewardAttrVals {\n    attrName\n    attrTitle\n    attrVal\n    __typename\n  }\n  claimedLoyaltyPoints\n  __typename\n}\n\nfragment WhitelistInfoFrag on Campaign {\n  id\n  whitelistInfo(address: $address) {\n    address\n    maxCount\n    usedCount\n    __typename\n  }\n  __typename\n}\n\nfragment WhitelistSubgraphFrag on Campaign {\n  id\n  whitelistSubgraph {\n    query\n    endpoint\n    expression\n    variable\n    __typename\n  }\n  __typename\n}\n\nfragment GamificationDetailFrag on Gamification {\n  id\n  type\n  nfts {\n    nft {\n      id\n      animationURL\n      category\n      powah\n      image\n      name\n      treasureBack\n      nftCore {\n        ...NftCoreInfoFrag\n        __typename\n      }\n      traits {\n        name\n        value\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  airdrop {\n    name\n    contractAddress\n    token {\n      address\n      icon\n      symbol\n      __typename\n    }\n    merkleTreeUrl\n    addressInfo(address: $address) {\n      index\n      amount {\n        amount\n        ether\n        __typename\n      }\n      proofs\n      __typename\n    }\n    __typename\n  }\n  forgeConfig {\n    minNFTCount\n    maxNFTCount\n    requiredNFTs {\n      nft {\n        category\n        powah\n        image\n        name\n        nftCore {\n          capable\n          contractAddress\n          __typename\n        }\n        __typename\n      }\n      count\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment NftCoreInfoFrag on NFTCore {\n  id\n  capable\n  chain\n  contractAddress\n  name\n  symbol\n  dao {\n    id\n    name\n    logo\n    alias\n    __typename\n  }\n  __typename\n}\n\nfragment SpaceDetail on Space {\n  id\n  name\n  info\n  thumbnail\n  alias\n  links\n  isVerified\n  discordGuildID\n  __typename\n}\n",
      }),
    }
  );

  State.update({
    data: JSON.parse(queryRes.body).data,
  });
};

init();

console.log("data", state.data);

if (!state.data)
  return (
    <Theme>
      <div class="main">
        <h2>SPACE ID Voyage Season 2 - Calling</h2>
        <p>Register a .bnb domain name and claim a Voyage Box</p>
        <Web3Connect connectLabel="Connect with Web3" />
      </div>
    </Theme>
  );

const handleClaim = (id) => {
  const queryRes1 = fetch(
    `https://galxe-proxy.near.workers.dev?url=https://graphigo.prd.galaxy.eco/query`,
    {
      method: "POST",
      body: JSON.stringify({
        operationName: "SufficientForGaslessChainQuery",
        variables: {
          id: "344",
          chains: ["BSC"],
        },
        query:
          "query SufficientForGaslessChainQuery($id: Int, $chains: [Chain!]!) {\n  space(id: $id) {\n    spaceBalance {\n      sufficientForGaslessClaimOnChain(chains: $chains) {\n        sufficient\n        chain\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n",
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
          "mutation PrepareParticipate($input: PrepareParticipateInput!) {\n  prepareParticipate(input: $input) {\n    allow\n    disallowReason\n    signature\n    nonce\n    mintFuncInfo {\n      funcName\n      nftCoreAddress\n      verifyIDs\n      powahs\n      cap\n      __typename\n    }\n    extLinkResp {\n      success\n      data\n      error\n      __typename\n    }\n    metaTxResp {\n      metaSig2\n      autoTaskUrl\n      metaSpaceAddr\n      forwarderAddr\n      metaTxHash\n      reqQueueing\n      __typename\n    }\n    solanaTxResp {\n      mint\n      updateAuthority\n      explorerUrl\n      signedTx\n      verifyID\n      __typename\n    }\n    aptosTxResp {\n      signatureExpiredAt\n      tokenName\n      __typename\n    }\n    tokenRewardCampaignTxResp {\n      signatureExpiredAt\n      verifyID\n      __typename\n    }\n    loyaltyPointsTxResp {\n      TotalClaimedPoints\n      __typename\n    }\n    __typename\n  }\n}\n",
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
    <Widget src="mattlock.near/widget/SPACEID-BNB" />

    <div class="main">
      <p>
        After registering a .bnb domain above, you will be eligible for the
        SPACE ID campaign below!
      </p>

      <h2>SPACE ID Voyage Season 2 - Calling</h2>
      <p>
        There are three types of Voyage Boxes of varying rarity, each containing
        random points that can be claimed. The box with the higher rarity will
        give you more points.
      </p>

      {state.toast && (
        <div class="toasted-container">
          <div class="toasted">
            {state.toast}
            <div class="close" onClick={() => State.update({ toast: null })}>
              ⨉
            </div>
          </div>
        </div>
      )}
      <div class="boxes">
        {state.data.campaign.childrenCampaigns.map(
          ({ id, name, whitelistInfo: { maxCount, usedCount } }, i) => {
            const eligible = maxCount - 1 === usedCount;
            return (
              <div key={id}>
                <h4>{name}</h4>
                <img src={dataMap[id].src} />
                <div class="break"></div>
                {eligible ? (
                  <p>You are eligible</p>
                ) : (
                  <p class="not">You are not eligible</p>
                )}
                <button disabled={!eligible} onClick={() => handleClaim(id)}>
                  Claim
                </button>
              </div>
            );
          }
        )}
      </div>
    </div>
  </Theme>
);
