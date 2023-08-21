const HeaderFlex = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

return (
  <div style={{ padding: 10 }}>
    <HeaderFlex>
      <h3>All Drops</h3>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <Widget
          src="harrydhillon.near/widget/Keypom.Components.Select"
          props={{
            label: "Type",
            options: [
              {
                label: "Event",
                value: "event",
              },
              {
                label: "Token",
                value: "token",
              },
              {
                label: "NFT",
                value: "nft",
              },
            ],
          }}
        />
        <Widget
          src="harrydhillon.near/widget/Keypom.Components.Select"
          props={{
            label: "Date",
            options: [
              {
                label: "1 Month",
                value: "1month",
              },
              {
                label: "6 Month",
                value: "6month",
              },
              {
                label: "12 Month",
                value: "12month",
              },
            ],
          }}
        />
        <Widget
          src="harrydhillon.near/widget/Keypom.Components.Select"
          props={{
            label: "Status",
            options: [
              {
                label: "Claimed",
                value: "claimed",
              },
              {
                label: "Uncalimed",
                value: "unclaimed",
              },
            ],
          }}
        />
        <div style={{ width: "300px" }}>
          <Widget src="harrydhillon.near/widget/Keypom.Components.Searchbar" />
        </div>
           <button
          onClick={() => {
            State.update({
              isCreateTicketModalOpen: true,
            });
          }}
          style={{ backgroundColor: "black", borderWidth: 0,height:43,width:150 ,borderRadius:10}}
        >
          Create ticket
        </button>
      </div>
    </HeaderFlex>
  </div>
);
