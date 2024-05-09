const accountId = context.accountId;
if (!accountId) return;

const API_URL = props.API_URL || "http://localhost:3000";

const { onClose, data } = props;

State.init({
  error: "",
  winners: [],
  loading: true,
});

const ModalOverlay = styled.div`
  background: white;
  position: absolute;
  right: 0px;
  border-radius: 3px;
  border: 1px solid;
  display: flex;
  flex-direction: column;
  z-index: 100;
  width: 400px;
  height: 100%;
  @media (max-width: 510px) {
    right: 10px;
    top: 54px;
    width: 96%;
  }
`;

const ModalContent = styled.div`
  padding: 20px;
  width: 100%;
  color: black;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  gap:1px;
  & p{
    margin: 0
  }
`;

const ModalAction = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px 40px;
`;

const ModalTitle = styled.h4`
  color: black;
  font-weight: 700;
  line-height: 27px;
  margin: 0
`;

const Button = styled.button`
  padding: 8px 20px;
  background-color:#121212;
  color: white;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  width: 150px;
  &:hover {
    background-color: grey;
    color: #191a1a;
  }
  &:active {
    background-color: grey;
    color: #191a1a;
  }
`;

const PostLink = styled.a`
  padding: 8px 20px;
  background-color:#121212;
  color: white;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  width: 150px;
  &:hover {
    background-color: grey;
    color: #191a1a;
  }
  &:active {
    background-color: grey;
    color: #191a1a;
  }
`;

const TextField = styled.input`
padding: 10px 15px;
font-size: 16px;
border-radius: 6px;
border: 2px solid rgb(255, 255, 255);
background-color: #191a1a;
`;

const getWinners = () => {
  State.update({ error: "", loading: true });
  asyncFetch(API_URL + `/api/campaign/winners?id=${data._id}`).then((res) => {
    if (res.ok) {
      const { error, data } = res.body;
      if (error) State.update({ error, loading: false });
      else if (data && data.length) {
        const listData = data.map((obj) => {
          if (obj.accountId.length > 30) {
            const firstPart = obj.accountId.slice(0, 5);
            const remainingPart = obj.accountId.slice(-5);
            obj.accountId = `${firstPart} ... ${remainingPart}`;
          }
          return obj;
        });
        State.update({
          winners: listData,
          loaded: true,
          loading: false,
        });
      }
    }
  });
};

if (!state.loaded) getWinners();

return (
  <ModalOverlay>
    <ModalContent>
      <button
        style={{
          width: 40,
          position: "absolute",
          right: 19,
          background: "unset",
          borderColor: "white",
          color: "black",
        }}
        onClick={() => onClose("")}
      >
        X
      </button>
      <ModalTitle>{`Winners of Campaign ${data.id}`}</ModalTitle>
      <hr />

      <div
        className="d-flex"
        style={{ flexDirection: "column", gap: 25, padding: 10 }}
      >
        {state.winners.map((item, i) => {
          //   const profile = Social.getr(`${item.accountId}/profile`);
          //   return <p>{`${i + 1}) ${profile.name || item.accountId} `}</p>;
          return <p>{`${i + 1}) ${item.accountId} `}</p>;
        })}
      </div>
    </ModalContent>
  </ModalOverlay>
);
