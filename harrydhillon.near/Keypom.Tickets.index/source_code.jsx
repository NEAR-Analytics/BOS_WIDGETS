const CreateTicketContainer = styled.div`
display:flex;
justify-content:space-between;
align-items:center;
`;

const Table = styled.table`
  width: 100%;
  border-radius: 8px;
  overflow:hidden;
  border:0.1px solid #30C9F3;
  margin: 20px 0;
  border-collapse: separate;
  border-spacing: 0;
`;

const TableHead = styled.thead`
  background-color: #F8FAFC;
`;

const TableRow = styled.tr`

`;

const TableHeader = styled.th`
  padding: 8px;
  font-weight:500;
  text-align: left;
`;

const TableCell = styled.td`
  padding: 8px;
`;

const UnstyledButton = styled.button`
  background-color:transparent;
  border-width:0px;
  color:#00A7E4;
`;

const ActionButton = styled.button`
  color: black;
  padding: 5px 10px;
  padding-bottom:8px;
  background-color:transparent;
  border:1px solid lightgray;
  border-radius: 5px;
  cursor: pointer;
`;

State.init({
  isCreateTicketModalOpen: false,
  tickets: [],
  ticketPreview: null,
});

function extractDateComponents(dateStr) {
  const dateObj = new Date(dateStr);

  const month = dateObj.toLocaleString("default", { month: "long" }); // e.g., "August"
  const date = dateObj.getDate(); // e.g., 3
  const year = dateObj.getFullYear(); // e.g., 2023

  return `${month} ${date}, ${year}`;
}

function ellipsisIfExceeds(str) {
  if (str.length <= maxLength) {
    return str;
  }
  return str.substring(0, 35 - 3) + "...";
}

if (!state.isReadDataFromLocal) {
  const getValue = props?.getStorage?.("tickets");
  if (getValue) {
    State.update({ tickets: JSON.parse(getValue), isReadDataFromLocal: true });
  } else {
    State.update({ isReadDataFromLocal: true });
  }
} else {
  props?.setStorage?.("tickets", JSON.stringify(state.tickets));
}

const createTickets = () => {
  return (
    <>
      <CreateTicketContainer>
        <div>
          <p style={{ marginBottom: 0, fontSize: 20, fontWeight: "600" }}>
            Create Tickets*
          </p>
          <p style={{ marginBottom: 0 }}>
            Create custom tickets for {JSON.parse(props?.getStorage?.("formValues")).eventName}.
          </p>
        </div>
        <button
          onClick={() => {
            State.update({
              isCreateTicketModalOpen: true,
            });
          }}
          style={{ backgroundColor: "black", borderWidth: 0 }}
        >
          Create ticket
        </button>
      </CreateTicketContainer>
      {state.tickets.length !== 0 && (
        <div style={{ marginTop: 10 }}>
          <p style={{ marginBottom: 0, fontSize: 20, fontWeight: "600" }}>
            Your Tickets
          </p>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>Ticket</TableHeader>
                <TableHeader />
                <TableHeader># of tickets</TableHeader>
                <TableHeader>Price (NEAR)</TableHeader>
                <TableHeader />
              </TableRow>
            </TableHead>
            <tbody style={{ borderRadius: 10 }}>
              {state.tickets.map((item, index) => (
                <TableRow key={index}>
                  <TableCell style={{ width: "30%" }}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div style={{ padding: 4 }}>
                        <img
                          src={`https://ipfs.near.social/ipfs/${item.image.cid}`}
                          style={{
                            width: 35,
                            objectFit: "cover",
                            height: 35,
                            borderRadius: 3,
                          }}
                        />
                      </div>
                      <div>
                        <div style={{ fontSize: 16, fontWeight: "500" }}>
                          {item.ticketName}
                        </div>
                        <p
                          style={{
                            textOverflow: "ellipsis",
                            width: 200,
                            fontSize: 12,
                            whiteSpace: "nowrap",
                            marginBottom: 0,
                          }}
                        >
                          {ellipsisIfExceeds(item.description)}
                        </p>
                        <div style={{ fontSize: 12, color: "#94A3B8" }}>
                          {extractDateComponents(item.from)} -{" "}
                          {extractDateComponents(item.to)}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <UnstyledButton
                      onClick={() => {
                        State.update({ ticketPreview: item });
                      }}
                    >
                      Preview Ticket
                    </UnstyledButton>
                  </TableCell>
                  <TableCell>
                    {item.numberOfTickets ? item.numberOfTickets : "∞"}
                  </TableCell>
                  <TableCell>{item.ticketPricing}</TableCell>
                  <TableCell>
                    <OverlayTrigger overlay={<Tooltip>Delete</Tooltip>}>
                      <ActionButton
                        onClick={() => {
                          State.update({
                            tickets: state.tickets.filter(
                              (item, idx) => idx !== index
                            ),
                          });
                        }}
                      >
                        <Widget src="harrydhillon.near/widget/Keypom.Tickets.DeleteSVG" />
                      </ActionButton>
                    </OverlayTrigger>
                    <OverlayTrigger overlay={<Tooltip>Clone</Tooltip>}>
                      <ActionButton
                        onClick={() => {
                          const currentTicket = state.tickets[index];
                          State.update({
                            tickets: [...state.tickets, currentTicket],
                          });
                        }}
                      >
                        <Widget src="harrydhillon.near/widget/Keypom.Tickets.CloneSVG" />
                      </ActionButton>
                    </OverlayTrigger>
                    <OverlayTrigger overlay={<Tooltip>Edit</Tooltip>}>
                      <ActionButton
                        onClick={() => {
                          State.update({
                            isCreateTicketModalOpen: true,
                            editMode: true,
                            ticketToEdit: index,
                            editVal: item,
                          });
                        }}
                      >
                        <Widget src="harrydhillon.near/widget/Keypom.Tickets.EditSVG" />
                      </ActionButton>
                    </OverlayTrigger>
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </div>
      )}
      {!!state.ticketPreview && (
        <Widget
          src="harrydhillon.near/widget/Keypom.Tickets.TicketPreview"
          props={{
            isOpen: !!state.ticketPreview,
            ...state.ticketPreview,
            formValues: JSON.parse(props?.getStorage?.("formValues")),
            onClose: () => {
              State.update({
                ticketPreview: null,
              });
            },
          }}
        />
      )}
      {state.isCreateTicketModalOpen && (
        <Widget
          src="harrydhillon.near/widget/Keypom.Tickets.AddTicketModal"
          props={{
            isOpen: state.isCreateTicketModalOpen,
            onSave: (ticketData) => {
              if (state.editMode) {
                const allTickets = [...state.tickets];
                allTickets[state.ticketToEdit] = ticketData;
                State.update({
                  tickets: allTickets,
                  isCreateTicketModalOpen: false,
                  editMode: false,
                  editVal: null,
                });
              } else {
                State.update({
                  tickets: [...state.tickets, ticketData],
                  isCreateTicketModalOpen: false,
                });
              }
            },
            editMode: state.editMode,
            editVal: state.editVal,
            onClose: () => {
              State.update({
                isCreateTicketModalOpen: false,
                isCreateTicketModalOpen: false,
                editMode: false,
                editVal: null,
              });
            },
          }}
        />
      )}
    </>
  );
};

return <div style={{ padding: 10 }}>{createTickets()}</div>;
