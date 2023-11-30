const contract = "donationhubv2.near";
const information = Near.view(contract, "get_post", {});

return (
  <div>
    {information.map((info) => (
      <div>
        <Widget src="natapat.near/widget/post" props={{ information: info }} />
        <p></p>
      </div>
    ))}
  </div>
);
