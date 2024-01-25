const Owner = "socializer.near";
const accountId = context.accountId;
const API_URL = props?.API_URL || "http://localhost:3000";

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
  time: { value: "monthly" },
  list: [],
  load: false,
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
  State.update({ [key]: data, load: false });
};

const getListData = () => {
  return asyncFetch(
    API_URL +
      `/api/campaign/leader?type=${state.menu.value}&time=${state.time.value}`
  ).then((res) => {
    if (res.ok) {
      const { error, data } = res.body;
      if (error) return State.update({ error, load: true });
      State.update({
        list: data,
        load: true,
      });
    }
  });
};

if (!state.load) getListData();
if (state.error) return <p style={{ color: "red" }}>{state.error}</p>;
console.log(state.list, "==>state.list");
return (
  <div style={{ width: "100%" }}>
    <div style={{ width: 400 }}>
      <div className="d-flex justify-content-between" style={{ gap: 20 }}>
        <h3>Leader Board : </h3>
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
      </div>
      <div
        className="d-flex justify-content-end"
        style={{ marginTop: 10, marginBottom: 5 }}
      >
        <Widget
          props={{
            API_URL,
            noLabel: true,
            options: TimeOptions,
            value: state.time,
            onChange: (data) => selectMenu(data, "time"),
          }}
          src={`${Owner}/widget/Select`}
        />
      </div>
      <div>
        {state.list.length !== 0 && state.menu.value && state.load === true ? (
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
    </div>
  </div>
);
