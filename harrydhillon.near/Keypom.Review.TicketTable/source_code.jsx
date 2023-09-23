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

return (
  <>
    <Table>
      <TableHead>
        <TableRow>
          <TableHeader>Ticket</TableHeader>
          <TableHeader />
          <TableHeader># of tickets</TableHeader>
          <TableHeader>Price (NEAR)</TableHeader>
        </TableRow>
      </TableHead>
      <tbody style={{ borderRadius: 10 }}>
        {(props?.ticketValue ?? [])?.map((item, index) => (
          <TableRow key={index}>
            <TableCell style={{ width: "30%" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ padding: 4 }}>
                  <img
                    src={`https://ipfs.near.social/ipfs/${item.image.cid}`}
                    style={{
                      width: 35,
                      height: 35,
                      borderRadius: 3,
                      objectFit:'cover'
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
          </TableRow>
        ))}
      </tbody>
    </Table>
    {!!state.ticketPreview && (
      <Widget
        src="harrydhillon.near/widget/Keypom.Tickets.TicketPreview"
        props={{
          isOpen: !!state.ticketPreview,
          ...state.ticketPreview,
          onClose: () => {
            State.update({
              ticketPreview: null,
            });
          },
        }}
      />
    )}
  </>
);
