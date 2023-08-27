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
  padding: 14px;
  font-weight:500;
  text-align: left;
`;

const TableCell = styled.td`
  padding: 15px;
`;

const ActionButton = styled.button`
  padding: 5px 10px;
  color:#00A7E4;
  background-color:transparent;
  border-width: 0px;
  cursor: pointer;
  &:focus {
        outline: none;
      }
`;

const drops = [];

// Helper function to generate a random date
function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

if (drops.length === 0) {
  for (let i = 0; i < 20; i++) {
    const drop = {
      name: `Full Name`, // Just giving a sequential name for simplicity
      email: `email@email.com`, // Randomly select between 'Event', 'NFT', and 'Token'
      link: "keypom.xyz/#rf5hhfaxm", // Generate a random date between 2020-01-01 and 2023-08-22
      status: ["Purchased", "Claimed", "Scanned"][
        Math.floor(Math.random() * 3)
      ],
    };

    drops.push(drop);
  }
}

function Chip({ label, color, backgroundColor }) {
  const style = {
    padding: "8px 16px",
    borderRadius: "100px",
    display: "inline-block",
    marginRight: "10px",
    backgroundColor: backgroundColor,
    color: color,
    fontWeight: "500",
  };

  return <span style={style}>{label}</span>;
}

function ChipDisplay(name) {
  const items = {
    Purchased: {
      fontColor: "#475569",
      backgroundColor: "#F8FAFC",
    },
    Claimed: {
      fontColor: "#16A34A",
      backgroundColor: "#F0FDF4",
    },
    Scanned: {
      backgroundColor: "#F9F6E9",
      fontColor: "#9E811B",
    },
  };

  return (
    <div>
      <Chip
        label={name}
        color={items[name].fontColor}
        backgroundColor={items[name].backgroundColor}
      />
    </div>
  );
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
  <div style={{}}>
    <Table>
      <TableHead>
        <TableRow>
          <TableHeader>Name</TableHeader>
          <TableHeader>Email</TableHeader>
          <TableHeader>Link</TableHeader>
          <TableHeader>Status</TableHeader>
          <TableHeader />
        </TableRow>
      </TableHead>
      <tbody>
        {drops.map((item) => (
          <TableRow key={item.ticketName}>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.email}</TableCell>
            <TableCell>{item.link}</TableCell>
            <TableCell>{ChipDisplay(item.status)}</TableCell>
            <TableCell>
              <ActionButton
                onClick={() => {
                  State.update({ ticketPreview: item });
                }}
              >
                View details
              </ActionButton>
            </TableCell>
          </TableRow>
        ))}
      </tbody>
    </Table>
    {!!state.ticketPreview && (
      <Widget
        src="harrydhillon.near/widget/Keypom.Landing.TicketDetails.Preview"
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
  </div>
);
