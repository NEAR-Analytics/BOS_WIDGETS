const nft = props.nft ?? {
  contractId: props.contractId || "nft.genadrop.near",
  tokenId: props.tokenId || 1694623717976,
};

const contractId = props.contractId || "nft.genadrop.near";
const tokenId = props.tokenId || 1694623717976;
const className = props.className ?? "img-fluid";
const style = props.style;
const alt = props.alt;
const thumbnail = props.thumbnail;
const fallbackUrl = props.fallbackUrl;
const loadingUrl =
  props.loadingUrl ??
  "https://ipfs.near.social/ipfs/bafkreidoxgv2w7kmzurdnmflegkthgzaclgwpiccgztpkfdkfzb4265zuu";

State.init({
  contractId,
  tokenId,
  description: "",
  text: "",
  message: false,
  listings: [],
  loadingBuying: false,
  title: "",
  owner: "",
  imageUrl: null,
});

const currentChainProps = {
  near: {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrJuxjGxj4QmyreE6ix4ygqm5pK9Nn_rdc8Ndw6lmJcd0SSnm2zBIc2xJ_My1V0WmK2zg&usqp=CAU",
    livePrice: "near",
    subgraph: "https://api.thegraph.com/subgraphs/name/prometheo/near-mainnet",
    chain: "near",
    id: "1112",
    explorer: "https://explorer.near.org/?query=",
    logoUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrJuxjGxj4QmyreE6ix4ygqm5pK9Nn_rdc8Ndw6lmJcd0SSnm2zBIc2xJ_My1V0WmK2zg&usqp=CAU",
  },
  aurora: {
    img: "https://s2.coinmarketcap.com/static/img/coins/200x200/14803.png",
    id: "1313161554",
    chain: "Aurora",
    explorer: "https://aurorascan.dev/",
    explorerTx: "https://aurorascan.dev/",
    livePrice: "ethereum",
    contract: "0xe93097f7C3bF7A0E0F1261c5bD88F86D878667B5",
    subgraph:
      "https://api.thegraph.com/subgraphs/name/prometheo/aurora-mainnet",
  },
  arbitrum: {
    img: "https://assets.coingecko.com/coins/images/16547/large/photo_2023-03-29_21.47.00.jpeg?1680097630",
    id: "42161",
    contract: "0x27E52A81975F5Fb836e79007E3c478C6c0E6E9FB",
    chain: "Arbitrum",
    explorer: "https://arbiscan.io/",
    explorerTx: "https://arbiscan.io/",
    livePrice: "ethereum",
    subgraph: "https://api.thegraph.com/subgraphs/name/prometheo/arbitrum",
  },
  celo: {
    img: "https://assets.coingecko.com/coins/images/11090/large/InjXBNx9_400x400.jpg?1674707499",
    id: "42220",
    livePrice: "celo",
    contract: "0x5616BCcc278F7CE8B003f5a48f3754DDcfA4db5a",
    explorer: "https://explorer.celo.org/address/",
    explorerTx: "https://explorer.celo.org/",
    chain: "Celo",
    subgraph: "https://api.thegraph.com/subgraphs/name/prometheo/celo-mainnet",
  },
  polygon: {
    img: "https://altcoinsbox.com/wp-content/uploads/2023/03/matic-logo.webp",
    id: "137",
    chain: "Polygon",
    livePrice: "matic-network",
    contract: "0x57Eb0aaAf69E22D8adAe897535bF57c7958e3b1b",
    explorer: "https://polygonscan.com/address/",
    explorerTx: "https://polygonscan.com/",
    subgraph:
      "https://api.thegraph.com/subgraphs/name/prometheo/polygon-mainnet",
  },
  aptos: {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqBinSwbRdx76qY4A3qvVkM9g_mKoGCBDT0sqTT02TgRvKquV2Vlc8fSRmLyuhBS3-CaA&usqp=CAU",
  },
  sui: {
    img: "https://blog.sui.io/content/images/2023/04/Sui_Droplet_Logo_Blue-3.png",
  },
};

const nftMetadata =
  nft.contractMetadata ?? Near.view(contractId, "nft_metadata");
const tokenMetadata =
  nft.tokenMetadata ??
  Near.view(contractId, "nft_token", {
    token_id: tokenId,
  }).metadata;

