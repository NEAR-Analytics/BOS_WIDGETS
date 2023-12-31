const daoId = props.daoId ?? "dao.near";

if (!daoId) {
  return "DAO ID not provided";
}

// -- Pikespeak API
const baseApi = "https://api.pikespeak.ai";
const publicApiKey = "36f2b87a-7ee6-40d8-80b9-5e68e587a5b5";

const CardRoot = styled.div`
    width: 315px;
    // width: 100%;
    height: fit-content;
    border-radius: 8px;
    background: #FFF;
    overflow: hidden;
    margin-bottom: 20px;
    box-shadow: 2px 2px 12px 0px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    border: 1px solid #EFEFEF;
    &:hover{
    border-color:#000;
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
text-align: right;
  p {
    margin-bottom: 10px;
    overflow: hidden;
    color: #B0B0B0;
    text-overflow: ellipsis;
    font-family: Helvetica Neue;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

const CardBody = styled.div`
padding: 0 16px;
  h1 {
    color: #000;
font-family: Helvetica Neue;
font-size: 20px;
font-style: normal;
text-transform: lowercase;
font-weight: 700;
line-height: normal;
  }
  h3 {
    overflow: hidden;
color: #000;
text-overflow: ellipsis;
whitespace: nowrap;
font-family: Helvetica Neue;
font-size: 16px;
font-style: normal;
font-weight: 400;
line-height: 148%; 
  }
`;

const AmountSec = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 20px;
  &>div {
margin: 20px 0; 
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    align-items: center;
    gap: .5rem;
    *{margin: unset;}
    span {
      color: #B0B0B0;
      font-family: Helvetica Neue;
      font-size: 8px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      text-transform: uppercase;
    }
    p {
        color: #000;
        font-family: Helvetica Neue;
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        text-transform: uppercase;
        display: flex;
        align-items: center;
        gap: 5px;
        span {
          color: #000;
          font-family: Helvetica Neue;
          font-size: 12px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
          text-transform: uppercase;
        }
    }
  }
`;

const Tags = styled.div`
    display:flex;
    gap: 7px;
    margin-left: 10px;
    margin-top: 40px;
    .tag {
         color: #FFF;
        font-family: Helvetica Neue;
        font-size: 24px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        border-radius: 50px;
        background: #F8F8F8;
        width: max-content;
        color: #B0B0B0;
        text-align: center;
        font-family: Helvetica Neue;
        font-size: 10px;
        font-style: normal;
        font-weight: 500;
        line-height: 150%; /* 15px */
        padding: 3px 10px;
    }
    .no-tag {
      opacity: 0;
    }
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
`;

const fetchApiConfig = {
  mode: "cors",
  headers: {
    "x-api-key": publicApiKey,
  },
};

const constructURL = (baseURL, paramObj) => {
  let params = "";
  for (const [key, value] of Object.entries(paramObj ?? {})) {
    params += `${key}=${value}&`;
  }
  params = params.slice(0, -1);
  return `${baseURL}?${params}`;
};

const fether = {
  balances: (accounts) => {
    return fetch(
      constructURL(`${baseApi}/account/balances`, { accounts }),
      fetchApiConfig
    );
  },
  proposalsStatus: (daoId) => {
    return fetch(
      constructURL(`${baseApi}/daos/proposals/status/${daoId}`),
      fetchApiConfig
    );
  },
};
const balances = fether.balances([daoId]);
const proposalsStatus = fether.proposalsStatus(daoId);

let activeProposalsCount;
let totalProposalsCount;
proposalsStatus.body &&
  proposalsStatus.body?.forEach((p) => {
    activeProposalsCount += p["InProgress"] ? parseInt(p["InProgress"]) : 0;
    totalProposalsCount += p["Total"] ? parseInt(p["Total"]) : 0;
  });
// --

// -- Social DB
const profile = Social.get(`${daoId}/profile/**`, "final");
// --

// -- Smart Contract
const policy = Near.view(daoId, "get_policy");
let members = [];
policy &&
  policy.roles.forEach((role) => {
    if (typeof role.kind.Group === "object") {
      members = members.concat(role.kind.Group);
    }
  });
members = [...new Set(members)];
// --

const shorten = (str, len) => {
  if (str.length <= len) {
    return str;
  }
  return str.slice(0, len) + "...";
};

const shortenNumber = (n) => {
  if (n < 1e3) return n;
  if (n >= 1e3 && n < 1e6) return (n / 1e3).toFixed(1) + "k";
  if (n >= 1e6 && n < 1e9) return (n / 1e6).toFixed(1) + "m";
  if (n >= 1e9 && n < 1e12) return (n / 1e9).toFixed(1) + "b";
  if (n >= 1e12) return (n / 1e12).toFixed(1) + "t";
};

const shortenLength = 22;

function makeAccountIdShorter(accountId) {
  if (accountId.length > shortenLength) {
    return accountId.slice(0, shortenLength) + "...";
  }
  return accountId;
}

return (
  <CardRoot>
    <a
      href={`#/agwaze.near/widget/CPlanet.DAO.index?daoId=${props.daoId}`}
      onClick={() => props.onButtonClick()}
    >
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
          <HeaderText>
            <h1>{daoId ? makeAccountIdShorter(daoId) : `DAO Name`}</h1>
          </HeaderText>
          <AmountSec>
            <div>
              <p>{`${props.totalFunds ?? "0"}N`}</p>
              <span>Total Funds</span>
            </div>
            <div>
              <p>
                {members.length ?? "0"}/
                <span>{policy.roles.length ? policy.roles.length - 1 : 0}</span>
              </p>
              <span>Members / Group</span>
            </div>
            <div>
              <p>
                {activeProposalsCount ?? "0"} /
                <span>{totalProposalsCount ?? 0}</span>
              </p>
              <span>Active / Total Proposal</span>
            </div>
          </AmountSec>
        </CardBody>
      </Bottom>
    </a>
  </CardRoot>
);
