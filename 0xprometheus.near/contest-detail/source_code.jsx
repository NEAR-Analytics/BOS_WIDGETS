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

const arts = props.contests;

return (
  <ArtCardContainer>
    {arts.map((art, index) => (
      <ArtCard key={index}>
        <img src={art.imageUrl} alt={art.title} />
        <h2>{art.title}</h2>
        <p>By {art.owner}</p>
        <p>{art.votes} Votes</p>
        <VoteButton onClick={() => handleVoteClick(art.id)}>Vote</VoteButton>
      </ArtCard>
    ))}
  </ArtCardContainer>
);