if (contractId !== state.contractId || tokenId !== tokenId) {
  State.update({
    contractId,
    tokenId,
    imageUrl: null,
  });
}

let imageUrl = null;

const handleBuyClick = (price, owner) => {
  const contract = new ethers.Contract(
    currentChainProps[props.chainState].contract,
    listAbi,
    Ethers.provider().getSigner()
  );

  const nftContract = contractId.split(tokenId)[0];
  State.update({
    loadingBuying: true,
  });
  contract
    .nftSale(price, tokenId, owner, nftContract, { value: price })
    .then((transactionHash) => transactionHash.wait())
    .then((ricit) => {
      console.log("does not get hiere", ricit);
      State.update({
        message: true,
        error: false,
        loadingBuying: false,
        text: `${currentChainProps[props.chainState].explorerTx}/tx/${
          ricit.transactionHash
        }`,
      });
    })
    .catch((err) => {
      console.log("couldnt finish", err);
      State.update({
        error: true,
        loadingBuying: false,
        text: err.reason,
      });
    });
};

function fetchTokens() {
  asyncFetch("https://graph.mintbase.xyz/mainnet", {
    method: "POST",
    headers: {
      "mb-api-key": "omni-site",
      "Content-Type": "application/json",
      "x-hasura-role": "anonymous",
    },
    body: JSON.stringify({
      query: `
          query MyQuery {
              mb_views_nft_tokens(
              where: { nft_contract_id: { _eq: "${contractId}" }, token_id: {_eq: "${tokenId}"}}
              order_by: {minted_timestamp: desc}
            ) {
                attributes {
                    attribute_display_type
                    attribute_value
                }
                media 
                owner
                token_id
                nft_contract_id
                description
                title
                listings {
                    price
                    unlisted_at
                    listed_by
                }
            }
          }
        `,
    }),
  }).then((res) => {
    if (res.ok) {
      const tokens = res.body.data.mb_views_nft_tokens;
      const token = tokens[0];
      State.update({
        description: token.description,
        owner: token.owner,
        listings: token.listings[0],
        title: token.title,
      });
      if (!token && props.chainState !== ("aptos" || "sui")) {
        let response = fetch(currentChainProps[props.chainState]?.subgraph, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `
            query MyQuery {
             nfts(where: {tokenID: "${tokenId}"}) {
                category
                chain
                createdAtTimestamp
                id
                isSold
                isListed
                price
                tokenID
                owner {
                    id
                }
                tokenIPFSPath
                transactions {
                  price
                }
                }
            }
        `,
          }),
        });

        const collectionData = response.body.data.nfts;

        if (collectionData) {
          const nftBody = collectionData.map((data) => {
            const fetchIPFSData = fetch(
              data.tokenIPFSPath.replace("ipfs://", "https://ipfs.io/ipfs/")
            );

            if (fetchIPFSData.ok) {
              const nft = fetchIPFSData.body;
              let nftObject = {};
              nftObject.contract_id = data.id;
              nftObject.sold = data.isSold;
              nftObject.isListed = data.isListed;
              nftObject.owner = data.owner.id;
              nftObject.price = data.price;
              nftObject.token_id = data.tokenID;
              nftObject.name = nft?.name;
              nftObject.description = nft?.description;
              nftObject.attributes = nft?.properties;
              nftObject.image = nft?.image.replace(
                "ipfs://",
                "https://ipfs.io/ipfs/"
              );
              return nftObject;
            }
          });
          State.update({
            title: nftBody[0].name,
            imageUrl: nftBody[0].image,
            owner: nftBody[0]?.owner,
            description: nftBody[0]?.description,
            price: nftBody[0].price,
          });
        }
      }
      if (!token) {
        const response = fetch("https://api.indexer.xyz/graphql", {
          method: "POST",
          headers: {
            "x-api-key": "Krqwh4b.bae381951d6050d351945c0c750f1510",
            "x-api-user": "Banyan",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `query MyQuery {
  ${props.chainState} {
    nfts(
      where: { contract_id: { _eq: "${contractId}" }, token_id: {_eq: "${tokenId}"}}
    ) {
      contract_id
      name
      media_url
      token_id
      media_type
      owner
      
      staked_owner
      listings {
        listed
        price
      }
      attributes {
        rarity
        value
        type
        score
      }
     }
     }
    }`,
          }),
        });
        const token = response.body.data[props.chainState].nfts;
        if (token) {
          State.update({
            title: token[0].name,
            listings: token[0].listings,
            attributes: token[0].attributes,
            imageUrl: token[0].media_url,
          });
        }
      }
    }
  });
}

