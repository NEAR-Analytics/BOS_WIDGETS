const { candidate, selected, isWinning, selectCandidate } = props;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  font-size: 1.1rem;
  border-radius: 1rem;
  background-color: ${({ selected, isWinning }) =>
    selected
      ? isWinning
        ? "lightblue !important"
        : "#faa !important"
      : isWinning
      ? "lightgrey"
      : "#fcc"}};
  cursor: ${({ selected }) => (selected ? "unset;" : "pointer;")};

  &:hover {
    background-color: #d3ecf4;
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;

  img {
    border-radius: 0.3rem;
    width: 4rem;
    height: 4rem;
    margin: 0.6rem;
  }

  h3 {
    flex: 1 1 auto;
  }

  svg {
    width: 3rem;
    height: 3rem;
    cursor: pointer;
    margin-right: 1rem;

    &:hover {
      color: blue;
    }
  }

  &:last-child {
    flex: 1 1 auto;
  }
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  padding: 0.6rem;
  align-items: stretch;
  flex-wrap: wrap;
  gap: 0.4rem;

  h3 {
    width: 100%;
    font-size: 1.4rem;
    font-weight: 600;
    text-align: center;
  }
`;

const renderVoters = (voters) => (
  <List>
    {voters.map((voter) => (
      <Row key={voter}>
        <img
          src={`https://i.near.social/magic/thumbnail/https://near.social/magic/img/account/${voter}`}
          alt={voter}
        />
        <div>
          <a
            href={`mob.near/widget/ProfilePage?accountId=${voter}`}
            target="_blank"
            rel="noreferrer noopener"
          >
            {voter}{" "}
            <svg viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"
              ></path>
            </svg>
          </a>
        </div>
      </Row>
    ))}
  </List>
);

const renderFts = (fts) => (
  <List>
    {fts.map((ft) => (
      <Row key={ft.contract}>
        <img src={ft.ft_metas.icon} alt={`${ft.ft_metas.symbol} icon`} />
        <div>{ft.ft_metas.name}</div>
        <div className="balance">
          {Big(ft.amount).div(Big(10).pow(ft.ft_metas.decimals)).toFixed(2)}
        </div>
        <div className="symbol">{ft.ft_metas.symbol}</div>
      </Row>
    ))}
  </List>
);

const renderNfts = (nfts) => (
  <List>
    {nfts.map((nft) => (
      <Row key={nft.contract}>
        <img src={nft.nft_meta.icon} alt={`${nft.nft_meta.symbol} icon`} />
        <div>{nft.nft_meta.name}</div>
        <div className="balance">{nft.quantity}</div>
        <div className="symbol">{nft.nft_meta.symbol}</div>
      </Row>
    ))}
  </List>
);

return (
  <Card
    onClick={selected ? undefined : () => selectCandidate(candidate.nominee)}
    selected={selected}
    key={candidate.nominee}
    isWinning={isWinning}
  >
    <CardHeader>
      <img
        src={`https://i.near.social/magic/thumbnail/https://near.social/magic/img/account/${candidate.nominee}`}
        alt={candidate.nominee}
      />
      <h3>{candidate.nominee}</h3>
      {selected && (
        <svg viewBox="0 0 24 24" onClick={() => selectCandidate(null)}>
          <path
            fill="currentColor"
            d="M4,12H20V14H4V12M4,9H20V11H4V9M16,4L12,8L8,4H11V1H13V4H16M8,19L12,15L16,19H13V22H11V19H8Z"
          ></path>
        </svg>
      )}
    </CardHeader>
    <CardContent>
      <div>Votes: {candidate.voters.length}</div>
      {selected && renderVoters(candidate.voters)}
      <div>Total Fungible Tokens: {candidate.inventory.fts.length}</div>
      {selected && renderFts(candidate.inventory.fts)}
      <div>Total Non Fungible Tokens: {candidate.inventory.nfts.length}</div>
      {selected && renderNfts(candidate.inventory.nfts)}
    </CardContent>
  </Card>
);
