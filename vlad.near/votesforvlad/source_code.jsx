const data = fetch(
  "https://raw.githubusercontent.com/vgrichina/near-nft-owners-list/main/output_votes.txt"
);

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
      <h2>
        Developers, Developers, Developers
        <br />
      </h2>

      <small>
        <i></i>
      </small>
      <br />

      <a
        href="/nomination.ndctools.near/widget/NDC.Nomination.Candidate.Page?house=HouseOfMerit&accountId=vlad.near"
        class="btn btn-primary mt-2"
      >
        VOTE FOR VLAD 👍
      </a>
      <br />

      <h2>Who Voted for vlad.near</h2>

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
          <i>
            Data is
            <a
              href="https://github.com/starpause/near-nft-owners-list/blob/main/.github/workflows/indexed.yml"
              target="_blank"
            >
              retrieved automatically
            </a>{" "}
            from the NEAR Public indexer with a slight delay.
          </i>
        </small>
      </p>
    </>
  );
} else return "Loading";