fetchTokens();

if (nftMetadata && tokenMetadata) {
  let tokenMedia = tokenMetadata.media || "";

  imageUrl =
    tokenMedia.startsWith("https://") ||
    tokenMedia.startsWith("http://") ||
    tokenMedia.startsWith("data:image")
      ? tokenMedia
      : nftMetadata.base_uri
      ? `${nftMetadata.base_uri}/${tokenMedia}`
      : tokenMedia.startsWith("Qm") || tokenMedia.startsWith("ba")
      ? `https://ipfs.near.social/ipfs/${tokenMedia}`
      : tokenMedia;

  if (!tokenMedia && tokenMetadata.reference) {
    if (
      nftMetadata.base_uri === "https://arweave.net" &&
      !tokenMetadata.reference.startsWith("https://")
    ) {
      const res = fetch(`${nftMetadata.base_uri}/${tokenMetadata.reference}`);
      imageUrl = res.body.media;
    } else if (
      tokenMetadata.reference.startsWith("https://") ||
      tokenMetadata.reference.startsWith("http://")
    ) {
      const res = fetch(tokenMetadata.reference);
      imageUrl = JSON.parse(res.body).media;
    } else if (tokenMetadata.reference.startsWith("ar://")) {
      const res = fetch(
        `${"https://arweave.net"}/${tokenMetadata.reference.split("//")[1]}`
      );
      imageUrl = JSON.parse(res.body).media;
    }
  }

  if (!imageUrl) {
    imageUrl = false;
  }
}

const replaceIpfs = (imageUrl) => {
  if (state.oldUrl !== imageUrl && imageUrl) {
    const match = rex.exec(imageUrl);
    if (match) {
      const newImageUrl = `https://ipfs.near.social/ipfs/${match[1]}${
        match[2] || ""
      }`;
      if (newImageUrl !== imageUrl) {
        State.update({
          oldUrl: imageUrl,
          imageUrl: newImageUrl,
        });
        return;
      }
    }
  }
  if (state.imageUrl !== false) {
    State.update({
      imageUrl: false,
    });
  }
};

const getSender = () => {
  return !state.sender
    ? ""
    : state.sender.substring(0, 6) +
        "..." +
        state.sender.substring(state.sender.length - 4, state.sender.length);
};

if (state.sender === undefined) {
  const accounts = Ethers.send("eth_requestAccounts", []);
  if (accounts.length) {
    State.update({ sender: accounts[0] });
  }
}

const thumb = (imageUrl) =>
  thumbnail && imageUrl && !imageUrl.startsWith("data:image/")
    ? `https://i.near.social/${thumbnail}/${imageUrl}`
    : imageUrl;

const img = state.imageUrl !== null ? state.imageUrl : imageUrl;
const src = img !== false ? img : fallbackUrl;

const closeModal = () => State.update({ message: false });

