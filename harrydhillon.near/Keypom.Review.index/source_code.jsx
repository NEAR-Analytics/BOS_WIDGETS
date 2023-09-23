const HeadingDisplayFlex = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Label = styled.p`
    font-weight:500;
    margin: 0;
`;

const UnstyledButton = styled.button`
  background-color:transparent;
  border-width:0px;
  color:#00A7E4;
`;

const EventDisplayFlex = styled.div`
    display:flex;
    margin-top:10px;
    align-items: center;
`;

const eventData = {};
const ticketValue = [];

return (
  <div style={{ padding: 10 }}>
    <HeadingDisplayFlex>
      <Label>Let’s make sure all your details are correct</Label>
      <UnstyledButton
        onClick={() => {
          State.update({ previewEvent: true });
        }}
      >
        Preview Event Page
      </UnstyledButton>
    </HeadingDisplayFlex>

    <EventDisplayFlex>
      <div style={{ width: "50%", display: "flex", alignItems: "center" }}>
        <img
          style={{
            width: 200,
            height: 150,
            objectFit: "contain",
            borderRadius: 5,
            margin: 10,
            marginBottom: 5,
            marginLeft: 0,
          }}
          src={`https://ipfs.near.social/ipfs/${eventData?.image?.cid}`}
        />
        <div>
          <Label>Event name</Label>
          <p style={{ fontSize: 12 }}>{eventData?.eventName}</p>
          <Label>Event description</Label>
          <p style={{ fontSize: 12 }}>{eventData?.description}</p>
        </div>
      </div>

      <div style={{ width: "10%" }} />

      <div style={{ width: "40%" }}>
        <Label>Event date</Label>
        <p style={{ fontSize: 12 }}>
          {eventData?.isSingleDateEvent ? eventData.date : eventData?.from}
        </p>
        <Label>Event location</Label>
        <p style={{ fontSize: 12 }}>{eventData.location}</p>
      </div>
    </EventDisplayFlex>

    <Widget
      props={{
        ticketValue,
      }}
      src="harrydhillon.near/widget/Keypom.Review.TicketTable"
    />

    <button
      onClick={() => {
        const tickets = props?.getStorage("tickets");
        const formValues = props?.getStorage("formValues");
        const collectInfo = props?.getStorage("collectInfo");

        props?.setStorage("tickets", "");
        props?.setStorage("formValues", "");
        props?.setStorage("collectInfo", "");

        Storage?.set(
          "allData",
          JSON.stringify({
            tickets,
            formValues,
            collectInfo,
          })
        );
      }}
    >
      Reset Fields
    </button>

    <button
      onClick={() => {
        const { tickets, formValues, collectInfo } = JSON.parse(
          Storage?.get("allData")
        );

        props?.setStorage("tickets", tickets);
        props?.setStorage("formValues", formValues);
        props?.setStorage("collectInfo", collectInfo);
      }}
    >
      Revert Fields
    </button>
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <div style={{ width: "30%" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p style={{ fontWeight: "600", marginBottom: 0 }}>
            Gold Ticket (VIP)
          </p>
          <p style={{ marginBottom: 0 }}>1.7161 NEAR</p>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p style={{ fontWeight: "600", marginBottom: 0 }}>Silver Ticket</p>
          <p style={{ marginBottom: 0 }}>1.7161 NEAR</p>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p style={{ fontWeight: "600" }}>Bronze Ticket</p>
          <p>1.7161 NEAR</p>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p style={{ fontWeight: "600" }}>Total</p>
          <p>1.7161 NEAR</p>
        </div>
      </div>
    </div>
    <hr
      style={{
        backgroundColor: "#F1F5F9",
        width: "100%",
        transform: `translateY(-65px)`,
      }}
    />

    {state?.previewEvent && (
      <Widget
        src="harrydhillon.near/widget/Keypom.Components.Modal"
        props={{
          children: (
            <div>
              <Widget
                props={{ ...eventData, date: eventData.from }}
                src="harrydhillon.near/widget/Keypom.EventInfo.Eventview"
              />
              <button
                onClick={() => {
                  State.update({ previewEvent: false });
                }}
                style={{
                  width: "100%",
                  backgroundColor: "white",
                  fontSize: 14,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: "lightgray",
                  marginTop: 5,
                  color: "black",
                }}
              >
                Close
              </button>
            </div>
          ),
          isOpen: state.previewEvent,
          contentStyles: {
            style: {
              width: "600px",
            },
          },
        }}
      />
    )}
  </div>
);
