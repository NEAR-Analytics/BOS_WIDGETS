const contract = "donationhubv3.near";
const information = Near.view(contract, "get_post", {}).reverse();

return (
  <div>
    {information.map((info) => (
      <div>
        <Widget
          src="donationhubv2.near/widget/post"
          props={{ information: info }}
        />
        <p></p>
      </div>
    ))}
  </div>
);
