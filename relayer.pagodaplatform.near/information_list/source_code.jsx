const contract = "donationhubv2.near";
const information = Near.view(contract, "get_post", {});

return (
  <div>
    {information.map((info) => (
      <div>
        <Widget
          src="kanapitch.near/widget/postv2"
          props={{ information: info }}
        />
      </div>
    ))}
  </div>
);
