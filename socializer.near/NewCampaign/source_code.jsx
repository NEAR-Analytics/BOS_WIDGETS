const accountId = context.accountId;
const Owner = "socializer.near";
const profile = Social.getr(`${accountId}/profile`);
const API_URL = props?.API_URL || "http://localhost:3000";

const changePage = props?.changePage || (() => {});
const page = props?.page || "";

const requirementsOptions = [
  { name: "Follow", value: "follow" },
  { name: "Like", value: "like" },
  { name: "Repost", value: "repost" },
  { name: "Comment", value: "comment" },
  { name: "I-Am-Human Verified", value: "human" },
];

const hrOption = [];
const minOption = [];

for (let i = 0; i <= 50; i++) {
  let hr = i + 12;
  let min = i * 10;
  if (min == 0) min = "00";
  if (i <= 5) minOption.push({ text: min.toString(), value: min.toString() });
  hrOption.push({ text: hr.toString(), value: hr.toString() });
}

State.init({
  requirements: [],
  username: profile.name ? profile.name : accountId,
  post_link: "",
  amount: 0.1,
  token: "NEAR",
  winners: 1,
  total_reward: "",
  duration_hr: "12",
  duration_min: "00",
  tokens: [],
  error: "",
  balance: 0,
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
`;

const HeadComponent = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  padding: 32px 14px;
  justify-content: space-between;
  border-bottom: 1px solid #B3B3B3;
`;

const MainComponent = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 32px 14px;
  gap: 24px;
  & p {
    margin : 0
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
  font-size: 12px;
  font-weight: 600;
  text-transform: capitalize;
  line-height: normal;
`;

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
  } = state;
  if (
    !requirements.length ||
    !username ||
    !post_link ||
    !amount ||
    !token ||
    !winners ||
    !total_reward ||
    !duration_hr ||
    !duration_min
  )
    return State.update({ error: "Please fill out all form fields" });

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
        }, 1000);
      }
    }
  });
};

return (
  <Wrapper>
    <div className="d-flex">
      <p
        style={{ color: "#B3B3B3", cursor: "pointer" }}
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
          gap: 14,
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
      <div className="d-flex" style={{ gap: 20 }}>
        <div
          className="d-flex"
          style={{ gap: 8, flexDirection: "column", width: 240 }}
        >
          <p style={{ fontWeight: 600 }}>{"Project /Username*"}</p>
          <p style={{ fontSize: 14, color: "#595959" }}>
            {"Your Social  Username"}
          </p>
        </div>
        <div className="d-flex align-items-center col-lg-6">
          <Input
            className="col-lg-12"
            placeholder="Near Degens || neardegens.near"
            value={state.username}
            readOnly
          />
        </div>
      </div>

      <div className="d-flex" style={{ gap: 20 }}>
        <div
          className="d-flex"
          style={{ gap: 8, flexDirection: "column", width: 240 }}
        >
          <p style={{ fontWeight: 600 }}>{"Post  Link*"}</p>
          <p style={{ fontSize: 14, color: "#595959" }}>
            {"Paste the  link of your Near Social Post"}
          </p>
        </div>
        <div className="d-flex align-items-center col-lg-6">
          <Input
            className="col-lg-12"
            value={state.post_link}
            placeholder="https://near.social/"
            onChange={(e) => {
              State.update({
                post_link: e.target.value,
              });
            }}
          />
        </div>
      </div>

      <div className="d-flex" style={{ gap: 20 }}>
        <div
          className="d-flex"
          style={{ gap: 8, flexDirection: "column", width: 240 }}
        >
          <p style={{ fontWeight: 600 }}>{"Requirements *"}</p>
          <p style={{ fontSize: 14, color: "#595959" }}>
            {"Participation requirements for this campaign"}
          </p>
        </div>
        <div className="d-flex align-items-center col-lg-6">
          <Typeahead
            multiple
            labelKey="name"
            className="col-lg-12"
            onChange={changeRequirement}
            options={requirementsOptions}
            placeholder=""
            selected={state.requirements}
            positionFixed
          />
        </div>
      </div>

      <div className="d-flex" style={{ gap: 20 }}>
        <div
          className="d-flex"
          style={{ gap: 8, flexDirection: "column", width: 240 }}
        >
          <p style={{ fontWeight: 600 }}>{"Reward  Per Winner*"}</p>
          <p style={{ fontSize: 14, color: "#595959" }}>
            {"Amount and Token Type "}
          </p>
        </div>
        <div className="d-flex align-items-center col-lg-8 gap-4">
          <div>
            <p>{`Amount`}</p>
            <Input
              type="number"
              min="0.01"
              step="0.1"
              value={state.amount}
              onChange={(e) => {
                const amount = Number(e.target.value);
                if (amount < 0.01) return;
                const total_reward = `${Number(
                  (amount * state.winners).toFixed(4)
                )} ${state.token}`;
                State.update({
                  amount,
                  total_reward,
                });
              }}
            />
          </div>
          <div className="d-flex align-items-center" style={{ gap: 10 }}>
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
                  });
                },
              }}
              src={`${Owner}/widget/Select`}
            />
            <p
              style={{ fontSize: 12, marginTop: 25 }}
            >{`Available Balance = ${state.balance} ${state.token}`}</p>
          </div>
        </div>
      </div>

      <div className="d-flex" style={{ gap: 20 }}>
        <div
          className="d-flex"
          style={{ gap: 8, flexDirection: "column", width: 240 }}
        >
          <p style={{ fontWeight: 600 }}>{"Winners*"}</p>
          <p style={{ fontSize: 14, color: "#595959" }}>
            {"No of Winners  <=20"}
          </p>
        </div>
        <div className="d-flex align-items-center col-lg-6">
          <Input
            type="number"
            min="1"
            max="20"
            step="1"
            value={state.winners}
            onChange={(e) => {
              const winners = Number(e.target.value);
              if (winners < 1 || winners > 20) return;
              const total_reward = `${Number(
                (state.amount * winners).toFixed(4)
              )} ${state.token}`;
              State.update({
                winners,
                total_reward,
              });
            }}
            className="col-lg-12"
          />
        </div>
      </div>

      <div className="d-flex" style={{ gap: 20, marginTop: 10 }}>
        <div
          className="d-flex"
          style={{ gap: 8, flexDirection: "column", width: 240 }}
        >
          <p style={{ fontWeight: 600 }}>{"Total Rewards*"}</p>
          <p style={{ fontSize: 14, color: "#595959" }}>
            {"Total = Reward x  No of Winners"}
          </p>
        </div>
        <div className="d-flex align-items-center col-lg-6">
          <Input className="col-lg-12" value={state.total_reward} readOnly />
        </div>
      </div>

      <div className="d-flex" style={{ gap: 20 }}>
        <div
          className="d-flex"
          style={{ gap: 8, flexDirection: "column", width: 240 }}
        >
          <p style={{ fontWeight: 600 }}>{"Duration*"}</p>
          <p style={{ fontSize: 14, color: "#595959" }}>
            {"Campaign duration in HH:MM"}
          </p>
        </div>
        <div className="d-flex align-items-center col-lg-6 gap-4">
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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "end",
          gap: 21,
        }}
      >
        <Button disabled={state.loading} onClick={createCampaign}>
          {state.loading ? "Loading..." : "Submit"}
        </Button>
      </div>
    </MainComponent>
    {state.notification && (
      <div
        className="d-flex justify-content-end absolute position-fixed"
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
