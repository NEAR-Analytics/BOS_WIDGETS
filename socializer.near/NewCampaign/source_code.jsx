const accountId = context.accountId;
const Owner = "socializer.near";
const profile = Social.getr(`${accountId}/profile`);

const changePage = props?.changePage || (() => {});
const page = props?.page || "";

const requirementsOptions = [
  { name: "Follow", value: "1" },
  { name: "Like", value: "3" },
  { name: "Repost", value: "3" },
  { name: "Comment", value: "4" },
  { name: "Minimum Follower Count", value: "5" },
];

const tokenOptions = [
  {
    text: "NEAR",
    value: "Near",
  },
  {
    text: "NVRS",
    value: "Nvrs",
  },
  {
    text: "NEKO",
    value: "Neko",
  },
];

State.init({
  requirements: [],
  username: profile.name ? profile.name : accountId,
  post_link: "",
  amount: 0,
  token: "Near",
  winners: 0,
  total_reward: "",
  duration_hr: "",
  duration_min: "",
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

const changeRequirement = (label) => {
  console.log(label);
  State.update({
    requirements: label,
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
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 21,
        }}
      >
        <Button onClick={() => {}}>{"Create New Campaigns"}</Button>
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
            // onInputChange={checkLabel}
            onChange={changeRequirement}
            options={requirementsOptions}
            placeholder=""
            selected={state.requirements}
            positionFixed
            // allowNew={(results, props) => {
            //   return (
            //     !existingLabelSet.has(props.text) &&
            //     props.selected.filter(
            //       (selected) => selected.name === props.text
            //     ).length == 0 &&
            //     Near.view(
            //       nearDevGovGigsContractAccountId,
            //       "is_allowed_to_use_labels",
            //       { editor: context.accountId, labels: [props.text] }
            //     )
            //   );
            // }}
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
        <div className="d-flex align-items-center col-lg-6 gap-4">
          <div>
            <p>{`Amount`}</p>
            <Input
              type="number"
              value={state.amount}
              onChange={(e) => {
                const amount = Number(e.target.value);
                const total_reward = `${amount * state.winners} ${state.token}`;
                State.update({
                  amount,
                  total_reward,
                });
              }}
            />
          </div>
          <div>
            <Widget
              props={{
                label: "Token",
                value: { value: state.token },
                placeholder: "Select Token",
                options: tokenOptions,
                onChange: (e) => {
                  const token = e.value;
                  const total_reward = `${
                    state.amount * state.winners
                  } ${token}`;
                  State.update({
                    token: e.value,
                    total_reward,
                  });
                },
              }}
              src={`${Owner}/widget/Select`}
            />
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
            value={state.winners}
            onChange={(e) => {
              const winners = Number(e.target.value);
              const total_reward = `${winners * state.amount} ${state.token}`;
              State.update({
                winners,
                total_reward,
              });
            }}
            className="col-lg-12"
          />
        </div>
      </div>

      <div className="d-flex" style={{ gap: 20 }}>
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
          <Input
            type="number"
            defaultValue="24"
            className="col-lg-4"
            min={0}
            max={24}
          />
          <Input
            type="number"
            defaultValue="00"
            className="col-lg-4"
            min={0}
            max={60}
          />
        </div>
      </div>
    </MainComponent>
  </Wrapper>
);
