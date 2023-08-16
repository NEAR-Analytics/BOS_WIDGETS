const CreateTicketContainer = styled.div`
display:flex;
justify-content:space-between;
align-items:center;
`;
State.init({ isCreateTicketModalOpen: true });

const createTickets = () => {
  return (
    <CreateTicketContainer>
      <div>
        <p style={{ marginBottom: 0, fontSize: 20, fontWeight: "600" }}>
          Create Tickets *
        </p>
        <p style={{ marginBottom: 0 }}>
          Create custom tickets for [event name].
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
        Create Ticket
      </button>
      {state.isCreateTicketModalOpen && (
        <Widget
          src="harrydhillon.near/widget/Keypom.Tickets.AddTicketModal"
          props={{
            isOpen: state.isCreateTicketModalOpen,
            onClose: () => {
              State.update({
                isCreateTicketModalOpen: false,
              });
            },
          }}
        />
      )}
    </CreateTicketContainer>
  );
};

return <div style={{ padding: 10 }}>{createTickets()}</div>;
