const Owner = "humans-of-near.near";
const accountId = context.accountId;
if (!accountId) return;

const SOCIAL = "https://social.near.page/u/";
const TWITTER = "https://twitter.com/";

const { API_URL, onClose, user, getMyInfor } = props;

State.init({
  social: user.social,
  twitter: user.twitter,
  name: user.name,
});

const options = [
  {
    text: "Ended",
    value: 1,
  },
  {
    text: "Claimed",
    value: 2,
  },
  {
    text: "Unclaimed",
    value: 3,
  },
];

const ModalOverlay = styled.div`
  right: 110px;
  z-index: 100;
  width: 400px;
  height: 100%;
  display: flex;
  padding: 32px 0;
  position: absolute;
  flex-direction: column;
  @media (max-width: 510px) {
    right: 10px;
    top: 54px;
    width: 96%;
  }
`;

const Component = styled.div`
  height: 100%;
  overflow: auto;
  border-radius: 6px;
  background-color: #22272B;
  border: 1px solid rgb(255, 255, 255);
`;

const ModalContent = styled.div`
  gap:20px;
  width: 100%;
  color: white;
  display: flex;
  padding: 20px;
  border-radius: 4px;
  flex-direction: column;
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
  color: #191a1a;
  border-radius: 6px;
  padding: 10px 22px;
  background-color:white;
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
  width: 100%;
  color: white;
  font-size: 16px;
  border-radius: 6px;
  padding: 10px 15px;
  background-color: unset;
  border: 2px solid rgb(255, 255, 255);
`;

const Textarea = styled.textarea`
  gap: 0.5em;
  width: 100%;
  display: flex;
  color: white;
  background: unset;
  border-radius: 4px;
  align-items: center;
  flex-direction: row;
  padding: 0.5em 0.75em;
  box-sizing: border-box;
  border: 1px solid #d0d5dd;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
`;

const saveMyProfile = () => {
  const data = {
    accountId,
    name: state.name,
    social: state.social,
    twitter: state.twitter,
  };

  return asyncFetch(API_URL + `/auth/account`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => {
    if (res.ok) {
      getMyInfor();
      onClose();
    }
  });
};

const changeName = async (e) => {
  if (e.target.value.length <= 25)
    State.update({
      ...state,
      name: e.target.value,
    });
};

const changeSocial = async (e) => {
  if (e.target.value.indexOf(SOCIAL) === 0)
    State.update({
      ...state,
      social: e.target.value,
    });
};

const changeTwitter = async (e) => {
  if (e.target.value.indexOf(TWITTER) === 0)
    State.update({
      ...state,
      twitter: e.target.value,
    });
};

return (
  <ModalOverlay>
    <Component>
      <ModalContent>
        <button
          className="btn"
          style={{
            top: 43,
            right: 10,
            padding: 0,
            position: "absolute",
          }}
          onClick={onClose}
        >
          <svg
            width="26"
            height="26"
            viewBox="0 0 26 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13 1.625C6.6625 1.625 1.625 6.6625 1.625 13C1.625 19.3375 6.6625 24.375 13 24.375C19.3375 24.375 24.375 19.3375 24.375 13C24.375 6.6625 19.3375 1.625 13 1.625ZM17.3875 18.6875L13 14.3L8.6125 18.6875L7.3125 17.3875L11.7 13L7.3125 8.6125L8.6125 7.3125L13 11.7L17.3875 7.3125L18.6875 8.6125L14.3 13L18.6875 17.3875L17.3875 18.6875Z"
              fill="white"
            />
          </svg>
        </button>
        <ModalTitle>{`Your Profile`}</ModalTitle>
        <div>
          <p>{`Display Name`}</p>
          <TextField
            type="text"
            placeholder={accountId}
            value={state.name}
            onChange={changeName}
          />
        </div>
        <div>
          <p>{`Near Social`}</p>
          <TextField
            type="text"
            placeholder="Near Social"
            value={state.social}
            onChange={changeSocial}
          />
        </div>
        <div>
          <p>{`Twitter`}</p>
          <TextField
            type="text"
            placeholder="Twitter Link"
            value={state.twitter}
            onChange={changeTwitter}
          />
        </div>
        <div>
          <p>{`Bio`}</p>
          <Textarea
            type="text"
            placeholder="Twitter Link"
            value={state.twitter}
            onChange={changeTwitter}
          />
        </div>
        <div>
          <p>{`What describes you best?`}</p>
          <Widget
            props={{
              noLabel: true,
              placeholder: "Select a role",
              options,
            }}
            src={`${Owner}/widget/Select`}
          />
        </div>
      </ModalContent>
      <ModalAction>
        <Button className="btn" onClick={saveMyProfile}>{`Save`}</Button>
      </ModalAction>
    </Component>
  </ModalOverlay>
);
