const Owner = "socializer.near";
const accountId = context.accountId;
const API_URL = props?.API_URL || "https://e2e.nearverselabs.com/";

const Wrapper = styled.div`
    width: 600px;
    @media (max-width: 620px) {
        width: 100%;
    }
`;

const HeadContent = styled.div`
    gap: 20px;
    display: flex;
    justify-content: space-between;
    @media (max-width: 620px) {
        margin-top: 43px;
        flex-direction: column;
        
        .form-group {
            width: 100% !important;
            flex-direction: row !important;
        }

        .form-select-wrapper {
            width: 100% !important;
        }    
    }
`;

const UserOptions = [
  {
    text: "Users",
    value: "users",
  },
  {
    text: "Creators",
    value: "creators",
  },
];

const TimeOptions = [
  {
    text: "Monthly",
    value: "monthly",
  },
  {
    text: "Weekly",
    value: "weekly",
  },
  {
    text: "All-Time",
    value: "all",
  },
];

State.init({
  menu: { value: "users" },
  time: "monthly",
  list: [],
  loaded: false,
  error: "",
});

const columns = {
  users: [
    {
      title: "No",
      key: "no",
      description: "No",
      width: 5,
    },
    {
      title: "User",
      key: "accountId",
      description: "Campaign Id",
      width: 5,
      project: true,
    },
    {
      title: "Campaigns Participated",
      key: "participated",
      description: "Campaigns Participated",
      width: 5,
    },
    {
      title: "Transactions Made",
      key: "txs",
      description: "Transactions Made",
      width: 5,
    },
  ],
  creators: [
    {
      title: "No",
      key: "no",
      description: "No",
      width: 5,
    },
    {
      title: "Project/Username",
      key: "accountId",
      description: "Campaign Id",
      width: 16,
      project: true,
    },
    {
      title: "Participants",
      key: "participants",
      description: "Participants",
      width: 16,
    },
    {
      title: "Campaigns Created",
      key: "created",
      description: "Campaigns Created",
      width: 16,
    },
  ],
};

const selectMenu = (data, key) => {
  State.update({ [key]: data, loaded: false });
};

const getListData = () => {
  return asyncFetch(
    API_URL + `/api/campaign/leader?type=${state.menu.value}&time=${state.time}`
  ).then((res) => {
    if (res.ok) {
      const { error, data } = res.body;
      const listData = data.map((obj) => {
        if (obj.accountId.length > 30) {
          const firstPart = obj.accountId.slice(0, 5);
          const remainingPart = obj.accountId.slice(-5);
          obj.accountId = `${firstPart} ... ${remainingPart}`;
        }
        return obj;
      });
      if (error) return State.update({ error, loaded: true });
      State.update({
        list: listData,
        loaded: true,
      });
    } else {
      State.update({ error: res.error, loaded: true });
    }
  });
};

if (!state.loaded) getListData();

if (!state.loaded) return <Widget src={`${Owner}/widget/preload`} />;

if (state.error) return <p style={{ color: "red" }}>{state.error}</p>;

return (
  <div style={{ width: "100%" }}>
    <Wrapper>
      <HeadContent>
        <h3>Leader Board : </h3>
        <div className="d-flex flex-column gap-2 form-group mb-2 align-items-end">
          <Widget
            props={{
              API_URL,
              noLabel: true,
              options: UserOptions,
              value: state.menu,
              onChange: (data) => selectMenu(data, "menu"),
            }}
            src={`${Owner}/widget/Select`}
          />
          <div className="d-flex gap-2">
            {TimeOptions.map((row) => (
              <button
                key={row.value}
                className={`btn btn-${
                  state.time === row.value ? "primary" : "default"
                }`}
                style={{ border: "1px solid" }}
                onClick={() => selectMenu(row.value, "time")}
              >
                {row.text}
              </button>
            ))}
          </div>
        </div>
      </HeadContent>
      <div>
        {state.list.length !== 0 &&
        state.menu.value &&
        state.loaded === true ? (
          <Widget
            src={`${Owner}/widget/table-pagination`}
            props={{
              API_URL,
              data: state.list,
              columns: columns[state.menu.value],
              rowsCount: 10,
              pagination: false,
            }}
          />
        ) : (
          "Data is not exists"
        )}
      </div>
    </Wrapper>
  </div>
);
