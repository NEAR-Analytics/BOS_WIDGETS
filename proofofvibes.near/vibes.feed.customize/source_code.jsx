const location = "Paris";
const tastemaker = "ogruss.near";
return (
  <Widget
    src="proofofvibes.near/widget/vibes.feed.main"
    props={{
      data: {
        hashtagWhitelist: ["ProofOfVibes", location],
        typeWhitelist: ["md"],
        embedMentions: [tastemaker, "ndcplug.near"],
        // postTemplate: "efiz.near/widget/placeholder",
      },
    }}
  />
);
