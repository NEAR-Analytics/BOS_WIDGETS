const ArtGalleryContainer = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const ArtCardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

const ArtCard = styled.div`
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 16px;
  text-align: center;
  transition: transform 0.2s ease-in-out;
  &:hover {
    position: relative;
    transform: scale(0.97);
  }

  h2 {
    font-size: 1.5rem;
    margin: 0;
  }

  p {
    color: #777;
    margin: 8px 0;
  }

  img {
    max-width: 100%;
    border-radius: 8px;
  }
`;

const VoteButton = styled.button`
  background-color: #007BFF;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const SubmitArtButton = styled.button`
  background-color: #28a745;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  margin: 5px 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #218838;
  }
`;

let arts = [];
if (!arts) {
  return <p>Loading</p>;
}
const contest_id = props.contests;

const contests =
  Near.view("cdao-v2.genadrop.near", "get_contest_arts", {
    contest_id: 1,
    subscribe: true,
  }) || [];

const handleVoteClick = (owner) => {
  Near.call(
    "cdao-v2.genadrop.near",
    "vote",
    {
      submission_owner: owner,
      contest_id: contest_id,
    },
    "",
    "10000000000000000000000"
  );
};

const handleArtSelection = (nft_data) => {
  console.log("details retrieved", nft_data);
  Near.call(
    "cdao-v2.genadrop.near",
    "submit_art",
    {
      nft_contract_id: nft_data.contractId,
      token_id: nft_data.tokenId,
      contest_id: 1,
    },
    "",
    "10000000000000000000000"
  );
};

const toggleArtSelection = () => {
  console.log("Long game....", state.showArtSelection);
  State.update({
    showArtSelection: !state.showArtSelection,
  });
};

return (
  <ArtGalleryContainer>
    <SubmitArtButton onClick={toggleArtSelection}>
      Make Art Entry
    </SubmitArtButton>
    <ArtCardContainer>
      {contests.map((art, index) => (
        <ArtCard key={index}>
          <img
            src={
              art[1].image_url ||
              "https://ipfs.near.social/ipfs/bafkreihdiy3ec4epkkx7wc4wevssruen6b7f3oep5ylicnpnyyqzayvcry"
            }
            alt={art[1].title}
          />
          <h2>{art[1].title}</h2>
          <p>By {art[0]}</p>
          <p>{art[1].votes} Votes</p>
          <VoteButton onClick={() => handleVoteClick(contest_id, art[0])}>
            Vote
          </VoteButton>
        </ArtCard>
      ))}
    </ArtCardContainer>
    {state.showArtSelection && (
      <Widget
        src="sainthiago.near/widget/nft-selector"
        props={{ accountId: context.accountId, onChange: handleArtSelection }}
      />
    )}
  </ArtGalleryContainer>
);