const getUsdValue = (price) => {
  const res = fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${
      currentChainProps[props.chainState]?.livePrice
    }&vs_currencies=usd`
  );
  if (res.ok) {
    const multiplyBy = Object.values(res?.body)[0]?.usd;
    const value = multiplyBy * price.toFixed(2);
    return value.toFixed(4) !== "NaN" ? `$${value.toFixed(2)}` : 0;
  }
};

const PRICE_CONVERSION_CONSTANT =
  props.chainState == "near" ? 1000000000000000000000000 : 1000000000000000000;

const Main = styled.div`
    background-color: #f5f5f5;
    font-size: 16px;
    color: #333;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-style: italic;
    font-family: Playfair Display;
    font-weight: 500;
*{
    box-sizing: inherit;
    text-decoration: none;
    list-style: none;
    margin: 0;
    padding: 0;
    color: unset;
    font-family: 'Playfair Display';
}
.section{
    display: flex;
    align-items: center;
    padding: 1.5rem 5rem;
}

.hero{
    width: 100%;
    position: relative;
    background: rgb(179,139,8);
    background: -moz-linear-gradient(0deg, rgba(179,139,8,1) 0%, rgba(255,197,0,1) 100%);
    background: -webkit-linear-gradient(0deg, rgba(179,139,8,1) 0%, rgba(255,197,0,1) 100%);
    background: linear-gradient(0deg, rgba(179,139,8,1) 0%, rgba(255,197,0,1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#b38b08",endColorstr="#ffc500",GradientType=1);
    color: #000;
    align-content: center;
    margin: 0 auto;
    padding: 2rem inherit;
    height: 100vh;
     @media screen and (max-width: 767px){
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
    text-align: center;
    height: max-content;   
    }
}
.heroRight{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
}
.heroLeft{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem 0px;
}

.heroTitle{
    font-size: max(1.5rem, 5vw);
    font-weight: 700;
    line-height: 1.0;
    margin-bottom: 1rem;
}

.heroBody{
    opacity: .7;
}

.heroCTA, .artCTA{
    margin-top: 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 100%;
}

.button{
    padding: .5rem 1rem;
    border-radius: 5px;
    background-color: #000;
    color: #ffc500;
    font-size: 1.2rem;
    transition: all .3s ease-in-out;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.415);
}

.button:hover{
    background-color: #ffc500;;
    color: #000;
}
.button.sec{
    background: transparent;
    color: #000;
    background-color: #ffc500;
    border: none;
}

.button.sec:hover{
    color: #ffc500;
    background-color: #000;
}
.stats{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-top: 3rem;
    padding: 1rem 0px;
    gap: 1rem;
}
.stat{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: .5rem;
    padding: 0px 1rem;
    text-align: center;
}

.statSeparator{
    background-color: #ffc500;
    width: 3px;
    height: 60px;
}

.stat:last-child{
    border-right: none;
}

.statTitle{
    font-size: max(1.5rem, 2.4vw);
    font-weight: 700;
    line-height: 1.0;
}

.statBody{
    font-size: .8rem;
    line-height: 1.0;
  text-align: center;
  line-height: 17px;
  opacity: .7;
}
.featuredArt{
    width: 40vw;
    max-width: 500px;
    height: 100%;
    /* border-top-left-radius: 50px; */
    /* box shadow */
    box-shadow: 0px 0px 20px rgba(0,0,0,.5);
    clip-path: polygon(30% 16%, 84% 16%, 84% 100%, 16% 100%, 16% 28%);
    border-radius: .5rem;
}

.artCard{
    /* tranluscent card */
    border-radius: .5rem;
    padding: 2rem;
    margin: 1rem;
    /* box shadow */
    box-shadow: 0 15px 25px rgba(129, 124, 124, 0.2);
    /* make it glass like */
    /* background-color: rgba(255,255,255,.2); */
    /* backdrop-filter: blur(15px); */
    /* -webkit-backdrop-filter: blur(15px); */
    position: absolute;
    bottom: -60px;
    right: -3vw;
    width: 80%;
    max-width: 400px;
    height: 170px;
    /* z-index: 1; */
    /* glasslike more visible border */
    border: 1px solid rgba(255,255,255,.5);
    clip-path: polygon(26% 16%, 84% 16%, 84% 100%, 16% 100%, 16% 36%);
    color: #ffc501;
    padding-left:16%;
}

.featured{
    position: relative;
    width: fit-content;
}

.blurredBG, .artCard{
    background: rgba(255,255,255,.2);
}

.blurredBG>.blurbg{
    background-color: #ffc401d8;
    width: 100%;
    height: 100%;
}

.blurredBG{
    -webkit-filter: blur(14px);
    filter: blur(14px);
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-size: cover;
}
.cardContent{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    text-align: center;
    position: absolute;
    z-index: 1;
    color: #1c1c1c !important;
    left: 0;
    top: 10px;
    width: fit-content;
    height: fit-content;
}
.artName{
    font-size: .9rem;
    font-weight: 700;
    line-height: 1.0;
}

.artLHS{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    padding: 1rem 4rem;
    text-align: center;
    /* position: absolute; */
    z-index: 1;
    color: #1c1c1c !important;
    height: fit-content;
    width: fit-content;
}

@media screen and (max-width: 767px){
    .hero{
        flex-direction: column;
        flex-wrap: nowrap;
        justify-content: center;
        text-align: center;
        height: max-content;   
    }
    .heroCTA{
        justify-content: center;
    }
}
@media screen and (max-width: 540px){
    .stats{
        flex-direction: column;
        gap: 1rem;
    }
    .statSeparator{
        width: 60px;
    height: 2px;
    }
    .heroRight{
        display: none;
    }
}
`;

const ownerId = state.owner;
return (
  <Main>
    <div class="section hero">
      <div class="heroLeft">
        <h1 class="heroTitle">We are the global community for creatives</h1>
        <p class="heroBody">
          With CreativesDAO, artists have the freedom to express themselves and
          create impactful projects that promote decentralization and
          sustainability, spreading the blockchain gospel.
        </p>
        <div class="heroCTA">
          <a href="#" class="button">
            Join Us
          </a>
          <a
            href="https://www.creativesdao.org/funding"
            class="button sec"
            target="_blank"
          >
            Apply for funding
          </a>
        </div>
        {/*stats if necessary */}
        <div class="stats">
          <div class="stat">
            <h3 class="statTitle">50k</h3>
            <span class="statBody">NFTs minted</span>
          </div>
          <div class="statSeparator"></div>
          <div class="stat">
            <h3 class="statTitle">24+</h3>
            <span class="statBody">
              Countries With active creative communities
            </span>
          </div>
          <div class="statSeparator"></div>
          <div class="stat">
            <h3 class="statTitle">70+</h3>
            <span class="statBody">
              DAOs Associated with Creatives DAO (50% of active DAOS on NEAR)
            </span>
          </div>
        </div>
      </div>
      <div class="heroRight">
        <img
          class="featuredArt"
          src={
            src ||
            "https://genadrop.mypinata.cloud/ipfs/QmZbtU8RnMymJAJRpTriZgDXVeeCpm5RyXMJNquGoVc4Rb"
          }
        />
        {/*Custom artwork placed on Bid */}
        <div class="artCard">
          <div class="blurredBG">
            <div class="blurbg"></div>
          </div>
          <div class="cardContent">
            <div class="artLHS">
              <div class="artTitle">
                <div class="artName">{state.title}</div>
                <div class="artCreator">
                  <a
                    className="text-dark text-decoration-none text-truncate"
                    href={`#/mob.near/widget/ProfilePage?accountId=${state.owner}`}
                  >
                    <Widget
                      src="jgodwill.near/widget/Profile.ShortInlineBlock"
                      props={{ ownerId, tooltip: true }}
                    />
                  </a>
                </div>
              </div>
              <div class="artBody">{state.description}</div>
            </div>
            <div class="artRHS">
              <div class="artPrice"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="section create">
      <h2 class="sectionTitle">Create</h2>
      <div class="createCards">
        <a href="#" class="card">
          <div class="cardTitle">DAO</div>
          <div class="cardBody">Create your own DAO</div>
        </a>
        <a href="#" class="card">
          <div class="cardTitle">Artist Page</div>
          <div class="cardBody">Become an artist on Creative DAO</div>
        </a>
        <a href="#" class="card">
          <div class="cardTitle">NFT</div>
          <div class="cardBody">Create an NFT</div>
        </a>
      </div>
    </div>
    <div class="section create">
      <h2 class="sectionTitle">CDAO</h2>
      {/*funds flow */}
    </div>
    <div class="section create">
      <h2 class="sectionTitle">Case Studies</h2>
      {/*Show 3 posts, with a see all CTA that goes to explore posts */}
    </div>
    <div class="section create">
      <h2 class="sectionTitle">Featured NFTs</h2>
      {/*show featured NFTs. Show More CTA */}
    </div>
    <div class="section create">
      <h2 class="sectionTitle">Checkout our Communities</h2>
      {/*Pages from DAO. Pin top 3 Featured communities. show more CTA */}
    </div>
    <div class="section create">
      <h2 class="sectionTitle">Partners</h2>
      {/*working with NDC, Near Foundation, Minority Programmers */}
    </div>
    <div class="section create">
      <h2 class="sectionTitle">CDAO Community Calendar</h2>
      {/*CDAO Community Calendar */}
    </div>
  </Main>
);
