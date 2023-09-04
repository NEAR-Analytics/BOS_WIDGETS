/**
 * Prompt instrctiction for how to submit
 * put drop downf or each bount
 * add header
 */
return (
  <div>
  <Widget src="ndcplug.near/widget/BOSHACKS.Home.Countdown"/>
    <Widget
      src="ndcplug.near/widget/BOSHACKS.Submit.Create"
      props={{ referral: "boshacks-submission", labels: "boshacks, hackathon" }}
    />
    <Widget
      src="devgovgigs.near/widget/gigs-board.entity.post.List"
      props={{ tag: "boshacks-submission" }}
    />
  </div>
);
