const accountId = context.accountId;
const Owner = "socializer.near";
const profile = Social.getr(`${accountId}/profile`);
const API_URL = props?.API_URL || "https://e2e.nearverselabs.com/";

const changePage = props?.changePage || (() => {});
const page = props?.page || "";

const requirementsOptions = [
  { name: "Follow", value: "follow" },
  { name: "Like", value: "like" },
  { name: "Repost", value: "repost" },
  { name: "Comment", value: "comment" },
  { name: "I-Am-Human Verified", value: "human" },
];

const hrOption = [
  { text: "00", value: "00" },
  { text: "06", value: "06" },
  { text: "12", value: "12" },
  { text: "18", value: "18" },
  { text: "24", value: "24" },
  { text: "48", value: "48" },
  { text: "72", value: "72" },
];
const minOption = [];

for (let i = 0; i <= 50; i++) {
  let hr = i + 12;
  let min = i * 10;
  if (min == 0) min = "00";
  if (i <= 5) minOption.push({ text: min.toString(), value: min.toString() });
  //   hrOption.push({ text: hr.toString(), value: hr.toString() });
}

State.init({
  requirements: [],
  username: "",
  post_link: "",
  amount: "",
  token: "NEAR",
  winners: 1,
  total_reward: "",
  duration_hr: "12",
  duration_min: "00",
  tokens: [],
  error: "",
  balance: 0,
  minimum: 0,
  loading: false,
  notification: "",
});

const Wrapper = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    position: relative;
    background: #FAFAFA;
    flex-direction: column;
    padding: 18px;

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
`;

const HeadComponent = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  padding: 16px 14px;
  justify-content: space-between;
  border-bottom: 1px solid #B3B3B3;
`;

const MainComponent = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    padding: 16px 14px;
    gap: 10px;
    & p {
        margin : 0
    }

    @media (max-width: 620px) {
        .form-group {
            gap: 0px !important;
            flex-direction: column;
            
            .form-label, .form-value, .form-input {
                width: 100% !important;
            }

            .form-reward {
                gap: 5px !important;
                flex-direction: column;
            }
        }

    }
  
