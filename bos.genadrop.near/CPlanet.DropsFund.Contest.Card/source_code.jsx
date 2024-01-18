const redFlag = (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
  <rect x="0.5" y="1" width="15" height="15" rx="7.5" fill="#FF7777"/>
  <rect x="0.5" y="1" width="15" height="15" rx="7.5" stroke="#FF7777"/>
  <path d="M9.69231 13.125C9.69231 14.1589 8.86412 15 7.84615 15C6.82818 15 6 14.1589 6 13.125C6 12.0911 6.82818 11.25 7.84615 11.25C8.86412 11.25 9.69231 12.0911 9.69231 13.125ZM6.21369 3.5906L6.52754 9.9656C6.54228 10.265 6.78556 10.5 7.08069 10.5H8.61162C8.90675 10.5 9.15002 10.265 9.16477 9.9656L9.47862 3.5906C9.49442 3.2693 9.24222 3 8.92546 3H6.76685C6.45009 3 6.19788 3.2693 6.21369 3.5906Z" fill="#FFEEEE"/>
</svg>
)

const nearGreen = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
  >
    <circle
      cx="7"
      cy="7"
      r="11.533"
      fill="#3BD07F"
      stroke="#3BD07F"
      stroke-width="0.933953"
    />
  </svg>
);

const Container = styled.div`
  border: 1px solid ${(p) => (p.selected ? "#3BD07F" : p.notOwner ? "#F777" :  "#eaeaea")};
  margin-bottom: 20px;
  @media (max-width: 500px) {
    width: 90%;
    margin-left: auto;
    margin-right: auto;
  }
`

const Root = styled.div`
  height: max-height;
  max-width: 1000px;
  display: flex;
  padding: 16px;
  border-bottom: 1px solid ${(p) => (p.selected ? "#3BD07F" : p.notOwner ? "#F777" :  "#eaeaea")};
  background: ${(p) => (p.selected ? "#E4FFF0" : p.notOwner ? "#FFF8F8" : "#fff")};
  @media (max-width: 500px) {
    width: 100% !important;
    max-width: 100% !important;
    margin-left: auto;
    margin-right: auto;
    flex-wrap: wrap;
    height: 100%;
  }
  .cardContent {
    width: 70%;
    @media (max-width: 500px) {
      width: 100%;
    }
  }
`;

const Image = styled.div`
  width: 144px;
  height: 144px;
  flex-shrink: 0;
  margin-right: 5px;
  background: rgba(160, 160, 160, 0.2);
  margin-right: 20px;
  img {
    width: 100%;
    border-radius: 6px;
    height: 100%;
    object-fit: cover;
  }
  @media (max-width: 500px) {
    width: 250px;
    height: 250px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 20px;
  }
`;

const Header = styled.div`  
  .headerName {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
  .dots {
    width: 7px;
    height: 7px;
    margin-bottom: 13px;
    margin-right: 5px;
    margin-left: 5px;
    background: #b0b0b0;
    border-radius: 50%;
  }
  h1 {
    color: #000;
    leading-trim: both;
    text-edge: cap;
    font-family: Helvetica Neue;
    font-size: 24px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
  p {
    color: #b0b0b0;
    font-family: Helvetica Neue;
    display: flex;
    align-item: center;
    font-size: 16px;
    font-style: normal;
    font-weight: 500; 
    line-height: normal
    span {
      color: ${(p) => (p.selected ? "#3BD07F" : "#b0b0b0")};
      font-weight: ${(p) => (p.selected ? "700" : "500")};
    }
  }
  img {
    width: 16px !important;
    height: 16px !important;
    margin: 5px 3px 0 5px;
    object-fit: cover;
    border-radius: 50%;
  }
`;

const NoProfile = styled.div`
  margin-top: 5px;
  margin: 5px 3px 0 5px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #808080;
`

