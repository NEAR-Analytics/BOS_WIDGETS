// const daoId = props.daoId ?? "dao.near";
const accountId = props.accountId ?? context.accountId;
const tooltip =
  props.tooltip && (props.tooltip === true ? title : props.tooltip);
if (!accountId) {
  return "Account ID not provided";
}

const CardRoot = styled.div`
    width: 315px;
    // width: 100%;
    height: fit-content;
    border: 1px solid #EFEFEF;
    border-radius: 8px;
    background: #FFF;
    overflow: hidden;
    box-shadow: 2px 2px 12px 0px rgba(0, 0, 0, 0.05);
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    *{
      font-family: Helvetica Neue; 
    }
    &>a{
      text-decoration: none;
    }
`;
const Top = styled.div`
    height: 72.195px;
   > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    position: relative;
    width: 100%;
    background: black;
    div {
      position: absolute;
      top: 40px;
      left: 10px;;
      img {
        width: 66px;
        height: 66px;
        object-fit: cover;
        flex-shrink: 0;
        border-radius: 50%;
        border 1px solid #fff;
      }
    }
`;

const Bottom = styled.div`
    h1 {
        overflow: hidden;
        color: #000;
        text-overflow: ellipsis;
        whitespace: nowrap;
        font-family: Helvetica Neue;
        font-size: 24px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        text-transform: uppercase;
    }
`;

const ImageProfile = styled.div`
  img {
    position: absolute;
    width: 66px;
    height: 66px;
    flex-shrink: 0;
    border: 1px solid white;
    border-radius: 50%;
    top: 45px;
    object-fit: cover;
    background: black;
    left: 16px;
  }
`;

const HeaderText = styled.div`
margin-top: 30px;
border-right: 1px dashed rgba(0, 0, 0, 0.30);
    flex: 1;
    padding: 20px 40px 10px 0px;
  p {
    color: #000; 
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 160%; /* 25.6px */ 
  }
`;

const CardBody = styled.div`
display: flex;
padding: 0 16px;
justify-content: space-between;
`;

const AmountSec = styled.div`
  flex: 1;
   margin: 45px 0; 
  &>.nfts {
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    align-items: center;
    // gap: .5rem;
    *{margin: unset;}
    .title {
        color: #000;
        font-family: Helvetica Neue;
        font-size: 12px;
        font-style: normal;
        font-weight: 500;
        line-height: 160%; /* 19.2px */ 
    }
    .details{
      font-size: 12px;
      font-style: normal;
      font-weight: 300;
      line-height: 160%; /* 19.2px */ 
    }
  }
`;

const profile = props.profile ?? Social.getr(`${accountId}/profile`);

if (profile === null) {
  return "Loading";
}

console.log(profile);

const shortenLength = 15;

function makeAccountIdShorter(accountId) {
  if (accountId.length > shortenLength) {
    return accountId.slice(0, shortenLength) + "...";
  }
  return accountId;
}
const inner = (
  <a
    href={`/bos.genadrop.near/widget/DropFlow.ArtistPage?accountId=${accountId}`}
    className="text-decoration-none"
  >
    <HeaderText>
      <p>{accountId ? makeAccountIdShorter(accountId) : `Name`}</p>
    </HeaderText>
  </a>
);

const response = fetch("https://graph.mintbase.xyz/mainnet", {
  method: "POST",
  headers: {
    "mb-api-key": "anon",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    query: `query counNFTs {
  mb_views_nft_tokens_aggregate(
    where: {owner: {_eq: "${accountId}"}}
  ) {
    aggregate {
      count
    }
  }
}
`,
  }),
});

const nftCount =
  response.ok &&
  response.body.data.mb_views_nft_tokens_aggregate.aggregate.count;

// console.log(fetchedNFTs);

const s = nftCount > 1 ? "s" : "";
return (
  <CardRoot>
    <Top>
      <img
        src={
          profile.backgroundImage
            ? `https://ipfs.near.social/ipfs/${profile.backgroundImage.ipfs_cid}`
            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRub7hFLkStCvZiaSeiUGznP4uzqPPcepghhg&usqp=CAU"
        }
        alt=""
      />
      <div>
        <img
          src={
            profile.image
              ? `https://ipfs.near.social/ipfs/${profile.image.ipfs_cid}`
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRub7hFLkStCvZiaSeiUGznP4uzqPPcepghhg&usqp=CAU"
          }
          alt=""
        />
      </div>
    </Top>
    <Bottom>
      <CardBody>
        {props.tooltip ? (
          <Widget
            loading={inner}
            src="jgodwill.near/widget/CPlanet.Profile.N.OverlayTrigger"
            props={{ accountId, children: inner }}
          />
        ) : (
          inner
        )}
        <AmountSec>
          <div className="nfts">
            <p className="title">Created</p>
            <p className="details">{`${nftCount} NFT${s}`}</p>
          </div>
        </AmountSec>
      </CardBody>
    </Bottom>
  </CardRoot>
);
