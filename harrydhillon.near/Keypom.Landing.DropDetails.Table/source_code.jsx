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
    padding:5px;
`;

const TableHeader = styled.th`
  padding: 8px;
  font-weight:500;
  text-align: left;
`;

const TableCell = styled.td`
  padding: 15px;
`;

const ActionButton = styled.button`
  color: black;
  padding: 5px 10px;
  margin-top:5px;
  padding-bottom:8px;
  background-color:transparent;
  border:1px solid lightgray;
  border-radius: 5px;
  cursor: pointer;
`;

const drops = [];

// Helper function to generate a random date
function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

for (let i = 0; i < 20; i++) {
  const drop = {
    ticketName: `Ticket ${i + 1}`, // Just giving a sequential name for simplicity
    numberOfTicket: `${["0", "30", "6", "20"][Math.floor(Math.random() * 4)]}/${
      ["100", "200", "150", "200"][Math.floor(Math.random() * 4)]
    }`, // Randomly select between 'Event', 'NFT', and 'Token'
    description: "Mercedem aut nummos unde unde...",
    pricePerTicket: 50, // Generate a random date between 2020-01-01 and 2023-08-22
  };

  drops.push(drop);
}

function extractDateComponents(dateStr) {
  const dateObj = new Date(dateStr);

  const month = dateObj.toLocaleString("default", { month: "long" }); // e.g., "August"
  const date = dateObj.getDate(); // e.g., 3
  const year = dateObj.getFullYear(); // e.g., 2023

  return `${month} ${date}, ${year}`;
}

const CompletelyClaimed = styled.div`
    background-color:#F8FAFC;
    color:#475569;
    padding-top:3px;
    padding-bottom:3px;
    padding-left:10px;
    padding-right:10px;
    width:fit-content;
`;

const Uncalimed = styled.div`
    background-color:#F0FDF4;
    color:#16A34A;
    padding-top:3px;
    padding-bottom:3px;
    padding-left:10px;
    padding-right:10px;
        width:fit-content;
`;

const ActionButton2 = styled.button`
  padding: 5px 10px;
  color:#00A7E4;
  background-color:transparent;
  border-width: 0px;
  cursor: pointer;
  &:focus {
        outline: none;
      }
`;

const claimedFunc = (claimed) =>
  claimed ? (
    <CompletelyClaimed>Claimed</CompletelyClaimed>
  ) : (
    <Uncalimed>1 of 6 Claimed</Uncalimed>
  );

return (
  <div style={{}}>
    <Table>
      <TableHead>
        <TableRow>
          <TableHeader>Ticket Name</TableHeader>
          <TableHeader>Number of tickets</TableHeader>
          <TableHeader>Price per ticket (NEAR)</TableHeader>
          <TableHeader />
          <TableHeader />
        </TableRow>
      </TableHead>
      <tbody>
        {drops.map((item) => (
          <TableRow key={item.ticketName}>
            <TableCell>
              <div style={{ alignItems: "center", display: "flex" }}>
                <img
                  style={{ marginRight: 5 }}
                  src="https://i.ibb.co/3pBgVZD/Image-thumb.png"
                />
                <div>
                  <p style={{ marginBottom: -2, fontWeight: "500" }}>
                    {item.ticketName}
                  </p>
                  <p style={{ marginBottom: 0, fontSize: 14 }}>
                    {item.description}
                  </p>
                  <p
                    style={{ marginBottom: 0, fontSize: 12, color: "#94A3B8" }}
                  >
                    Sep 12, 2023 - Aug 20, 2023
                  </p>
                  <p
                    style={{ marginBottom: 0, fontSize: 12, color: "#94A3B8" }}
                  >
                    Sep 12, 2023 - Aug 20, 2023
                  </p>
                </div>
              </div>
            </TableCell>
            <TableCell>{item.numberOfTicket}</TableCell>
            <TableCell>{item.pricePerTicket}</TableCell>
            <TableCell>
              <ActionButton2>Preview</ActionButton2>
            </TableCell>
            <TableCell>
              <div style={{ gap: "10px", display: "flex" }}>
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
                <ActionButton
                  onClick={() => {
                    State.update({
                      tickets: state.tickets.filter(
                        (item, idx) => idx !== index
                      ),
                    });
                  }}
                >
                  <Widget src="harrydhillon.near/widget/Keypom.Landing.DropDetails.ExternalLinkSVG" />
                </ActionButton>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </tbody>
    </Table>
  </div>
);