const CardBody = styled.div`
  display: flex;
  width: 70%;
  .desc {
    min-width: 600px;
  }
  p {
    overflow: hidden;
    color: #b0b0b0;
    font-family: Helvetica Neue;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 148%; /* 23.68px */
  }
  @media (max-width: 500px) {
    .desc {
      min-width: inherit;
    }
  }
`;
const StartedButton = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 132px;
  .bannedUser {
    display: flex;
    margin-top: 5px;
    align-items: center: !important;
    svg {
      margin-right: 7px;
      width: 25px;
    }
    p {
      color: #F77;
      leading-trim: both;
      text-edge: cap;
      font-family: Helvetica Neue;
      font-size: 12px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }

  }
  .proposal {
    border-radius: 12px;
    width: max-content;
    border: 1px solid #3BD07F;
    background: #3BD07F;
    color: #E4FFF0;
    font-size: 12px;
    font-weight: 700;
    padding: 10px 15px;
    margin: 10px 0;
    margin-right: 40px;
    text-transform: uppercase;
  }
  .updateWinner {
    border-radius: 12px;
    width: max-content;
    border: 1px solid #3BD07F;
    background: #fff;
    color: #3BD07F;
    font-size: 12px;
    font-weight: 700;
    padding: 10px 15px;
    margin: 10px 0;
    margin-right: 40px;
    text-transform: uppercase;
  }
  .vote {
    gap: 8px;
    padding: 12px 30px;
    border-radius: 32px;
    border: 0.357px solid #000;
    background: #000;
    color: #fff;
    text-align: center;
    font-family: Helvetica Neue;
    font-size: 16px;
    font-weight: 500;
    :disabled {
      background: #b0b0b0;
      cursor: not-allowed;
    }
  }
  .banned {
    gap: 8px;
    padding: 12px 30px;
    border-radius: 32px;
    border: 0.357px solid #F77;
    background: #F77;
    color: #fff;
    text-align: center;

    font-family: Helvetica Neue;
    font-size: 16px;
    font-weight: 500;
    cursor: not-allowed;
  }
  .won {
    display: flex;
    width: max-content;
    padding: 8px 20px;
    border-radius: 32px;
    border: 1px solid #3bd07f;
    background: #e4fff0;
    gap: 8px;
    color: #3bd07f;
    font-family: Helvetica Neue;
    font-size: 16px;
    margin-right: 40px;
    font-weight: 700;
  }
  .disabled {
    height: 48px;
    gap: 8px;
    width: max-content;
    color: #b0b0b0;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    border: 2px solid #b0b0b0;
    background: none;
    border-radius: 32px;
    cursor: not-allowed;
    text-transform: uppercase;
    font-family: Helvetica Neue;
    margin-bottom: 10px;
  }
  .disabled:hover {
    background: none;
    border-color: #b0b0b0;
    color: #b0b0b0;
  }
  @media (max-width: 500px) {
    display: block;
  }
`;

const Popup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;

  align-items: center;
  justify-content: center;
  backdrop-filter: blur(5px); /* Apply background blur */
  z-index: 9999;
`;

const PopupContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  align-items: center;
  max-width: 500px;
  height: 400px;
  display: flex;
  flex-direction: column;
  width: 100%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  .modal-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    span {
      text-align: center;
      color: #b0b0b0;
    }
    h1 {
      text-align: center;
      font-size: 22px;
      font-weight: 600;
    }
    input {
      width: 80%;
      margin: 40px 0;
    }
    button {
      border-radius: 12px;
      width: 150px;
      border: 1px solid #000;
      background: #fff;
      color: #000;
      font-size: 12px;
      transition: .6s ease-in-out;
      font-weight: 700;
      padding: 10px 15px;
      margin: 10px 0;
      text-transform: uppercase;
    }
    button:hover {
      background: #000;
      color: #fff;
    }
  }
  .cancel-button {
    display: flex;

    width: 100%;
    flex-direction: row-reverse;
    
    h1 {
      cursor: pointer;
      font-weight: 900;
      text-align: center;
      font-size: 24px;
    }
    span {
      text-align: center;
      color: #b0b0b0;
    }
  }
}
.submit-header {
  h1 {
    font-size: 25px;
    text-transform: uppercase;
    font-weight: 700;
  }
}
`;

const handleVoteClick = () => {
  Near.call(
    "fund-vf.genadrop.near",
    "vote",
    {
      submission_owner: props.owner,
      contest_id: Number(props.contestId),
    },
    "300000000000000",
    "10000000000000000000000"
  );
};

const [isAccountConnected, setIsAccountConnected] = useState(!context.accountId)
const [winnerProposalId, setWinnerProposalId] = useState(null)
const [openModal, setOpenModal] = useState(false)
const [nftData, setNftData] = useState({})
const [isProposalPending, setIsProposalPending] = useState(false);

const formatTime = (time) => {
  const timestamp = time * 1000; // Convert seconds to milliseconds
  const date = new Date(timestamp);

  // Format the date to "Month day, year" (e.g., "Oct 31, 2023")
  const options = { month: "short", day: "numeric", year: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);

  return formattedDate;
};

const winnerDetails = Near.view(
  "fund-vf.genadrop.near",
  "get_winner_payout_info",
  {
    subscribe: true,
    contest_id: Number(props.contestId),
    winner: props.owner,
  }
);

const totalUsersVoted = Near.view(
  "fund-vf.genadrop.near",
  "get_all_user_voted",
  {
    subscribe: true,
    contest_id: Number(props.contestId),
  }
);

const handleOnMouseEnter = () => {
  setIsAccountConnected(true)
};
const handleOnMouseLeave = () => {
  setIsAccountConnected(false)
};


const profileImage = Social.getr(`${props?.owner}/profile`)

const overlay = (
  <div
    className='border m-3 p-3 rounded-4 bg-white shadow'
    style={{ maxWidth: "24em", zIndex: 1070 }}
    onMouseEnter={handleOnMouseEnter}
    onMouseLeave={handleOnMouseLeave}
  >
    Please connect to a Near Wallet to vote
  </div>
);

function fetchNFTDetails() {
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
          where: {nft_contract_id: {_eq: "${props?.content?.contract_id}"}, token_id: {_eq: "${props?.content?.token_id}"}}
          limit: 30
          order_by: {last_transfer_timestamp: desc}
        ) {
          nft_contract_id
          title
          description
          media
          owner
          last_transfer_receipt_id
        }
      }
      
      `,
    }),
  }).then((data) => {
    if(data.body.data?.mb_views_nft_tokens?.length) {
      setNftData(data.body.data?.mb_views_nft_tokens[0])
    }
  });
}

fetchNFTDetails()


function makeDescriptionShorter(desc) {
  if (desc.length > 200) {
    return desc.slice(0, 200) + "...";
  }
  return desc;
}

const gas = 200000000000000;
    const deposit = 100000000000000000000000;


let ftMetadata = {
      decimals: 24
};


const amountInYocto = Big(winnerDetails?.amount ?? 0)
        .mul(Big(10).pow(ftMetadata.decimals))
        .toFixed();



const lastProposalId = Near.view(props?.daoId, "get_last_proposal_id", {subscribe: true})



function handleCreateProposal() {
 Near.call([
    {
        contractName: props.daoId,
        methodName: "add_proposal",
        args: {
            proposal: {
                description: state.description ?? `Transfer proposal for ${props?.owner}, who has secured ${winnerDetails?.amount} as one of the winners of the ${props?.contestName}.`
                ,
                kind: {
                    Transfer: {
                        token_id: "",
                        receiver_id: props?.owner,
                        amount: amountInYocto
                    }
                }
            }
        },
        gas: gas,
        deposit: deposit
    },
    {
      contractName: "fund-vf.genadrop.near",
      methodName: "set_payout_proposal_id",
      args: {
          contest_id: Number(props?.contestId),
          proposal_id: lastProposalId,
          winner: props.owner,
      },
      gas: "300000000000000",
  }
])
}