`;

const Input = styled.input`
  padding: 12px 20px;
  font-size: 12px;
  color: #595959;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.36px;
  border-radius: 4px;
  border: 1px solid var(--light_70, #B3B3B3);

`;

const Button = styled.button`
  display: inline-flex;
  padding: 12px 24px;
  align-items: flex-start;
  gap: 10px;
  border-radius: 6px;
  background: var(--Dark, #121212); 
  color: var(--light_95, #F3F3F3);
  text-align: center;
  font-size: 13px;
  font-weight: 600;
  text-transform: capitalize;
  line-height: normal;
  border: none;
  border-radius: 4px;
  margin: 12px;
  cursor: pointer;
  position: relative;
`;

const LoadingSpinner = styled.div`
  @keyframes rotate{
    100% {
        transform: rotate(360deg);
    }
  }
  border: 4px solid rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  border-top-color: white;
  opacity: ${() => (state.loading ? 1 : 0)};
  position: absolute;
  left: 25%;
  right: 25%;
  top: 25%;
  bottom: 25%;
  margin: auto;
  width: 20px;
  height: 20px;
  transition: opacity 200ms;
  animation: rotate 1s linear;
  animation-iteration-count: infinite;
  transition-delay: ${() => (state.loading ? "200ms" : "0ms")}
`;

const ButtonText = styled.p`
  font-weight: bold;
  transition: opacity 200ms;
  transition-delay: ${() => (state.loading ? "0ms" : "200ms")};
  width: 100%;
  opacity: ${({ loading }) => (loading ? 0 : 1)};
`;

const ButtonLoader = ({ color, onClick, loading, children }) => (
  <Button loading={loading} color={color} onClick={onClick}>
    <LoadingSpinner loading={loading} />
    <ButtonText loading={loading}>{children}</ButtonText>
  </Button>
);

const getTokenData = () => {
  return asyncFetch(API_URL + `/api/token?accountId=${accountId}`).then(
    (res) => {
      if (res.ok) {
        let balance = 0;
        const tokens = res.body.token.map((item) => {
          if (item.id === "NEAR") balance = item.balance;
          return {
            ...item,
            value: item.id,
            text: item.id,
          };
        });

        State.update({
          tokens,
          balance,
          minimum: tokens[0]["minimum"] ?? 0,
        });
      }
    }
  );
};

if (!state.tokens.length) getTokenData();

const changeRequirement = (label) => {
  State.update({
    requirements: label,
  });
};

const changeAmount = (value) => {
  const amount = value !== "" && Math.abs(value && Number(value));
  const total_reward = `${Number((amount * state.winners).toFixed(4))} ${
    state.token
  }`;
  State.update({
    amount: amount,
    total_reward,
  });
  if (amount < state.minimum)
    State.update({ error: "Amount must be greater than " + state.minimum });
  else if (amount > state.balance)
    return State.update({
      error: "Not enough Balance. Please recharge in Ledger",
    });
  else State.update({ error: "" });
};

const changeWinners = (value) => {
  const winners = Math.abs(value ? parseInt(value) : 0);
  winners = winners > 20 ? 20 : winners;
  const total_reward = `${Number((state.amount * winners).toFixed(4))} ${
    state.token
  }`;
  State.update({
    winners: winners ? winners : "",
    total_reward,
  });
  if (state.amount * winners > state.balance)
    return State.update({
      error: "Not enough Balance. Please recharge in Ledger",
    });
};

const changePostLink = (link) => {
  State.update({ error: "", post_link: link, loading: true });
  asyncFetch(API_URL + `/api/campaign`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ post_link: link }),
  }).then((res) => {
    if (res.ok) {
      const { error, accountId } = res.body;
      console.log(res.body, "-==>data");
      if (error)
        State.update({ ...state, error, post_link: "", loading: false });
      else if (accountId) {
        State.update({
          ...state,
          loading: false,
          username: accountId,
        });
      }
    } else {
      State.update({
        ...state,
        post_link: "",
        error: res.error,
        loading: false,
      });
    }
  });
};

const createCampaign = () => {
  const {
    requirements,
    username,
    post_link,
    amount,
    token,
    winners,
    total_reward,
    duration_hr,
    duration_min,
    minimum,
  } = state;

  if (
    !requirements.length ||
    !username ||
    !post_link ||
    !amount ||
    !token ||
    !winners ||
    !total_reward ||
    (duration_hr == "00" && duration_min == "00")
  )
    return State.update({ error: "Please fill out all form fields" });

  if (amount < minimum)
    return State.update({ error: "Amount must be greater than " + minimum });

  if (winners < 1 || winners > 20)
    return State.update({ error: " 1 <= Winners <= 20" });

  State.update({ error: "", loading: true });
  asyncFetch(API_URL + `/api/campaign`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...state, accountId }),
  }).then((res) => {
    if (res.ok) {
      const { error, data } = res.body;
      if (error) State.update({ error, loading: false });
      else if (data && data === "success") {
        State.update({ loading: false, notification: "Campaign created!" });
        setTimeout(() => {
          changePage("dashboard");
        }, 2000);
      }
    } else {
      State.update({ loading: false });
    }
  });
};

return (
  <Wrapper>
    <div className="d-flex">
      <p
        className="m-0 position-relative"
        style={{ color: "#B3B3B3", cursor: "pointer", top: 5 }}
        onClick={() => {
          changePage("dashboard");
        }}
      >
        {"< GoBack"}
      </p>
    </div>

    <HeadComponent>
      <div
        style={{
          position: "relative",
          flexDirection: "column",
          display: "flex",
          gap: 7,
        }}
      >
        <h4 style={{ margin: 0 }}>{"Create New Campaign"}</h4>
        <p style={{ fontSize: 14, margin: 0 }}>
          {"Fill the form to start a new campaign"}
        </p>
        {state.error && (
          <p style={{ fontSize: 14, margin: 0, color: "red" }}>{state.error}</p>
        )}
      </div>
    </HeadComponent>

    <MainComponent>
      <div className="d-flex form-group" style={{ gap: 20 }}>
        <div
          className="d-flex form-label"
          style={{ gap: 8, flexDirection: "column", width: 240 }}
        >
          <p style={{ fontWeight: 600 }}>{"Project /Username*"}</p>
          <p style={{ fontSize: 14, color: "#595959" }}>
            {"Your Social  Username"}
          </p>
        </div>
        <div className="d-flex align-items-center col-lg-6 form-value">
          <Input
            className="col-lg-12 form-input"
            placeholder="Near Degens || neardegens.near"
            value={state.username}
            readOnly
          />
        </div>
      </div>

      <div className="d-flex form-group" style={{ gap: 20 }}>
        <div
          className="d-flex form-label"
          style={{ gap: 8, flexDirection: "column", width: 240 }}
        >
          <p style={{ fontWeight: 600 }}>{"Post  Link*"}</p>
          <p style={{ fontSize: 14, color: "#595959" }}>
            {"Paste the  link of your Near Social Post"}
          </p>
        </div>
        <div className="d-flex align-items-center col-lg-6  form-value">
          <Input
            className="col-lg-12 form-input"
            value={state.post_link}
            placeholder="https://near.social/"
            onChange={(e) => {
              changePostLink(e.target.value);
            }}
          />
        </div>
      </div>

      <div className="d-flex form-group" style={{ gap: 20 }}>
        <div
          className="d-flex form-label"
          style={{ gap: 8, flexDirection: "column", width: 240 }}
        >
          <p style={{ fontWeight: 600 }}>{"Requirements *"}</p>
          <p style={{ fontSize: 14, color: "#595959" }}>
            {"Participation requirements for this campaign"}
          </p>
        </div>
        <div className="d-flex align-items-center col-lg-6  form-value">
          <Typeahead
            multiple
            labelKey="name"
            className="col-lg-12  form-input"
            onChange={changeRequirement}
            options={requirementsOptions}
            placeholder=""
            selected={state.requirements}
            positionFixed
          />
        </div>
      </div>

      <div className="d-flex form-group" style={{ gap: 20 }}>
        <div
          className="d-flex form-label"
          style={{ gap: 8, flexDirection: "column", width: 240 }}
        >
          <p style={{ fontWeight: 600 }}>{"Reward Per Winner*"}</p>
          <p style={{ fontSize: 14, color: "#595959" }}>
            {"Amount and Token Type "}
          </p>
        </div>
        <div className="d-flex align-items-center col-lg-8 gap-4  form-value form-reward">
          <div className="form-value">
            <p>{`Amount`}</p>
            <Input
              value={state.amount}
              className="form-input"
              type="number"
              style={{
                border:
                  state.error.includes("Amount must be") ||
                  state.error.includes("Not enough Balance")
                    ? "1px solid var(--light_70,red)"
                    : "1px solid var(--light_70,black)",
              }}
              onChange={(e) => {
                changeAmount(e.target.value);
              }}
            />
            <p style={{ fontSize: 12 }}>{`Minimun amount ${state.minimum}`}</p>
          </div>
          <div
            className="d-flex flex-column align-items-center form-value "
            style={{ gap: 0 }}
          >
            <Widget
              props={{
                label: "Token",
                value: { value: state.token },
                placeholder: "Select Token",
                options: state.tokens,
                onChange: (e) => {
                  const token = e.value;
                  const total_reward = `${Number(
                    (state.amount * state.winners).toFixed(4)
                  )} ${token}`;
                  State.update({
                    token: e.value,
                    total_reward,
                    balance: e.balance,
                    minimum: e.minimum,
                  });
                },
              }}
              src={`${Owner}/widget/Select`}
            />
            <p
              style={{ fontSize: 12 }}
            >{`Available Balance = ${state.balance} ${state.token}`}</p>
          </div>
        </div>
      </div>

      <div className="d-flex form-group" style={{ gap: 20 }}>
        <div
          className="d-flex form-label"
          style={{ gap: 8, flexDirection: "column", width: 240 }}
        >
          <p style={{ fontWeight: 600 }}>{"Winners*"}</p>
          <p style={{ fontSize: 14, color: "#595959" }}>
            {"No of Winners  <=20"}
          </p>
        </div>
        <div className="d-flex align-items-center col-lg-6  form-value">
          <Input
            type="number"
            min="1"
            max="20"
            step="1"
            value={state.winners}
            onChange={(e) => {
              changeWinners(e.target.value);
            }}
            className="col-lg-12  form-input"
            style={{
              border: state.error.includes("Not enough Balance")
                ? "1px solid var(--light_70,red)"
                : "1px solid var(--light_70,black)",
            }}
          />
        </div>
      </div>

      <div className="d-flex form-group" style={{ gap: 20, marginTop: 10 }}>
        <div
          className="d-flex form-label"
          style={{ gap: 8, flexDirection: "column", width: 240 }}
        >
          <p style={{ fontWeight: 600 }}>{"Total Rewards*"}</p>
          <p style={{ fontSize: 14, color: "#595959" }}>
            {"Total = Reward x  No of Winners"}
          </p>
        </div>
        <div className="d-flex align-items-center col-lg-6  form-value">
          <Input
            className="col-lg-12  form-input"
            value={state.total_reward}
            readOnly
          />
        </div>
      </div>

      <div className="d-flex align-items-center form-group" style={{ gap: 20 }}>
        <div
          className="d-flex form-label"
          style={{ gap: 8, flexDirection: "column", width: 240 }}
        >
          <p style={{ fontWeight: 600 }}>{"Duration*"}</p>
          <p style={{ fontSize: 14, color: "#595959" }}>
            {"Campaign duration in HH:MM"}
          </p>
        </div>
        <div
          className="d-flex align-items-center col-lg-6 gap-4  form-value form-duration"
          style={{ height: "40px" }}
        >
          <Widget
            props={{
              noLabel: true,
              width: 100,
              value: { value: state.duration_hr },
              options: hrOption,
              onChange: (e) => {
                State.update({
                  duration_hr: e.value,
                });
              },
            }}
            src={`${Owner}/widget/Select`}
          />
          <Widget
            props={{
              noLabel: true,
              width: 100,
              value: { value: state.duration_min },
              options: minOption,
              onChange: (e) => {
                State.update({
                  duration_min: e.value,
                });
              },
            }}
            src={`${Owner}/widget/Select`}
          />
        </div>
      </div>
      <p style={{ fontSize: 16, color: "#595959" }}>
        {`You are paying: ${state.total_reward} $${state.token.text} for rewards, and 0.01 $NEAR as campaign fees`}
      </p>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
          gap: 21,
        }}
      >
        <ButtonLoader
          loading={state.loading}
          color="hsl(120, 100%, 40%)"
          onClick={createCampaign}
        >
          Submit
        </ButtonLoader>
      </div>
    </MainComponent>
    {state.notification && (
      <div
        className="d-flex justify-content-end position-absolute"
        style={{ right: 10 }}
      >
        <Widget
          props={{
            text: state.notification,
          }}
          src={`${Owner}/widget/Alert`}
        />
      </div>
    )}
  </Wrapper>
);
