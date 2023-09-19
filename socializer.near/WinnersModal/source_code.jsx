const accountId = context.accountId;
if (!accountId) return;

const API_URL = props.API_URL || "http://localhost:3000";

const { onClose, data } = props;

State.init({
  error: "",
  like: false,
  follow: false,
  repost: false,
  comment: false,
  loaded: false,
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
        onClick={onClose}
      >
        X
      </button>
      <ModalTitle>{`Winners`}</ModalTitle>
      <hr />

      <div
        className="d-flex"
        style={{ flexDirection: "column", gap: 25, padding: 10 }}
      >
        <p>{`Social Username Winner 01`}</p>
        <p>{`Social Username Winner 02`}</p>
        <p>{`Social Username Winner 01`}</p>
        <p>{`Social Username Winner 01`}</p>
        <p>{`Social Username Winner 01`}</p>
      </div>
    </ModalContent>
  </ModalOverlay>
);