const notOwner = nftData?.owner && props?.owner !== nftData?.owner

const userVoted = totalUsersVoted.includes(context.accountId)


return (
  <Container
    selected={
      props.winners ? props.winners?.some((data) => data === props.owner) : ""
    }
    notOwner={notOwner}
  >
  <Root
    selected={
      props.winners ? props.winners?.some((data) => data === props.owner) : ""
    }
    notOwner={notOwner}
  >
    <Image>
      <img src={props?.content?.image_url} alt="" />
    </Image>
    <div className="cardContent">
      <Header
        selected={
          props.winners
            ? props.winners?.some((data) => data === props.owner)
            : ""
        }
      >
        <h1>{props?.content?.title}</h1>
        <div className="headerName">
        <a
         href={`#/bos.genadrop.near/widget/GenaDrop.Profile.Main?accountId=${props.owner}`}
        >
        <p>
          NFT by {profileImage?.image?.ipfs_cid ? <img src={`https://ipfs.near.social/ipfs/${profileImage?.image?.ipfs_cid}`} /> : <NoProfile />} <span>{props?.owner}</span>
        </p>
        </a>
        <span className="dots"></span>
        <p>
          {formatTime(props?.content?.timestamp)}
        </p>
        </div>
      </Header>
      <CardBody>
        <div className="desc">
          <p>{makeDescriptionShorter(nftData?.description ?? "")}</p>
        </div>
      </CardBody>
    </div>
    <StartedButton>
      {!props.isClosed && !props.isOpen ? (
        <OverlayTrigger 
        show={isAccountConnected || !context.accountId} 
        trigger={['hover']} 
        delay={{ show: 250, hide: 300 }}
        overlay={overlay}
        placement='auto'
       
        >
        <button disabled={isAccountConnected || !context.accountId || notOwner || userVoted} onClick={handleVoteClick} 
        className={userVoted ? "disabled": notOwner ? "banned" : "vote"}>
          {userVoted ? "Already Voted": notOwner ? "Banned": "Vote"}
        </button>
        </OverlayTrigger>
      ) : props.winners?.some((data) => data === props.owner) ? (
        <p className="won">
          <img
            src="https://ipfs.near.social/ipfs/bafkreiawfm4tx4xxmqyzify4lmp45mfbqqxn4jkfwqdkg3zzkvlek5fjoi"
            alt=""
          />
          {winnerDetails?.amount} Won
        </p>
      ) : (
        <button className="disabled">
          {props.isOpen ? "Not Started" : "Contest Ended"}
        </button>
      )}
      {isProposalPending ?<button className="proposal">CREATING PROPOSAL...</button> :
        props.isClosed && props?.councilMember && !winnerDetails?.proposal_id && winnerDetails && (
          <>
          <button onClick={handleCreateProposal} className="proposal">CREATE PROPOSAL</button>
          </>
        )
      }
      {props?.owner === nftData?.owner || nftData?.owner === undefined ? "" : (
        <div className="bannedUser">
          {redFlag}
           <p className="">Owner no longer owns the NFT</p>
        </div>
      )}
       <p>{props?.content?.votes} Vote(s)</p>
    </StartedButton>
  </Root>
  {openModal && (
      <Popup>
        <PopupContent>
          <div className="cancel-button">
            <h1 role="button" onClick={() => setOpenModal(false)}>
              X
            </h1>
          </div>
          <div className="modal-content">
            <h1>Update Winner Details With Proposal ID</h1>
            <span>This would enable us to pull that proposal for this user so voting can commence</span>
            <input value={winnerProposalId} onChange={e => setWinnerProposalId(e.target.value)} type="number"  />
            <button onClick={handleUpdateWinnerDetails}>Update</button>
          </div>
            
        </PopupContent>
      </Popup>
    )}
  <Widget src="bos.genadrop.near/widget/CPlanet.DropsFund.Contest.Proposal" props={{daoId: props.daoId, proposalId: winnerDetails?.proposal_id }} />
  </Container>
);
