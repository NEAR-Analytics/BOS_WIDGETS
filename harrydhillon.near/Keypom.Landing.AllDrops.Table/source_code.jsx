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
    dropName: `Drop${i + 1}`, // Just giving a sequential name for simplicity
    type: ["Event", "NFT", "Token"][Math.floor(Math.random() * 3)], // Randomly select between 'Event', 'NFT', and 'Token'
    dateCreated: randomDate(
      new Date(2020, 0, 1),
      new Date(2023, 7, 22)
    ).toISOString(), // Generate a random date between 2020-01-01 and 2023-08-22
    claimed: Math.random() < 0.5, // Randomly set claimed as true or false
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

const claimedFunc = (claimed) =>
  claimed ? (
    <CompletelyClaimed>Claimed</CompletelyClaimed>
  ) : (
    <Uncalimed>1 of 6 Claimed</Uncalimed>
  );

return (
  <div style={{ padding: 10 }}>
    <Table>
      <TableHead>
        <TableRow>
          <TableHeader>Name</TableHeader>
          <TableHeader>Type</TableHeader>
          <TableHeader>Date Created</TableHeader>
          <TableHeader>Claimed</TableHeader>
          <TableHeader />
        </TableRow>
      </TableHead>
      <tbody>
        {drops.map((item) => (
          <TableRow key={item.dropName}>
            <TableCell>{item.dropName}</TableCell>
            <TableCell>{item.type}</TableCell>
            <TableCell>{extractDateComponents(item.dateCreated)}</TableCell>
            <TableCell>{claimedFunc(item.claimed)}</TableCell>
            <ActionButton
              onClick={() => {
                State.update({
                  tickets: state.tickets.filter((item, idx) => idx !== index),
                });
              }}
            >
              <Widget src="harrydhillon.near/widget/Keypom.Tickets.DeleteSVG" />
            </ActionButton>
          </TableRow>
        ))}
      </tbody>
    </Table>
  </div>
);
