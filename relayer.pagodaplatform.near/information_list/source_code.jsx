const contract = "donationhubv2.near";
const information = Near.view(contract, "get_post", {});

return (
  <div>
    {information.map((info) => (
      <div>
        <Widget
          src="communityevent.near/widget/city"
          props={{
            name: info[0],
            description: info[1],
            authorId: info[2],
            timestamp: info[3],
          }}
        />
      </div>
    ))}
  </div>
);
