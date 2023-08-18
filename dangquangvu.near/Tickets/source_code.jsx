const contract = "tickets-v2.nearapac.near";
let standard_saled = Near.view(contract, "count_standard", {});
let vip_saled = Near.view(contract, "count_vipd", {});
let premium_saled = Near.view(contract, "count_premium", {});

let user_account = context.accountId;

return (
  <div>
    <div className="container border border-info p-3 text-center">
      <h2>
        Total Tickets VIP Saled:{" "}
        <span style={{ color: "red", fontFamily: "Arial", fontWeight: "bold" }}>
          {" "}
          {vip_saled}
        </span>
      </h2>
      <h2>
        Total Tickets STANDARD Saled:{" "}
        <span style={{ color: "red", fontFamily: "Arial", fontWeight: "bold" }}>
          {" "}
          {standard_saled}
        </span>
      </h2>
      <h2>
        Total Tickets PREMIUM Saled:{" "}
        <span style={{ color: "red", fontFamily: "Arial", fontWeight: "bold" }}>
          {" "}
          {premium_saled}
        </span>
      </h2>
    </div>
  </div>
);
