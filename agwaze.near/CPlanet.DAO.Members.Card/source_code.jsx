const daoId = props.daoId ?? "dao.near";

const Root = styled.div`
    width: 296px;
    height: 512px;
    border-radius: 8px;
    border: 1px solid #EFEFEF;
    background: #FFF;
    box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.10);
    .topImage {
        margin-bottom: 8px;
        img {
            width: 100%;
            height: 64px;
        }
    }
    .profile {
        padding: 8px;
        display: flex;
        align-items: center;
        img {
            width: 48px;
            height: 48px;
            margin-right: 10px;
            border-radius: 50%;
        }
        h1 {
            color: #000;
            font-family: Helvetica Neue;
            font-size: 16px;
            font-style: normal;
            font-weight: 700;
            line-height: 120%; /* 19.2px */
            margin-bottom: 0;
        }
        span {
            overflow: hidden;
            color: #B0B0B0;
            text-align: justify;
            text-overflow: ellipsis;
            font-family: Helvetica Neue;
            font-size: 12px;
            font-style: normal;
            font-weight: 400;
            line-height: 120%; /* 14.4px */
        }
    }
    .desc {
        padding: 6px 16px;;
        color: #000;
        font-family: Helvetica Neue;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        height: 100px;
        line-height: 148%; /* 23.68px */
    }
    button {
        display: flex;
        width: 264px;
        padding: 10px 20px;
        justify-content: center;
        align-items: center;
        gap: 10px;
        background: black;
        border-color: black;
        border-radius: 0;
        margin-left: 16px;
    }
`;

const MemberStat = styled.div`
    .date {
        padding: 7px 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        p {
            overflow: hidden;
            color: #000;
            text-overflow: ellipsis;
            font-family: Helvetica Neue;
            font-size: 12px;
            font-style: normal;
            font-weight: 700;
            line-height: 148%; /* 17.76px */
            text-transform: uppercase;
            margin-bottom: 0;
        }
        span {
            overflow: hidden;
            color: #000;
            text-overflow: ellipsis;
            font-family: Helvetica Neue;
            font-size: 16px;
            font-style: normal;
            font-weight: 300;
            line-height: normal;
        }
    }
    .groups {
        padding: 8px 16px;
        h1 {
            overflow: hidden;
            color: #000;
            text-overflow: ellipsis;
            font-family: Helvetica Neue;
            font-size: 12px;
            font-style: normal;
            font-weight: 700;
            line-height: 148%; /* 17.76px */
            text-transform: uppercase;
        }
        .tags {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            gap: 8px;
            p {
                border-radius: 100px;
                border: 1px solid #4498E0;
                background: rgba(68, 152, 224, 0.10);
                color: #4498E0;
                font-family: Helvetica Neue;
                font-size: 12px;
                font-style: normal;
                font-weight: 400;
                line-height: 120%; /* 14.4px */
                padding: 5px 8px;
                text-transform: capitalize;
            }
        }
    }
    .memberStat {
        padding: 0 16px;
        h1 {
            overflow: hidden;
            color: #000;
            text-overflow: ellipsis;
            font-family: Helvetica Neue;
            font-size: 12px;
            font-style: normal;
            font-weight: 700;
            line-height: 148%; /* 17.76px */
            text-transform: uppercase;
            margin-bottom: 0;
        }
        h5 {
            color: #B0B0B0;
            font-family: Helvetica Neue;
            font-size: 12px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            text-transform: capitalize;
        }
    }
`;

const profile = Social.get(`${daoId}/profile/**`, "final");
function makeAccountIdShorter(accountId) {
  if (accountId.length > shortenLength) {
    return accountId.slice(0, shortenLength) + "...";
  }
  return accountId;
}

console.log(profile);

return (
  <Root>
    <div className="topImage">
      <img
        src={
          profile.backgroundImage
            ? `https://ipfs.near.social/ipfs/${profile.backgroundImage.ipfs_cid}`
            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRub7hFLkStCvZiaSeiUGznP4uzqPPcepghhg&usqp=CAU"
        }
        alt=""
      />
    </div>
    <div className="profile">
      <img
        src={
          profile.image
            ? `https://ipfs.near.social/ipfs/${profile.image.ipfs_cid}`
            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRub7hFLkStCvZiaSeiUGznP4uzqPPcepghhg&usqp=CAU"
        }
      />
      <div className="names">
        <h1>{makeAccountIdShorter(profile.name) ?? "OG Badge (SBT) DAO"}</h1>
        <span>
          @{makeAccountIdShorter(daoId) ?? "@og-sbt.sputnik-dao.near"}
        </span>
      </div>
    </div>
    <div className="desc">
      {profile.description
        ? profile.description?.length > 100
          ? `${profile.description.substring(0, 100)}...`
          : profile.description
        : "Lorem ipsum dolor sit amet elit, sed do eiusmod tempor incididunt u labore et dolore magna aliqua. Ut enim ad mini quis nostrud labor nisi"}
    </div>
    <MemberStat>
      <div className="date">
        <div>
          <p>DAO Member Since</p>
          <span>{props.joined ?? "DEC 18, 2018"}</span>
        </div>
        <div>
          <p>Joined CPlanet</p>
          <span>N/A</span>
        </div>
      </div>
      <div className="groups">
        <h1>Groups</h1>
        <div className="tags">
          {props.tags ? (
            props.tags.map((data) => (
              <p key={data} className="tag">
                {data}
              </p>
            ))
          ) : (
            <p className="tag">Admin</p>
          )}
        </div>
      </div>
      <div className="memberStat">
        <h1>Member Stats</h1>
        <div className="date">
          <div>
            <p>{props.totalVotes ?? "9,9999"}</p>
            <h5>Votes Casted</h5>
          </div>
          <div>
            <p>{props.proposal ?? "9,9999"}</p>
            <h5>Proposal Accepted</h5>
          </div>
        </div>
      </div>
    </MemberStat>
    <button>Follow</button>
  </Root>
);
