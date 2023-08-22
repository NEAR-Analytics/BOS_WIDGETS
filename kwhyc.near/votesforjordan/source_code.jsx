const data = fetch(
  "https://raw.githubusercontent.com/starpause/near-nft-owners-list/main/output_votes.txt"
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
      <h1>
        𝕽𝖊𝖘𝖕𝖊𝖈𝖙 𝕿𝖍𝖊 𝕽𝖎𝖉𝖊 𝕺𝖗 𝕯𝖎𝖊 𝕱𝖆𝖒
        <br />
        Who Voted for staRpauSe ᵏʷʰʸᶜ.ⁿᵉᵃʳ
      </h1>
      <a
        href="/nomination.ndctools.near/widget/NDC.Nomination.Candidate.Page?house=CouncilOfAdvisors&accountId=kwhyc.near"
        class="btn btn-primary mt-2"
      >
        VOTE FOR JORDAN!
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
