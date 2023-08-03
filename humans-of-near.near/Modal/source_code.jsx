const accountId = context.accountId;

State.init({
  social: "",
  twitter: "",
  name: "",
});

const ModalOverlay = styled.div`
  position: absolute;
  left: 58px;
  top: 185px;
  background-color: #191a1a;
  border-radius: 12px;
  border: 1px solid rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  z-index: 100;
  width: 400px;
`;

const ModalContent = styled.div`
  padding: 20px;
  width: 100%;
  color: white;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  gap:15px;
`;

const ModalAction = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px;
`;

const ModalTitle = styled.h4`
  margin-bottom: 10px;
`;

const Button = styled.button`
  padding: 10px 22px;
  background-color:white;
  color: #191a1a;
  border-radius: 6px;
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
color: white;
`;

const getMyData = () => {
  return asyncFetch(props.API_URL + `/auth?accountId=${accountId}`).then(
    (res) => {
      if (res.ok) {
        return res.body.user;
      }
    }
  );
};

getMyData().then(({ social, twitter, name }) => {
  State.update({
    social,
    twitter,
    name,
  });
});

return (
  <ModalOverlay>
    <ModalContent>
      <button onClick={props.onClose}>X</button>
      <ModalTitle>{`Your Profile`}</ModalTitle>
      <p>{`Be careful with your public data.`}</p>
      <h5>{`Display Name`}</h5>
      <TextField type="text" placeholder="display name" value={state.name} />
      <h5>{`Near Social`}</h5>
      <TextField type="text" placeholder="Near Social" value={state.social} />
      <h5>{`Twitter`}</h5>
      <TextField type="text" placeholder="Twitter Link" value={state.twitter} />
    </ModalContent>
    <ModalAction>
      <Button className="btn">{`Save`}</Button>
    </ModalAction>
  </ModalOverlay>
);
