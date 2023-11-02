// const daoId = props.daoId ?? "dao.near";
const accountId = props.accountId ?? context.accountId;

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
margin-top: 40px;
border-right: 1px dashed #ccc;
    margin-bottom: 10px;
    flex: 0.5;
    padding: 20px 40px 10px 0;
  p {
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
display: flex;
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

const profile = props.profile ?? Social.getr(`${accountId}/profile`);

if (profile === null) {
  return "Loading";
}

console.log(profile);

const shortenLength = 22;

function makeAccountIdShorter(accountId) {
  if (accountId.length > shortenLength) {
    return accountId.slice(0, shortenLength) + "...";
  }
  return accountId;
}

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
        <a
          href={`/mob.near/widget/ProfilePage?accountId=${accountId}`}
          className="text-decoration-none"
        >
          <HeaderText>
            <h1>{accountId ? makeAccountIdShorter(accountId) : `Name`}</h1>
          </HeaderText>
        </a>
        <AmountSec>
          <div></div>
        </AmountSec>
      </CardBody>
    </Bottom>
  </CardRoot>
);
