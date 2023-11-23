const contract = "communityevent.near";
const cities = Near.view(contract, "get_cities", {});

return (
  <div>
    {cities.map((city) => (
      <div key={city[0]}>
        <Widget src="communityevent.near/widget/city" props={{ city: city }} />
      </div>
    ))}
  </div>
);
