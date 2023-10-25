const Root = styled.div`
    
`;

const ImageSection = styled.div`
   background-image: url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRub7hFLkStCvZiaSeiUGznP4uzqPPcepghhg&usqp=CAU');
    height: 200px;
    width: 100%;
    position: relative;
    img {
        width: 160px;
        height: 160px;
        border-radius: 50%;
        position: absolute;
        top: 120px;
        border: 3px solid #fff;
        left: 20px;
    }
`;

const RightProfile = styled.div`
    margin-top: 104px;
    width: 380px;
    padding: 0 20px;
    .title {
        color: #000;
        font-family: Helvetica Neue;
        font-size: 24px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        text-transform: uppercase;
    }
    .username {
        overflow: hidden;
        color: #B0B0B0;
        text-overflow: ellipsis;
        font-family: Helvetica Neue;
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: 148%; /* 23.68px */
    }
    .description {
        color: #000;
        font-family: Helvetica Neue;
        font-size: 16px;
        font-style: normal;
        margin-top: 7px;
        font-weight: 400;
        line-height: 148%; /* 23.68px */
    }
    .buttons {
      .follow {
        width: 90%;
        height: 32px;
        background: #000;
        color: white;
        margin-bottom: 10px;
      }
      width: 100%;
    }
    .joinButton {
      display: flex;
      width: 90%;
      align-items: center;
      justify-content: space-between;
      button {
      background: black;
      border: 0;
      border-radius: 0;
        width: 48%

      }
    }
`;

const AmountSec = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 20px;
  div {
    span {
      color: #B0B0B0;
      font-family: Helvetica Neue;
      font-size: 8px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      text-transform: uppercase;
    }
    img {
      width: 15px;
      height: 15px;
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

const Button = styled.div`
width: 100%;
display: flex;
align-items: center;
justify-content: center;
margin-top: 10px;
  button {
    border: 1px solid black;
    border-radius: 0;
    color: white;
    background: black;
    text-align: center
    display: flex;
    width: 296px;
    padding: 7px 0px;
    cursor: pointer;
  }
  button:disabled {
    background: grey;
    border: grey;
    cursor: not-allowed;
  }
  button:hover {
    background: white;
    color: black;
    border-color: black;
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
`;

return (
  <Root>
    <ImageSection>
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRub7hFLkStCvZiaSeiUGznP4uzqPPcepghhg&usqp=CAU" />
    </ImageSection>
    <RightProfile>
      <h1 className="title">LOREM IPSUM DAO</h1>
      <span className="username">@lorem.ipsum.dono</span>
      <p className="description">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
      <AmountSec>
        <div>
          <span>Total Funds</span>
          <p>
            {props.totalFunds ?? "0"}/<span>0</span>
          </p>
        </div>
        <div>
          <span>Members / Group</span>
          <p>
            {members.length ?? "0"}/
            <span>{policy.roles.length ? policy.roles.length - 1 : 0}</span>
          </p>
        </div>
        <div>
          <span>Active / Total Proposal</span>
          <p>
            {activeProposalsCount ?? "0"} /
            <span>{totalProposalsCount ?? 0}</span>
          </p>
        </div>
      </AmountSec>
      <Tags>
        {profile.tags &&
          Object.keys(profile.tags).length > 0 &&
          Object.keys(profile.tags)
            .slice(0, 3)
            .map((data) => <div className="tag">{data}</div>)}
      </Tags>
      <div className="buttons">
        <button className="follow">Follow</button>
        <div className="joinButton">
          <button>Ask To Join</button>
          <button>Share</button>
        </div>
      </div>
    </RightProfile>
  </Root>
);
