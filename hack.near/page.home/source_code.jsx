const accountId = props.accountId ?? context.accountId ?? "every.near";

const profile = Social.getr(`${accountId}/profile`);

if (!profile) {
  return "";
}

const [isModalOpen, setIsModalOpen] = useState(false);

const toggleModal = () => setIsModalOpen(!isModalOpen);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

return (
  <Container>
    <h1>Build City</h1>
    <p>Developing Communities Worldwide</p>
    <button className="btn btn-lg btn-dark" onClick={toggleModal}>
      START
    </button>
    {isModalOpen && (
      <Widget
        src="hack.near/widget/city.modal"
        props={{
          open: true,
        }}
      />
    )}
  </Container>
);
