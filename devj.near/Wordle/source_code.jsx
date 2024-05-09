const CONTRACT = "w0rdle.near";

if (context.accountId === null) return "Please sign in using your Near account";

State.init({
  loading: true,
  page: "GAME",
});

const [toast, setToast] = useState({
  open: false,
  variant: "",
  title: "",
  description: "",
});

const handleToast = (variant, title, description) => {
  setToast({ open: true, variant, title, description });
};

const keyHash = Near.view(
  CONTRACT,
  "get_key_hash",
  { accountId: context.accountId },
  "final",
  {
    subscribe: true,
  }
);

const checkKey = () => {
  const key = Storage.privateGet("key");
  console.log(key);
  if (key === null) {
    setTimeout(checkKey, 200);
    return;
  }
  if (key === undefined) return State.update({ loading: false, isAuth: false });

  const keyHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(key));
  Near.asyncView(CONTRACT, "get_key_hash", {
    accountId: context.accountId,
  }).then((res) => {
    console.log(res);
    State.update({ loading: false, isAuth: keyHash === res, key });
  });
};

const auth = () => {
  const key = ethers.utils.id(Math.random().toString());
  const keyHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(key));
  Storage.privateSet("key", key);
  Near.call(CONTRACT, "set_key_hash", { keyHash });
};

const setPage = (page) => State.update({ page });

const Auth = () => (
  <div class="center">
    <div>
      <div
        class="authBtn btn fs-5 text-white px-4 rounded"
        onClick={() => auth()}
      >
        SIGN IN
      </div>
    </div>
  </div>
);

const App = () => (
  <div>
    <Widget
      src="devj.near/widget/Wordle.Header"
      props={{
        page: state.page,
        setPage,
      }}
    />
    <div class="py-4">
      {state.page === "GAME" && (
        <Widget
          src="devj.near/widget/Wordle.Game"
          props={{
            key: state.key,
            handleToast,
          }}
        />
      )}

      {state.page === "PROFILE" && (
        <Widget
          src="devj.near/widget/Wordle.Profile"
          props={{
            key: state.key,
            handleToast,
          }}
        />
      )}

      {state.page === "LEADERBOARD" && (
        <Widget src="devj.near/widget/Wordle.Leaderboard" />
      )}
    </div>
  </div>
);

const Styles = styled.div`
.main {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 97vh;
    background: linear-gradient(to top right, #048C5B, #074A5F);
}

.center {
    width: 100%;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.authBtn {
    background: linear-gradient(to top right, #76CB30, #41A828);
}
`;

useEffect(() => {
  checkKey();
}, [keyHash]);

return (
  <Styles>
    <div class="main">
      {state.loading ? (
        <p class="text-center text-white py-4">Loading ...</p>
      ) : (
        <>
          {!state.isAuth && <Auth />}
          {state.isAuth && <App />}
        </>
      )}
    </div>
    <Widget
      src="devj.near/widget/Toast"
      props={{
        ...toast,
        onOpenChange: () => setToast({ ...toast, open: false }),
      }}
    />
  </Styles>
);
