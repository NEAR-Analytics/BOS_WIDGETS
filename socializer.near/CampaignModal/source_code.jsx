const Owner = "socializer.near";
const accountId = context.accountId;

if (!accountId) return;

const API_URL = props.API_URL || "http://localhost:3000";

const { onClose, data } = props;
const link = data.post_link.split("?")[1].split("&");
const posterId = link[0].split("=")[1];

State.init({
  posterAvatar: `https://i.near.social/magic/large/https://near.social/magic/img/account/${posterId}`,
  error: "",
  like: false,
  follow: false,
  repost: false,
  comment: false,
  human: false,
  loaded: false,
  loading: false,
});

const ModalOverlay = styled.div`
  background: white;
  position: absolute;
  bottom: 0px;
  right: 0px;
  border-radius: 3px;
  border: 1px solid;
  display: flex;
  flex-direction: column;
  z-index: 100;
  width: 400px;
  height: 100%;
  overflow: auto;
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

const getVerifyState = () => {
  State.update({ error: "", loading: true });
  asyncFetch(
    API_URL + `/api/campaign/verify?accountId=${accountId}&id=${data._id}`
  ).then((res) => {
    if (res.ok) {
      const { error, data } = res.body;
      if (error) State.update({ error, loading: false });
      else if (data) {
        const { like, follow, repost, comment, human, finished } = data;
        State.update({
          like,
          follow,
          repost,
          comment,
          human,
          error: finished ? "" : "Please complete all tasks",
          loaded: true,
          loading: false,
        });
      }
    }
  });
};

if (!state.loaded) getVerifyState();

const verifyEnter = () => {
  State.update({ error: "", loading: true });
  asyncFetch(API_URL + `/api/campaign/verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ accountId, id: data._id }),
  }).then((res) => {
    if (res.ok) {
      const { error, data } = res.body;
      if (error) State.update({ error, loading: false });
      else if (data) {
        const { like, follow, repost, comment, human, finished } = data;
        State.update({
          like,
          follow,
          repost,
          comment,
          human,
          loading: false,
        });
        if (finished) {
          setTimeout(() => {
            onClose("Participation Successful");
          }, 3000);
        }
      }
    }
  });
};

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
      <ModalTitle>{`NEAR DEGENS`}</ModalTitle>
      <h4>{`Camaign Details`}</h4>
      <img
        style={{ width: "100%", height: 250 }}
        src={state.posterAvatar}
        onError={() => {
          State.update({
            myAvatar:
              "https://ipfs.near.social/ipfs/bafkreibmiy4ozblcgv3fm3gc6q62s55em33vconbavfd2ekkuliznaq3zm",
          });
        }}
      />

      <div
        className="d-flex"
        style={{ flexDirection: "column", gap: 25, padding: 20 }}
      >
        <p>
          {`Please ensure you do the tasks below before clicking on Verify & Enter:`}
        </p>
        <p>{`Campaign Id: ${data.id}`}</p>
        {data?.requirements.map((row, index) => (
          <div className="d-flex justify-content-between align-items-center">
            <p>
              <b>{`${index + 1})`}</b>
              <span>{row.name}</span>
            </p>

            {state[row.value] ? (
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
            ) : (
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
            )}
          </div>
        ))}
        {state.error && (
          <p style={{ fontSize: 14, margin: 0, color: "red" }}>{state.error}</p>
        )}
      </div>
    </ModalContent>
    <ModalAction>
      <PostLink className="btn" target="_blank" href={data.post_link}>
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
      </PostLink>
      <Button
        className="btn"
        onClick={verifyEnter}
        disabled={state.loading}
      >{`Verify & Enter`}</Button>
    </ModalAction>
  </ModalOverlay>
);
