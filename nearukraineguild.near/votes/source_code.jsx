State.init({
  data: null,
});

const fetchVotesData = async (query) => {
  const url = "https://mainnet.db.explorer.indexer.near.dev/query"; // Adjust the URL
  const body = `
    WITH votes as (
      SELECT
        receipt_predecessor_account_id as user,
        (args->>'args_json')::json->>'candidate' as candidate,
        MIN(to_timestamp(receipt_included_in_block_timestamp / 1000000000)) as time
      FROM action_receipt_actions
      WHERE
        receipt_receiver_account_id = 'nominations.ndc-gwg.near'
        AND action_kind = 'FUNCTION_CALL'
        AND args ->> 'method_name' = 'upvote'
        AND (args->>'args_json')::json->>'candidate' = 'vadim.near'
      GROUP BY receipt_predecessor_account_id, candidate
    )
    SELECT * FROM votes
    ORDER BY time DESC;
  `;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Adjust the content type if needed
    },
    body: JSON.stringify({ query: body }),
    responseType: "json", // Adjust the response type as needed
  };

  try {
    const response = fetch(url, options);
    console.log("response", response);
    return response.body;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

// Usage example
// const data = fetchVotesData();

if (data.ok) {
  const rows = data.body
    .split("\n")
    .map((line) => line.split("|"))
    .filter((data) => data.length === 3)
    .map((item) => (
      <tr>
        <td>
          <Widget
            src="mob.near/widget/Profile.ShortInlineBlock"
            props={{ accountId: item[0], tooltip: false }}
          />
        </td>
        <td class="align-top">
          <small>{item[2].substr(0, 19)}</small>
        </td>
      </tr>
    ));
  return (
    <>
      <h1>Fantastic users who voted for Vadim</h1>
      <a
        href="/nomination.ndctools.near/widget/NDC.Nomination.Candidate.Page?house=HouseOfMerit&accountId=vadim.near"
        class="btn btn-primary mt-2"
      >
        VOTE FOR VADIM!
      </a>
      <table class="table table-sm mt-4">
        <thead>
          <tr>
            <th scope="col">User</th>
            <th scope="col">Vote date (UTC)</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
      <p>
        <small>
          Data is retrieved automatically from the
          <a
            href="https://github.com/zavodil/near-nft-owners-list/blob/main/.github/workflows/indexed.yml"
            target="_blank"
          >
            NEAR Public indexer
          </a>{" "}
          with a slight delay.
        </small>
      </p>
    </>
  );
} else
  return (
    <>
      "Loading"
      <button onClick={fetchVotesData}>Click</button>
    </>
  );
