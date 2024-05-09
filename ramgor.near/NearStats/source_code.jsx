const data = fetch(
  "https://front.near-staking.com/api/near/avg_block_time,tps,block_time_low,block_time_high,top_accounts,highest_tps?block_time_days=1&tps_days=3",
  {
    subscribe: true,
    method: "GET",
    headers: {
      Accept: "*/*",
    },
  }
);

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 2px;
`;

const StyledThead = styled.thead`
  background-color: #f1f1f1;
`;

const StyledTh = styled.th`
  border: 11px solid #aafa;
  padding: 18px;
  text-align: center;
`;

const StyledTr = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const StyledTd = styled.td`
  border: 1px solid #ddd;
  padding: 4px;
  text-align: left;
`;

const StyledHr = styled.hr`
  height: 1px;
  border: none;
  color: #000;
  background-color: #000;
  width: 100%;
  text-align: left;
  margin: 0 auto 0 0;
`;

const specialAccounts = {
  "earn.kaiching": "https://cosmose.co",
  "token.sweat": "https://sweateconomy.com",
  aurora: "https://aurora.plus",
  "app.nearcrowd.near": "https://nearcrowd.com",
  "asset-manager.orderly-network.near": "https://orderly.network",
};

if (data !== null && data.ok === false) {
  return (
    <div className="text-bg-light rounded-4 p-3 mb-3">
      <p>
        The component is undergoing essential maintenance. We apologize for any
        inconvenience this may cause and appreciate your understanding.
      </p>
    </div>
  );
} else {
  return (
    <div className="text-bg-light rounded-4 p-3 mb-3">
      {data !== null ? (
        <p>
          <div class="d-flex clearfix flex-wrap flex-column flex-sm-row">
            <div class="p-2">
              <div>TPS Now</div>
              <StyledHr />
              <span class="text-success h3">
                <b>{JSON.parse(data.body.tps).toFixed(0)}</b>
              </span>
              <small>in block: </small>
              <b>{JSON.parse(data.body.tps_block)}</b>
            </div>

            <div class="p-2">
              <div>
                TPS <b>3 Days</b> Peak
              </div>
              <StyledHr />
              <span class="text-success h2">
                <b>{JSON.parse(data.body.highest_tps).toFixed(0)}</b>
              </span>
              <small>in block: </small>
              <a
                target="_blank"
                href={
                  "https://nearblocks.io/blocks/" +
                  data.body.highest_tps_block_hash
                }
              >
                {JSON.parse(data.body.highest_tps_block)}
              </a>
            </div>
            <div class="p-2">
              <div>
                Avg Block Time <b>Now</b>
              </div>
              <StyledHr />
              <small>last 30 seconds</small>
              <span class="text-success h3">
                <b>{JSON.parse(data.body.avg_block_time).toFixed(2)}</b> sec
              </span>
              <StyledHr />
              <GridContainer>
                <div>
                  <div>1 Day High</div>
                  <span class="h5">
                    <b>{JSON.parse(data.body.block_time_high).toFixed(2)}</b>{" "}
                    sec
                  </span>
                </div>
                <div>
                  <div>1 Day Low</div>
                  <span class="h5">
                    <b>{JSON.parse(data.body.block_time_low).toFixed(2)}</b> sec
                  </span>
                </div>
              </GridContainer>
              <StyledHr />
            </div>
          </div>
          <div class="p-2">
            Top 5 Accounts
            <StyledTable>
              <StyledThead>
                <StyledTr>
                  <StyledTh>account/app</StyledTh>
                  <StyledTh>
                    TX <small>last 30 mins </small>
                  </StyledTh>
                </StyledTr>
              </StyledThead>
              <tbody>
                {data.body.topAccounts.map((account, index) => {
                  const url = specialAccounts[account.receiver_account_id];
                  return (
                    <StyledTr key={index}>
                      <StyledTd>
                        {url ? (
                          <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={account.receiver_account_id}
                          >
                            {specialAccounts[account.receiver_account_id]
                              ? new URL(
                                  specialAccounts[account.receiver_account_id]
                                ).hostname
                              : account.receiver_account_id}{" "}
                          </a>
                        ) : (
                          account.receiver_account_id
                        )}
                      </StyledTd>
                      <StyledTd>{account.number_of_transactions}</StyledTd>
                    </StyledTr>
                  );
                })}
              </tbody>
            </StyledTable>
          </div>

          <div class="p-2">
            <small>
              widget sponsored by{" "}
              <a
                target="_blank"
                style={{ color: "inherit" }}
                variant="caption"
                rel="nofollow"
                href="https://www.nearweek.com"
              >
                <b>NEARWEEK</b>
              </a>
            </small>
          </div>
        </p>
      ) : (
        <div>Loading ...</div>
      )}
    </div>
  );
}
