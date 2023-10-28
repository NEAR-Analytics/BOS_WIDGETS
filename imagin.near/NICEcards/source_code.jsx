//const Flows = var ;
//if Flows < 1 {Flows=1};

const SideBar = styled.div`
display: flex;
flex-direction: column;
justify-content: flex-start;
background: #fff;
border: 1px solid #eceef0;
box-shadow:
0px 1px 3px rgba(16, 24, 40, 0.1),
0px 1px 2px rgba(16, 24, 40, 0.06);
border-radius: 8px;
flex-shrink: 0;
width: 35%;
`;

const Sortspace = styled.div`
display: flex;
flex-direction: column;
justify-content: flex-start;
background: #fff;
border: 1px solid #eceef0;
box-shadow:
0px 1px 3px rgba(16, 24, 40, 0.1),
0px 1px 2px rgba(16, 24, 40, 0.06);
border-radius: 8px;
flex-shrink: 0;
width: 100%;
`;

const App = styled.div`
display: flex;
flex-direction: row;
justify-content: flex-start;
background: #fff;
border: 1px solid #eceef0;
box-shadow:
0px 1px 3px rgba(16, 24, 40, 0.1),
0px 1px 2px rgba(16, 24, 40, 0.06);
border-radius: 8px;
flex-shrink: 0;
width: 100%;
`;

const CardContainer = styled.div`
display: flex;
flex-direction: column;
background: #fff;
border: 1px solid #eceef0;
box-shadow:
0px 1px 3px rgba(16, 24, 40, 0.1),
0px 1px 2px rgba(16, 24, 40, 0.06);
border-radius: 8px;
flex-shrink: 0;
width: 30%;
`;

const CardHeader = styled.div`
display: ${({ show }) => (show ? "flex" : "none")};
flex-direction: row;
justify-content: center;
align-items: center;
padding: 0.5em 0;
gap: 0.675em;
background: #fff9ed;
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
`;

const CardBody = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
justify-content: space-between;
padding: 1.5em 1.5em 1em;
gap: 0.675em;
flex: none;
order: 0;
align-self: stretch;
flex-grow: 1;
`;

const CardFooter = styled.div`
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 1.5em;
gap: 1em;
border-top: 1px solid #eceef0;
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;
flex-shrink: 1;
`;

const Card = ({ description, footer }) => {
  return (
    <CardContainer>
      <CardHeader show={!!props.header}>{header}</CardHeader>
      <CardBody>{description}</CardBody>
      {footer ? <CardFooter>{footer}</CardFooter> : <></>}
    </CardContainer>
  );
};

const [cards, setCards] = useState([]);
const [newCardDescription, setNewCardDescription] = useState("");
const [searchTerm, setSearchTerm] = useState("");
const [sortByDescription, setSortByDescription] = useState(false);

// State to hold the link input
const [newLink, setNewLink] = useState("");

const addCard = () => {
  if (newCardDescription.trim() === "") {
    return;
  }
  const newCard = {
    id: Date.now(),
    description: newCardDescription,
  };
  setCards([...cards, newCard]);
  setNewCardDescription("");
};

// Function to add a card based on the link input
const addCardFromLink = () => {
  if (newLink.trim() === "") {
    return;
  }
  const newCard = {
    id: Date.now(),
    description: newLink, // Use the link as the description
    isLink: true, // Add a flag to indicate it's a link card
  };
  setCards([...cards, newCard]);
  setNewLink("");
};

const deleteCard = (id) => {
  const updatedCards = cards.filter((card) => card.id !== id);
  setCards(updatedCards);
};

const toggleSort = () => {
  setSortByDescription(!sortByDescription);
};

const sortedCards = sortByDescription
  ? [...cards]
      .filter((card) =>
        card.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => a.description.localeCompare(b.description))
  : cards;

return (
  <App>
    <SideBar>
      <h1>NICE Form</h1>
      <div>
        {/* Input for adding a new link */}
        <input
          type="text"
          placeholder="Link"
          value={newLink}
          onChange={(e) => setNewLink(e.target.value)}
        />
        <button onClick={addCardFromLink}>Add Link Card</button>
      </div>
      <input
        type="text"
        placeholder="Description"
        value={newCardDescription}
        onChange={(e) => setNewCardDescription(e.target.value)}
      />
      <button onClick={addCard}>Add Card</button>
    </SideBar>
    <Sortspace>
      <button onClick={toggleSort}>
        {sortByDescription ? "Sort by ID" : "Sort by Description"}
      </button>
      <input
        type="text"
        placeholder="Search by Description"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="card-space">
        {sortedCards.map((card) => (
          <Card
            key={card.id}
            description={card.description}
            isLink={card.isLink} // Pass the isLink flag to the Card component
            onDelete={() => deleteCard(card.id)}
          />
        ))}
      </div>
    </Sortspace>
  </App>
);

//Still a WIP, but will allow user to populate a set of cards individually or from an array of descriptions, then search and sort the set by attributes of the linked objects.
//based on selected sort option, cards will then self-sort into the selected number of Flows (columns), and be displayed with a vertical heirarchy based on the selected attribute.
