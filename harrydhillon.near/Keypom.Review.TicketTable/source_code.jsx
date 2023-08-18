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

const ticketObj = {
  selected: "Custom Amount",
  ticketName: "Gold ticket (VIP)",
  description:
    "This ticket provides you access to the best in class events across the board",
  from: "2023-08-09",
  to: "2023-08-22",
  passValid: "2023-08-30",
  numberOfTickets: "200",
  nearAmountForTicket: "7.3",
  ticketPricing: "7.3",
};

State.init({ tickets: [ticketObj, ticketObj, ticketObj] });

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

const bottomTickets = ["Gold ticket (VIP)", "Bronze ticket", "Silver ticket"];

return (
  <>
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
              <div style={{ fontSize: 10, color: "#94A3B8" }}>
                Purchase Thoough : {extractDateComponents(item.from)} -{" "}
                {extractDateComponents(item.to)}
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
            <TableCell>{item.numberOfTickets}</TableCell>
            <TableCell>{item.ticketPricing}</TableCell>
            <TableCell>
              <ActionButton
                onClick={() => {
                  State.update({
                    tickets: state.tickets.filter((item, idx) => idx !== index),
                  });
                }}
              >
                <Widget src="harrydhillon.near/widget/Keypom.Tickets.DeleteSVG" />
              </ActionButton>
            </TableCell>
          </TableRow>
        ))}
      </tbody>
    </Table>
    <div style={{ width: 350, marginLeft: "auto" }}>
      {bottomTickets.map((item) => (
        <div style={{ display: "flex", alignItems: "center" }} key={item}>
          <div style={{ width: "60%", fontWeight: "600" }}>{item}</div>
          <div>1.7161 NEAR</div>
        </div>
      ))}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: 10,
          fontWeight: "500",
        }}
      >
        <div style={{ width: "60%" }}>Total</div>
        <div>1.7161 NEAR</div>
      </div>
    </div>
  </>
);
