const { candidate, selected, isWinning, selectCandidate, ftMetas, nftMetas } =
  props;

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

const List = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 0.4rem 2rem;
  gap: 0.4rem;
`;

const Row = styled.div`
  display: flex;
  align-items: center;

  &:not(:last-child) {
    border-bottom: 1px dashed darkgrey;
  }

  > *:not(img) {
    flex: 1 1 12rem;
    padding: 0.2rem 0.4rem;
  }

  img {
    width: 2rem;
    height: 2rem;
  }

  svg {
    width: 1.4rem;
    height: 1.4rem;
  }

  .balance {
    text-align: right;
  }

  .symbol {
    min-width: 5rem;
    max-width: 5rem;
    text-overflow: ellipsis;
    overflow: hidden;
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
    {fts
      .map(({ contractId, amount }) => {
        const metadata = ftMetas.find((meta) => meta.contractId === contractId);
        if (!metadata) {
          return null;
        }
        return (
          <Row key={contractId}>
            <img
              src={`https://ipfs-cache.meteorwallet.app/network/mainnet/fts/${contractId}/image`}
              alt={`${metadata.symbol} icon`}
            />
            <div>{metadata.name}</div>
            <div className="balance">{Number(amount).toFixed(2)}</div>
            <div className="symbol">{metadata.symbol}</div>
          </Row>
        );
      })
      .filter((val) => !!val)}
  </List>
);

const renderNfts = (nfts) => (
  <List>
    {nfts
      .map(({ contractId, quantity }) => {
        const metadata = nftMetas.find(
          (meta) => meta.contractId === contractId
        );
        if (!metadata) {
          return null;
        }
        return (
          <Row key={contractId}>
            <img
              src={`https://ipfs-cache.meteorwallet.app/network/mainnet/nfts/${contractId}/image`}
              alt={`${metadata.symbol} icon`}
            />
            <div>{metadata.name}</div>
            <div className="balance">{quantity}</div>
            <div className="symbol">{metadata.symbol}</div>
          </Row>
        );
      })
      .filter((val) => !!val)}
  </List>
);

const renderEvmAddresses = (addresses) => (
  <List>
    {addresses
      .map((address) => {
        return (
          <Row key={address}>
            <div>
              <a
                href={`https://debank.com/profile/${address}`}
                target="_blank"
                rel="noreferrer noopener"
              >
                {address}{" "}
                <svg viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"
                  ></path>
                </svg>
              </a>
            </div>
          </Row>
        );
      })
      .filter((val) => !!val)}
  </List>
);

let holdings;
if (candidate.fts) {
  holdings = 0;
  for (const { contractId, amount } of candidate.fts) {
    holdings +=
      (ftMetas.find((meta) => meta.contractId === contractId)?.price ?? 0) *
      Number(amount);
  }
}
if (candidate.amount) {
  if (holdings == null) holdings = 0;
  holdings +=
    (ftMetas.find((meta) => meta.contractId === "wrap.near")?.price ?? 0) *
    Big(candidate.amount).div(Big(10).pow(24)).toNumber();
}

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
      <div>Votes: {candidate.voters?.length ?? "?"}</div>
      {selected && candidate.voters && renderVoters(candidate.voters)}
      <div>
        Created:{" "}
        {candidate.created
          ? new Date(candidate.created / 1_000_000).toLocaleString()
          : "?"}
      </div>
      <div>Total Transactions: {candidate.txCount ?? "?"}</div>
      <div>Wallet Holdings: {holdings.toFixed(2) ?? "?"} USD</div>
      <div>
        Near:{" "}
        {candidate.amount &&
          Big(candidate.amount).div(Big(10).pow(24)).toFixed(2)}
      </div>
      <div>Total Fungible Tokens: {candidate.fts?.length ?? "?"}</div>
      {selected && candidate.fts && renderFts(candidate.fts)}
      <div>Total Non Fungible Tokens: {candidate.nfts?.length ?? "?"}</div>
      {selected && candidate.nfts && renderNfts(candidate.nfts)}
      <div>
        Probable EVM addresses:{" "}
        {selected
          ? candidate.ethAddresses
            ? renderEvmAddresses(candidate.ethAddresses)
            : "?"
          : candidate.ethAddresses?.length ?? "-"}
      </div>
    </CardContent>
  </Card>
);
