const accountId = context.accountId;
if (!accountId) return;

const API_URL = "http://localhost:3000/";

const { onClose } = props;

const ModalOverlay = styled.div`
background: white;
  position: absolute;
  right: 50px;
  top: 80px;
  border-radius: 3px;
  border: 1px solid;
  display: flex;
  flex-direction: column;
  z-index: 100;
  width: 400px;
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
          right: 25,
          background: "unset",
          borderColor: "white",
          color: "black",
        }}
        onClick={onClose}
      >
        X
      </button>
      <ModalTitle>{`NEAR DEGENS`}</ModalTitle>
      <h4>{`Camaign Details`}</h4>
      <img src={`${API_URL}campagin.png`} />

      <div
        className="d-flex"
        style={{ flexDirection: "column", gap: 25, padding: 20 }}
      >
        <p>
          {`Please ensure you do the tasks below before clicking on Verify & Enter:`}
        </p>
        <div className="d-flex justify-content-between align-items-center">
          <p>
            <b>1)</b>
            <span className="text-decoration-underline ">Like</span>
          </p>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 15 15"
          >
            <path
              fill="#038d2e"
              fill-rule="evenodd"
              d="M0 7.5a7.5 7.5 0 1 1 15 0a7.5 7.5 0 0 1-15 0Zm7.072 3.21l4.318-5.398l-.78-.624l-3.682 4.601L4.32 7.116l-.64.768l3.392 2.827Z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <p>
            <b>1)</b>
            <span className="text-decoration-underline ">Follow</span>
          </p>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="red"
              d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10s10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17L12 13.41L8.41 17L7 15.59L10.59 12L7 8.41L8.41 7L12 10.59L15.59 7L17 8.41L13.41 12L17 15.59z"
            />
          </svg>
        </div>
      </div>
    </ModalContent>
    <ModalAction>
      <Button className="btn">
        {`Goto Post`}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="#3c7eff"
            d="M9.043 5.793L2.836 12l6.207 6.207l1.414-1.414L5.664 12l4.793-4.793l-1.414-1.414Zm5.914 12.414L21.164 12l-6.207-6.207l-1.414 1.414L18.336 12l-4.793 4.793l1.414 1.414Z"
          />
        </svg>
      </Button>
      <Button className="btn">{`Verify & Enter`}</Button>
    </ModalAction>
  </ModalOverlay>
);
