const Root = styled.a`
    cursor: pointer;
    :hover {
      text-decoration: none;
    }
    h1 {
        color: #000;
        font-family: Helvetica Neue;
        font-size: 24px;
        margin: 20px 0; 
        font-style: normal;
        font-weight: 500;
        line-height: 120%; /* 28.8px */
    }
    .profile {
        display: flex;
        h2 {
            color: #000;
            font-family: Helvetica Neue;
            font-size: 16px;
            font-style: normal;
            font-weight: 700;
            margin-bottom: 0;
            line-height: 120%; /* 19.2px */
        }
        span {
            overflow: hidden;
            color: #B0B0B0;
            text-align: justify;
            text-overflow: ellipsis;
            font-family: Helvetica Neue;
            font-size: 16px;
            font-style: normal;
            font-weight: 400;
            line-height: 120%; /* 19.2px */
        }
    }
    img {
        width: 48px;
        height: 48px;
        object-fit: cover;
        margin-right: 8px;
        border-radius: 50%;
    }
`;

const daoId = props.daoId ?? "dao.near";

const profile = Social.get(`${daoId}/profile/**`, "final");

function makeAccountIdShorter(accountId, shortenLength) {
  if (accountId.length > shortenLength) {
    return accountId.slice(0, shortenLength) + "...";
  }
  return accountId;
}

return (
  <Root
    href={
      props.isGateway
        ? `#/agwaze.near/widget/GenaDrop.Profile.Main?accountId=${daoId}`
        : `#/agwaze.near/widget/CPlanet.index?tab=profile&accountId=${daoId}`
    }
    onClick={() =>
      props.update({
        tab: "profile",
        accountId: daoId,
      })
    }
  >
    <div className="profile">
      <img
        src={
          profile.image
            ? `https://ipfs.near.social/ipfs/${profile.image.ipfs_cid}`
            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRub7hFLkStCvZiaSeiUGznP4uzqPPcepghhg&usqp=CAU"
        }
      />
      <div className="name">
        <h2>
          {props.name
            ? makeAccountIdShorter(profile.name, 90)
            : props.userId
            ? props.userId
            : "OG Badge (SBT) DAO"}
        </h2>
        <span>{props.userId ?? "@og-sbt.sputnik-dao.near"}</span>
      </div>
    </div>
  </Root>
);
