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
      <h2>
        𝕵𝖔𝖗𝖉𝖆𝖓 𝖋𝖔𝖗 𝕮𝖔𝖚𝖓𝖈𝖎𝖑
        <br />
      </h2>

      <small>
        <i>
          Who made NFT on Near? 𝕵𝖔𝖗𝖉𝖆𝖓 <br />
          Who made DAO on Near? 𝕵𝖔𝖗𝖉𝖆𝖓 <br />
          Who made Near? not 𝕵𝖔𝖗𝖉𝖆𝖓 but he can tell you!
        </i>
      </small>
      <br />

      <a
        href="/nomination.ndctools.near/widget/NDC.Nomination.Candidate.Page?house=CouncilOfAdvisors&accountId=kwhyc.near"
        class="btn btn-primary mt-2"
      >
        VOTE FOR JORDAN 👍
      </a>
      <br />
      <br />
      <small>
        <i>
          家人们，你一票我一票，Jordan 才能继续跳.
          你不投我不投，Jordan何日能出头.
        </i>
      </small>
      <br />
      <a
        href="/nomination.ndctools.near/widget/NDC.Nomination.Candidate.Page?house=CouncilOfAdvisors&accountId=kwhyc.near"
        class="btn btn-primary mt-2"
      >
        为TA助力 👍
      </a>
      <br />
      <br />
<hr/>
    <div>
      <h3>
        Who Voted for
        <br />
        staRpauSe ᵏʷʰʸᶜ.ⁿᵉᵃʳ ⁉️
      </h3>
      <h3>
        助力Jordan
        <br />
        打call (っ◔◡◔)っ ♥ 666 ♥
      </h3>
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
      </div>
    </>
    
  );
} else return "Loading";
